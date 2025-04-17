import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import {useApiStore} from "~/stores/APIs";
import {apiRequest} from "~/stores/APIs/apiUtils";
import {useAttributeHelpers} from '~/composables/useAttributes';
import {isProductInStock} from "~/helpers/productUtils";
import {removeHtmlTags, extractLinkFromHtml} from "~/helpers/html";
import type {
    Product,
    Variation,
    ProductAttribute,
    GroupedAttribute,
    CartReadyProduct,
    ProductImage
} from '~/types/api/product.types';

export const useProductStore = defineStore('productStore', () => {
    const apiStore = useApiStore();
    const attributeHelpers = useAttributeHelpers();

    // State
    const productData = ref<Product>({} as Product);
    const variations = ref<Variation[]>([]);
    const groupedAttributes = ref<GroupedAttribute[]>([]);
    const images = ref<{ variation_id?: number; src: string; alt: string }[]>([]);
    const mainImage = ref<{ src: string | null; alt: string } | null>(null);
    const selectedVariation = ref<Variation | null>(null);
    const selectedVariationId = ref<number | null>(null);
    const readyToAddCart = ref<CartReadyProduct | null>(null);
    const isVariable = ref<boolean>(false);
    const breadCrumb = ref<any[]>([]);
    const inStockAttributes = ref<string[]>([]);
    const relatedProducts = ref<Product[]>([]);
    const isLoading = ref<boolean>(false);
    const error = ref<Error | null>(null);

    // Computed properties (getters)
    const product = computed(() => productData.value);

    /**
     * Get truncated product description for meta tags
     */
    const description = computed(() => {
        const maxLength = 160;

        if (productData.value) {
            if (productData.value.description) {
                return removeHtmlTags(productData.value.description).substring(0, maxLength);
            } else if (productData.value.excerpt) {
                return removeHtmlTags(productData.value.excerpt).substring(0, maxLength);
            }
        }

        return '';
    });

    /**
     * Get current price based on product type and selection
     */
    const productPrice = computed(() => {
        if (productData.value.type === 'fixed') {
            return productData.value.in_stock ? productData.value.price : 0;
        } else if (productData.value.type === 'variable') {
            const hasInStockVariations = productData.value.variations?.some(v => v.in_stock);

            if (hasInStockVariations) {
                if (selectedVariation.value) {
                    return selectedVariation.value.in_stock ? selectedVariation.value.price : 0;
                }
                return -1; // Indicates price range or "Starting from..."
            }
            return 0;
        }
        return 0;
    });

    /**
     * Get current sale price based on product type and selection
     */
    const productSalePrice = computed(() => {
        if (productData.value.type === 'fixed') {
            return productData.value.in_stock && productData.value.sale_price
                ? productData.value.sale_price
                : null;
        } else if (productData.value.type === 'variable' && selectedVariation.value) {
            return selectedVariation.value.in_stock && selectedVariation.value.sale_price
                ? selectedVariation.value.sale_price
                : null;
        }
        return null;
    });

    /**
     * Check if add to cart button should be disabled
     */
    const addToCartDisabled = computed(() => {
        if (productData.value.type === 'fixed') {
            return !productData.value.in_stock;
        } else if (productData.value.type === 'variable') {
            const hasInStockVariations = productData.value.variations?.some(v => v.in_stock);

            if (hasInStockVariations) {
                if (selectedVariation.value) {
                    return !selectedVariation.value.in_stock;
                }
                return true; // No variation selected
            }
            return true; // No variations in stock
        }
        return true;
    });

    /**
     * Fetch product data by slug
     */
    const fetchProduct = async (slug: string) => {
        isLoading.value = true;
        error.value = null;

        // Reset selected states
        resetSelections();

        try {
            const {data, error: apiError} = await apiRequest(
                apiStore.endpoints.shop.product.single(slug)
            );

            if (apiError) {
                error.value = apiError;
                return null;
            }

            productData.value = data.data;
            breadCrumb.value = data.data.breadcrumb || [];

            if (productData.value.type === 'variable' && productData.value.variations) {
                variations.value = productData.value.variations;
                isVariable.value = true;
                processAttributes();
                getImagesFromVariations();
            }

            return data;
        } catch (err) {
            error.value = err instanceof Error ? err : new Error('Unknown error');
            console.error('Error fetching product:', err);
            return null;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Reset all selection states
     */
    const resetSelections = () => {
        readyToAddCart.value = null;
        selectedVariation.value = null;
        selectedVariationId.value = null;
    };

    /**
     * Process attributes for variable products
     */
    const processAttributes = () => {
        const {groupedAttributes: processed} = attributeHelpers.processVariationAttributes(variations.value);
        groupedAttributes.value = processed;

        // Collect in-stock attribute slugs
        inStockAttributes.value = variations.value
            .filter(variation => variation.in_stock)
            .flatMap(variation => variation.attributes.map(attr => attr.slug));
    };

    /**
     * Find variation ID based on selected attributes
     */
    const findVariationId = async (selectedAttrs: Record<string, string>) => {
        for (const variation of variations.value) {
            if (isMatchingVariation(selectedAttrs, variation.attributes)) {
                await setSelectedVariation(variation);
                return variation.id;
            }
        }

        // No matching variation found
        selectedVariation.value = null;
        selectedVariationId.value = null;
        return null;
    };

    /**
     * Check if selected attributes match a variation
     */
    const isMatchingVariation = (
        selectedAttrs: Record<string, string>,
        attributes: ProductAttribute[]
    ): boolean => {
        for (const attr of attributes) {
            if (selectedAttrs[attr.type_id] !== attr.slug) {
                return false;
            }
        }
        return true;
    };

    /**
     * Set selected variation and update related state
     */
    const setSelectedVariation = async (variation: Variation) => {
        selectedVariation.value = variation;
        selectedVariationId.value = variation.id;
        getReadyToAddCart(variation);
    };

    /**
     * Prepare product data for adding to cart
     */
    const getReadyToAddCart = (variation: Variation, quantity = 1) => {
        if (readyToAddCart.value && readyToAddCart.value.variation_id !== variation.id) {
            readyToAddCart.value = null;
        }

        const thumbnailPath = variation.images?.length > 0 && variation.images[0].path
            ? variation.images[0].path
            : mainImage.value?.src || '';

        readyToAddCart.value = {
            name: productData.value.name,
            thumbnail: thumbnailPath,
            variation_id: variation.id,
            attributes: variation.attributes || [],
            price: variation.price,
            in_stock: variation.in_stock,
            quantity: quantity,
            stock_quantity: variation.stock_quantity,
            sale_price: variation.sale_price || null,
        };
    };

    /**
     * Extract images from variations
     */
    const getImagesFromVariations = () => {
        // Collect images from variations with images
        images.value = variations.value
            .filter(variation => variation.images && variation.images.length > 0)
            .map(variation => ({
                variation_id: variation.id,
                src: variation.images[0].path,
                alt: variation.images[0].name || `${productData.value.name} - محصول ${variation.id}`
            }));

        console.log(images.value)

        // Set main image
        const thumbnailSrc = typeof productData.value.thumbnail === 'string'
            ? productData.value.thumbnail
            : productData.value.thumbnail?.path || null;

        mainImage.value = {
            src: thumbnailSrc || images.value[0]?.src || null,
            alt: productData.value.name + ' - عکس محصول'
        };

        // Add main image to gallery if not already included
        if (mainImage.value?.src && mainImage.value.src !== images.value[0]?.src) {
            images.value = [mainImage.value, ...images.value];
        }
    };

    /**
     * Filter in-stock attributes based on a selected attribute
     */
    const checkInStockWithSelectedAttribute = (selectedAttribute: string) => {
        // Find variations that contain the selected attribute
        const matchingVariations = variations.value.filter(variation => {
            return variation.attributes.some(attr => attr.slug === selectedAttribute);
        });

        // Find the type ID of the selected attribute
        const selectedTypeId = variations.value
            .flatMap(variation => variation.attributes)
            .find(attr => attr.slug === selectedAttribute)?.type_id;

        // Get all attribute slugs of the same type
        const sameTypeAttributeSlugs = selectedTypeId ? Array.from(new Set(
            variations.value
                .flatMap(variation => variation.attributes)
                .filter(attr => attr.type_id === selectedTypeId)
                .map(attr => attr.slug)
        )) : [];

        // Update in-stock attributes
        inStockAttributes.value = [
            ...matchingVariations.flatMap(variation =>
                variation.attributes.map(attr => attr.slug)
            ),
            ...sameTypeAttributeSlugs
        ];

        return inStockAttributes.value;
    };

    /**
     * Fetch related products
     */
    const fetchRelatedProducts = async (slug: string) => {
        isLoading.value = true;
        error.value = null;

        try {
            const {data, error: apiError} = await apiRequest(
                apiStore.endpoints.shop.product.related(slug)
            );

            if (apiError) {
                error.value = apiError;
                return null;
            }

            relatedProducts.value = data.data;
            return data;
        } catch (err) {
            error.value = err instanceof Error ? err : new Error('Unknown error');
            console.error('Error fetching related products:', err);
            return null;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Extract size guide link from product excerpt
     */
    const getLinkAndHtml = () => {
        if (productData.value.excerpt) {
            const linkAndHtml = extractLinkFromHtml(productData.value.excerpt);
            if (linkAndHtml.link) {
                productData.value.sizeGuide = linkAndHtml.link;
            }
            return linkAndHtml;
        }
        return {link: null, html: ''};
    };

    return {
        // State
        productData,
        variations,
        groupedAttributes,
        images,
        mainImage,
        selectedVariation,
        selectedVariationId,
        readyToAddCart,
        isVariable,
        breadCrumb,
        inStockAttributes,
        relatedProducts,
        isLoading,
        error,

        // Actions
        fetchProduct,
        resetSelections,
        findVariationId,
        setSelectedVariation,
        getReadyToAddCart,
        getImagesFromVariations,
        checkInStockWithSelectedAttribute,
        fetchRelatedProducts,
        getLinkAndHtml,

        // Computed properties
        product,
        description,
        productPrice,
        productSalePrice,
        addToCartDisabled
    };
});