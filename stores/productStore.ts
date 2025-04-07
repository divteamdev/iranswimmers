import { defineStore } from 'pinia';
import { useApiStore } from './APIs';
import { apiRequest } from './APIs/apiUtils';

export const useProductStore = defineStore('productStore', () => {
    const apiStore = useApiStore();

    // State
    const products = ref([]);
    const currentProduct = ref(null);
    const relatedProducts = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    // List all products
    const fetchProducts = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const { data, error: apiError } = await apiRequest(
                apiStore.endpoints.shop.product.list()
            );

            if (apiError) {
                error.value = apiError;
            } else {
                products.value = data.data.products;
            }
        } catch (err) {
            error.value = err;
            console.error('Error fetching products:', err);
        } finally {
            isLoading.value = false;
        }
    };

    // Get a single product by slug
    const fetchProduct = async (slug: string) => {
        isLoading.value = true;
        error.value = null;
        currentProduct.value = null;

        try {
            const { data, error: apiError } = await apiRequest(
                apiStore.endpoints.shop.product.single(slug)
            );

            if (apiError) {
                error.value = apiError;
            } else {
                currentProduct.value = data;
            }
        } catch (err) {
            error.value = err;
            console.error(`Error fetching product ${slug}:`, err);
        } finally {
            isLoading.value = false;
        }

        return currentProduct.value;
    };

    // Get related products for a given product slug
    const fetchRelatedProducts = async (slug: string) => {
        isLoading.value = true;
        error.value = null;
        relatedProducts.value = [];

        try {
            const { data, error: apiError } = await apiRequest(
                apiStore.endpoints.shop.product.related(slug)
            );

            if (apiError) {
                error.value = apiError;
            } else {
                relatedProducts.value = data;
            }
        } catch (err) {
            error.value = err;
            console.error(`Error fetching related products for ${slug}:`, err);
        } finally {
            isLoading.value = false;
        }

        return relatedProducts.value;
    };

    // Fetch product with related products in a single call
    const fetchProductWithRelated = async (slug: string) => {
        await fetchProduct(slug);
        if (currentProduct.value) {
            await fetchRelatedProducts(slug);
        }
        return { product: currentProduct.value, related: relatedProducts.value };
    };

    return {
        // State
        products,
        currentProduct,
        relatedProducts,
        isLoading,
        error,

        // Actions
        fetchProducts,
        fetchProduct,
        fetchRelatedProducts,
        fetchProductWithRelated
    };
});