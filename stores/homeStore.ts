import {defineStore} from 'pinia';
import {useApiStore} from './APIs';
import {apiRequest} from './APIs/apiUtils';

export const useHomeStore = defineStore('homeStore', () => {
    const apiStore = useApiStore();

    // State
    const homeData = ref(null);
    const productCarousels = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    // Fetch home page data
    const fetchHomeData = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const {data, error: apiError} = await apiRequest(
                apiStore.endpoints.home.index()
            );

            if (apiError) {
                error.value = apiError;
            } else {
                homeData.value = data;
                productCarousels.value = data.data || [];
            }
        } catch (err) {
            error.value = err;
            console.error('Error fetching home data:', err);
        } finally {
            isLoading.value = false;
        }

        return homeData.value;
    };

    // Computed properties (equivalent to getters)
    const onSaleCarousel = computed(() => {
        return productCarousels.value && productCarousels.value.length > 0
            ? productCarousels.value[0]
            : [];
    });

    const carousel1 = computed(() => {
        return productCarousels.value && productCarousels.value[1]
            ? productCarousels.value[1]
            : [];
    });

    const carousel2 = computed(() => {
        return productCarousels.value && productCarousels.value[2]
            ? productCarousels.value[2]
            : [];
    });

    const carousel3 = computed(() => {
        return productCarousels.value && productCarousels.value[3]
            ? productCarousels.value[3]
            : [];
    });

    const carousel4 = computed(() => {
        return productCarousels.value && productCarousels.value[4]
            ? productCarousels.value[4]
            : [];
    });

    const carousel5 = computed(() => {
        return productCarousels.value && productCarousels.value[5]
            ? productCarousels.value[5]
            : [];
    });

    return {
        // State
        homeData,
        productCarousels,
        isLoading,
        error,

        // Actions
        fetchHomeData,

        // Computed properties (getters)
        onSaleCarousel,
        carousel1,
        carousel2,
        carousel3,
        carousel4,
        carousel5
    };
});