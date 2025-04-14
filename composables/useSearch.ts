import { ref, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { onBeforeMount } from '#imports'

const isActive = ref(false)
const searchQuery = ref('')

export function useSearch() {
  const router = useRouter()
  const route = useRoute()

  const isSearchPage = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.location.pathname.startsWith('/search')
  }

  const updateActiveState = () => {
    if (typeof window === 'undefined' || isSearchPage()) return

    const hash = window.location.hash
    isActive.value = hash === '#search'
  }

  const updateUrlHash = (active: boolean) => {
    if (typeof window === 'undefined' || isSearchPage()) return


    try {
      const currentPath = window.location.pathname + window.location.search

      if (active && window.location.hash !== '#search') {
        history.replaceState(null, '', currentPath + '#search')
      } else if (!active && window.location.hash === '#search') {
        history.replaceState(null, '', currentPath)
      }
    } finally {
    }
  }

  watch(isActive, (newVal) => {
    updateUrlHash(newVal)
    if (typeof window !== 'undefined') {
      document.body.style.overflow = newVal ? 'hidden' : ''
    }
  })

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isActive.value) {
      closeSearch()
    }
  }

  onBeforeMount(() => {
    if (typeof window !== 'undefined') {
      updateActiveState()

      window.addEventListener('hashchange', updateActiveState)
      window.addEventListener('keydown', handleKeyDown)

      const removeRouterListener = router.afterEach((to, from) => {
        if (to.path !== from.path) {
          if (to.path.startsWith('/search')) {
            if (to.query.q) {
              setSearchQuerySilently(to.query.q as string)
            }
            return
          }

          isActive.value = false
          if (!to.path.startsWith('/search')) {
            searchQuery.value = ''
          }
        }
      })

      onBeforeUnmount(() => {
        removeRouterListener()
      })
    }
  })

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('hashchange', updateActiveState)
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  const handleInputFocus = () => {
    isActive.value = true
  }

  const handleInputBlur = () => {
    if (!isSearchPage()) {
      isActive.value = false
      searchQuery.value = ''
    }
  }

  const closeSearch = () => {

    isActive.value = false

    if (window.location.hash === '#search') {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    if (!isSearchPage()) {
      searchQuery.value = ''
    }
  }

  const handleButtonClick = () => {
    isActive.value = !isActive.value
  }

  const setSearchQuerySilently = (query: string) => {
    searchQuery.value = query
  }

  return {
    isActive,
    searchQuery,
    handleInputFocus,
    handleInputBlur,
    handleButtonClick,
    closeSearch,
    setSearchQuerySilently,
    isSearchPage,
  }
}