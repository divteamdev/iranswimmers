import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useSearch() {
  const router = useRouter()
  const isActive = ref(false)
  const searchQuery = ref('')

  /**
   * Handler for when the input field is clicked/focused
   * Used with the search input element
   */
  const handleInputFocus = () => {
    isActive.value = true
    router.push('#search')
  }

  /**
   * Handler for when the input field loses focus
   * Removes the #search fragment from URL when not active
   */
  const handleInputBlur = () => {
    isActive.value = false
    if (window.location.hash === '#search') {
      router.push(window.location.pathname + window.location.search)
    }
  }

  /**
   * Handler for when the search button is clicked
   * This can be used in mobile views where only a button is shown
   */
  const handleButtonClick = () => {
    isActive.value = true
    router.push('#search')
  }

  return {
    isActive,
    searchQuery,
    handleInputFocus,
    handleInputBlur,
    handleButtonClick
  }
} 