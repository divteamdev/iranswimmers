import { ref, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { onBeforeMount, useNuxtApp } from '#imports'

// Create a single instance of isActive and searchQuery to be shared across components
const isActive = ref(false)
const searchQuery = ref('')

export function useSearch() {
  const router = useRouter()
  const nuxtApp = useNuxtApp()

  // Check URL hash on mount and when hash changes
  const updateActiveState = () => {
    if (typeof window === 'undefined') return
    
    const newValue = window.location.hash === '#search'
    console.log('updateActiveState: hash is', window.location.hash, 'setting isActive from', isActive.value, 'to', newValue)
    
    // Only update URL if state changes to prevent loops
    if (isActive.value !== newValue) {
      isActive.value = newValue
    }
  }

  // Update URL based on isActive state
  const updateUrlHash = (active: boolean) => {
    if (typeof window === 'undefined') return
    
    const currentHash = window.location.hash
    const shouldHaveSearchHash = active
    
    if (shouldHaveSearchHash && currentHash !== '#search') {
      router.push('#search')
    } else if (!shouldHaveSearchHash && currentHash === '#search') {
      // Remove #search hash but keep rest of URL intact
      router.push(window.location.pathname + window.location.search)
    }
  }

  // Watch for isActive changes to update URL
  watch(isActive, (newVal) => {
    console.log('useSearch composable: isActive changed to', newVal)
    updateUrlHash(newVal)
  })

  onBeforeMount(() => {
    // Initialize state based on URL hash when component mounts on client side
    if (typeof window !== 'undefined') {
      // Force immediate hash check
      console.log('onBeforeMount: checking hash', window.location.hash)
      updateActiveState()
      
      // Add hash change listener
      window.addEventListener('hashchange', updateActiveState)
    }
  })

  onBeforeUnmount(() => {
    // Clean up event listener
    if (typeof window !== 'undefined') {
      window.removeEventListener('hashchange', updateActiveState)
    }
  })

  /**
   * Handler for when the input field is clicked/focused
   * Used with the search input element
   */
  const handleInputFocus = () => {
    console.log('handleInputFocus: setting isActive to true')
    isActive.value = true
    // URL will be updated by the watcher
  }

  /**
   * Handler for when the input field loses focus
   * Removes the #search fragment from URL when not active
   */
  const handleInputBlur = () => {
    // Don't deactivate search on blur to allow clicking search results
    // Only blur if searchQuery is empty
    if (!searchQuery.value) {
      console.log('handleInputBlur: setting isActive to false (empty query)')
      isActive.value = false
      // URL will be updated by the watcher
    }
  }

  /**
   * Handler to manually close search
   */
  const closeSearch = () => {
    console.log('closeSearch: setting isActive to false')
    isActive.value = false
    // URL will be updated by the watcher
  }

  /**
   * Handler for when the search button is clicked
   * This can be used in mobile views where only a button is shown
   */
  const handleButtonClick = () => {
    console.log('handleButtonClick: toggling isActive')
    isActive.value = !isActive.value
    // URL will be updated by the watcher
  }

  return {
    isActive,
    searchQuery,
    handleInputFocus,
    handleInputBlur,
    handleButtonClick,
    closeSearch
  }
} 