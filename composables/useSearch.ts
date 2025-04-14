import { ref, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { onBeforeMount, useNuxtApp } from '#imports'

// Create a single instance of isActive and searchQuery to be shared across components
const isActive = ref(false)
const searchQuery = ref('')

export function useSearch() {
  const router = useRouter()
  const route = useRoute()
  const nuxtApp = useNuxtApp()

  // Check if we're on the search page
  const isSearchPage = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname.startsWith('/search');
  }

  // Check URL hash on mount and when hash changes
  const updateActiveState = () => {
    if (typeof window === 'undefined') return;
    
    // Don't change hash-based search state if we're on the search page
    if (isSearchPage()) return;
    
    const hash = window.location.hash;
    const isSearchHash = hash.startsWith('#search');
    
    // Only update state if it changes to prevent loops
    if (isActive.value !== isSearchHash) {
      isActive.value = isSearchHash;
    }
  }

  // Update URL based on isActive state and searchQuery
  const updateUrlHash = (active: boolean) => {
    if (typeof window === 'undefined') return;
    
    const currentHash = window.location.hash;
    const shouldHaveSearchHash = active;
    
    if (shouldHaveSearchHash) {
      // Always use plain #search without query parameters
      const newHash = '#search';
      
      if (currentHash !== newHash) {
        router.push(window.location.pathname + window.location.search + newHash);
      }
    } else if (!shouldHaveSearchHash && currentHash.startsWith('#search')) {
      // Remove #search hash but keep rest of URL intact
      router.push(window.location.pathname + window.location.search);
    }
  }

  // Watch for isActive changes to update URL
  watch(isActive, (newVal) => {
    console.log('useSearch composable: isActive changed to', newVal);
    updateUrlHash(newVal);
  });
  
  // Watch searchQuery changes to update URL when active
  watch(searchQuery, (newVal) => {
    console.log('useSearch composable: searchQuery changed to', newVal);
    // No URL update needed, since we don't include query in hash anymore
  });

  // Add ESC key handler
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isActive.value) {
      console.log('ESC key pressed, closing search');
      closeSearch();
    }
  }

  onBeforeMount(() => {
    // Initialize state based on URL hash when component mounts on client side
    if (typeof window !== 'undefined') {
      // Force immediate hash check
      console.log('onBeforeMount: checking hash', window.location.hash);
      updateActiveState();
      
      // Add hash change listener
      window.addEventListener('hashchange', updateActiveState);
      
      // Add ESC key listener
      window.addEventListener('keydown', handleKeyDown);
      
      // Add router navigation listener
      const removeRouterListener = router.afterEach((to, from) => {
        // If navigating to a different path (not hash change)
        if (to.path !== from.path) {
          // If navigating to search page, preserve the search query but don't close dropdown
          if (to.path.startsWith('/search')) {
            console.log('Navigated to search page, keeping search query');
            // Update search query from URL if available
            if (to.query.q) {
              setSearchQuerySilently(to.query.q as string);
            }
            return;
          }
          
          // For all other navigation, deactivate search and clear query
          console.log('Router navigation detected, deactivating search');
          isActive.value = false;
          if (!to.path.startsWith('/search')) {
            searchQuery.value = '';
          }
        }
      });
      
      // Store the cleanup function for router listener
      onBeforeUnmount(() => {
        removeRouterListener();
      });
    }
  });

  onBeforeUnmount(() => {
    // Clean up event listeners
    if (typeof window !== 'undefined') {
      window.removeEventListener('hashchange', updateActiveState);
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  /**
   * Handler for when the input field is clicked/focused
   * Used with the search input element
   */
  const handleInputFocus = () => {
    // The search page handling is now done in the Search component
    // so we don't need to prevent activation here
    
    console.log('handleInputFocus: setting isActive to true');
    isActive.value = true;
    
    // Ensure the hash is set to #search immediately
    if (typeof window !== 'undefined' && !window.location.hash.startsWith('#search')) {
      router.push(window.location.pathname + window.location.search + '#search');
    }
  }

  /**
   * Handler for when the input field loses focus
   * Removes the #search fragment from URL when not active
   */
  const handleInputBlur = () => {
    // Always allow clicking outside to close search
    console.log('handleInputBlur: setting isActive to false');
    isActive.value = false;
    
    // When not on search page, also clear the query
    if (!isSearchPage()) {
      searchQuery.value = '';
    }
    // URL will be updated by the watcher
  }

  /**
   * Handler to manually close search
   */
  const closeSearch = () => {
    console.log('closeSearch: setting isActive to false');
    isActive.value = false;
    
    // Clear query if not on search page
    if (!isSearchPage()) {
      searchQuery.value = '';
    }
    // URL will be updated by the watcher
  }

  /**
   * Handler for when the search button is clicked
   * This can be used in mobile views where only a button is shown
   */
  const handleButtonClick = () => {
    // On search page, button should navigate to home
    if (isSearchPage()) {
      router.push('/');
      return;
    }
    
    console.log('handleButtonClick: toggling isActive');
    isActive.value = !isActive.value;
    // URL will be updated by the watcher
  }

  /**
   * Handler to set search query without affecting URL on search page
   */
  const setSearchQuerySilently = (query: string) => {
    searchQuery.value = query;
  }

  return {
    isActive,
    searchQuery,
    handleInputFocus,
    handleInputBlur,
    handleButtonClick,
    closeSearch,
    setSearchQuerySilently,
    isSearchPage
  }
} 