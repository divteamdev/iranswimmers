import {defineStore} from 'pinia';
import {ref} from 'vue';
import {useApiStore} from './APIs';
import {apiRequest} from './APIs/apiUtils';

import type {Product, ProductResponse, ProductPagination} from '~/types/api/product.types';

export const useProductsStore = defineStore('productsStore', () => {
    const apiStore = useApiStore();

    // State
    const products = ref<Product[]>([]);
    const currentProduct = ref<Product | null>(null);
    const relatedProducts = ref<Product[]>([]);
    const isLoading = ref(false);
    const error = ref<any | null>(null);
    const pagination = ref<ProductPagination | null>({
        currentPage: 1,
        lastPage: 1,
        total: 0
    });

    function resetProducts() {
        products.value = [];
        pagination.value = {
            currentPage: 1,
            lastPage: 1,
            total: 0
        };
    }

    // Get a single product by slug
    async function fetchProducts(page = 1, filters = {}): Promise<ProductResponse | null> {
        isLoading.value = true;
        error.value = null;

        try {
            const {data, error: apiError} = await apiRequest(
                apiStore.endpoints.shop.product.list(),
                {
                    params: {
                        page,
                        ...filters // Include any additional filters
                    }
                }
            );

            if (apiError) {
                error.value = apiError;
                return null;
            }

            // Update pagination info
            if (data.data.meta) {
                pagination.value = {
                    currentPage: data.data.meta.current_page,
                    lastPage: data.data.meta.last_page,
                    total: data.data.meta.total
                };
            }

            // If first page, replace products, otherwise append
            if (page === 1) {
                products.value = data.data.products || [];
            } else {
                products.value = [...products.value, ...(data.data.products || [])];
            }

            return data;
        } catch (err) {
            error.value = err;
            console.error('Error fetching products:', err);
            return null;
        } finally {
            isLoading.value = false;
        }
    }

// Replace the fetchProductsByCategory function with this improved version
    const fetchProductsByCategory = async (slug: string, page = 1): Promise<Product[]> => {
        isLoading.value = true;
        error.value = null;

        try {
            const {data, error: apiError} = await apiRequest(
                apiStore.endpoints.shop.category.single(slug),
                {
                    params: {page} // Pass the page parameter to the API
                }
            );

            if (apiError) {
                error.value = apiError;
                return [];
            }

            // Update pagination info
            if (data.data.meta) {
                pagination.value = {
                    currentPage: data.data.meta.current_page,
                    lastPage: data.data.meta.last_page,
                    total: data.data.meta.total
                };
            }

            // If first page, replace products, otherwise append
            if (page === 1) {
                products.value = data.data.products || [];
            } else {
                products.value = [...products.value, ...(data.data.products || [])];
            }

            return products.value;
        } catch (err) {
            error.value = err instanceof Error ? err : new Error(String(err));
            console.error(`Error fetching products for category ${slug}:`, err);
            return [];
        } finally {
            isLoading.value = false;
        }
    };

    return {
        // State
        products,
        currentProduct,
        relatedProducts,
        isLoading,
        error,
        pagination,

        // Actions
        fetchProducts,
        fetchProductsByCategory,
        resetProducts,
    };
});