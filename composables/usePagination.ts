// composables/usePagination.ts
import { ref, computed } from 'vue';

export function usePagination() {
    const currentPage = ref(1);
    const lastPage = ref(1);
    const total = ref(0);
    const isLoading = ref(false);
    const hasMore = computed(() => currentPage.value < lastPage.value);

    function updatePaginationInfo(meta: any) {
        if (meta) {
            currentPage.value = meta.current_page || 1;
            lastPage.value = meta.last_page || 1;
            total.value = meta.total || 0;
        }
    }

    function nextPage() {
        if (hasMore.value && !isLoading.value) {
            currentPage.value++;
            return currentPage.value;
        }
        return null;
    }

    function reset() {
        currentPage.value = 1;
        lastPage.value = 1;
        total.value = 0;
    }

    return {
        currentPage,
        lastPage,
        total,
        isLoading,
        hasMore,
        updatePaginationInfo,
        nextPage,
        reset
    };
}