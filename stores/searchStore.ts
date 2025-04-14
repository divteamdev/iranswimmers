import { defineStore } from 'pinia';
import { useApiStore } from './APIs';
import { apiRequest } from './APIs/apiUtils';
import { ref, computed, watch } from 'vue';
import { useSearch } from '~/composables/useSearch';

interface SearchProduct {
  id: string | number;
  name: string;
  slug: string;
  price: string;
  sale_price: string | null;
  thumbnail: string | null;
  [key: string]: any;
}

export const useSearchStore = defineStore('searchStore', () => {
    const apiStore = useApiStore();
    
    // Access the shared search state from composable
    const { searchQuery: globalSearchQuery } = useSearch();
    
    // Real-time search state
    const searchResults = ref<SearchProduct[]>([]);
    const isSearching = ref<boolean>(false);
    const searchError = ref<Error | null>(null);
    const localSearchQuery = ref<string>('');
    const debouncedSearchQuery = ref<string>('');
    
    // Full search state (for search page)
    const fullSearchResults = ref<SearchProduct[]>([]);
    const isFullSearching = ref<boolean>(false);
    const fullSearchError = ref<Error | null>(null);
    const fullSearchQuery = ref<string>('');
    
    // Debounce timer
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    
    // Computed properties
    const hasResults = computed(() => searchResults.value && searchResults.value.length > 0);
    const hasSearched = computed(() => debouncedSearchQuery.value !== '');
    const hasFullResults = computed(() => fullSearchResults.value && fullSearchResults.value.length > 0);
    
    // Debounced search method
    const setSearchQuery = (query: string) => {
        localSearchQuery.value = query;
        
        // Update global search query for URL synchronization
        if (globalSearchQuery.value !== query) {
            globalSearchQuery.value = query;
        }
        
        // Clear previous timer
        if (debounceTimer) clearTimeout(debounceTimer);
        
        // Set new timer
        debounceTimer = setTimeout(() => {
            debouncedSearchQuery.value = query;
            if (query) {
                performSearch();
            } else {
                searchResults.value = [];
            }
        }, 300); // 300ms debounce
    };
    
    // Perform the actual search
    const performSearch = async () => {
        if (!debouncedSearchQuery.value) return;
        
        isSearching.value = true;
        searchError.value = null;
        
        try {
            const { data, error } = await apiRequest(
                apiStore.endpoints.shop.rtSearch(debouncedSearchQuery.value)
            );
            
            if (error) {
                searchError.value = error as Error;
                searchResults.value = [];
            } else {
                searchResults.value = data?.data?.products || [];
            }
        } catch (err) {
            searchError.value = err as Error;
            searchResults.value = [];
        } finally {
            isSearching.value = false;
        }
    };
    
    // Perform full search (for search page)
    const performFullSearch = async (query: string) => {
        if (!query) return;
        
        fullSearchQuery.value = query;
        isFullSearching.value = true;
        fullSearchError.value = null;
        
        try {
            const { data, error } = await apiRequest(
                apiStore.endpoints.shop.search(query)
            );
            
            if (error) {
                fullSearchError.value = error as Error;
                fullSearchResults.value = [];
            } else {
                fullSearchResults.value = data?.data?.products || [];
            }
        } catch (err) {
            fullSearchError.value = err as Error;
            fullSearchResults.value = [];
        } finally {
            isFullSearching.value = false;
        }
    };
    
    // Clear search results and query
    const clearSearch = () => {
        localSearchQuery.value = '';
        debouncedSearchQuery.value = '';
        searchResults.value = [];
        searchError.value = null;
        
        if (globalSearchQuery.value !== '') {
            globalSearchQuery.value = '';
        }
    };
    
    // Clear full search results
    const clearFullSearch = () => {
        fullSearchQuery.value = '';
        fullSearchResults.value = [];
        fullSearchError.value = null;
    };
    
    // Sync with global search query from composable
    watch(globalSearchQuery, (newQuery) => {
        if (localSearchQuery.value !== newQuery) {
            setSearchQuery(newQuery);
        }
    }, { immediate: true });
    
    return {
        // Real-time search state
        searchResults,
        isSearching,
        searchError,
        searchQuery: localSearchQuery, // expose as searchQuery for compatibility
        debouncedSearchQuery,
        
        // Full search state
        fullSearchResults,
        isFullSearching,
        fullSearchError,
        fullSearchQuery,
        
        // Computed
        hasResults,
        hasSearched,
        hasFullResults,
        
        // Actions
        setSearchQuery,
        performSearch,
        clearSearch,
        performFullSearch,
        clearFullSearch
    };
}); 