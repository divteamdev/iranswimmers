<template>
  <header
    class="flex flex-col w-full top-0 bg-transparent transition-all duration-300"
    :class="[headerClasses, headerZIndex]"
    dir="rtl"
  >
    <!-- Ribbon Layer -->
    <div
      class="transition-all duration-300 ease-in-out overflow-hidden"
      :class="ribbonClasses"
    >
      <HeaderRibbon />
    </div>

    <!-- Second Layer (Logo, Search, User Actions) -->
    <div
      class="flex items-center justify-between w-full px-4 md:px-8 py-4 border-b border-b-border transition-transform duration-300 ease-in-out z-20 bg-background"
      :class="secondLayerClasses"
    >
      <HeaderLogo />
      
      <div class="grow max-w-lg lg:max-w-xl xl:max-w-2xl hidden md:block">
        <HeaderSearch />
      </div>

      <HeaderUserActions @toggle-mobile-menu="toggleMobileMenu" />
    </div>

    <!-- Third Layer (Menu, Support) -->
    <div
      class="hidden md:flex items-center justify-between w-full px-8 py-4 border-b border-b-border transition-transform duration-300 bg-background ease-in-out"
      :class="thirdLayerClasses"
    >
      <HeaderMenu />
      <HeaderSupportInfo />
    </div>

    <!-- Mobile Search -->
    <div
      class="flex md:hidden items-center justify-between w-full px-4 py-3 border-b border-b-border bg-background transition-all duration-300 ease-in-out"
      :class="mobileSearchClasses"
    >
      <div class="grow">
        <HeaderSearch />
      </div>
    </div>

    <HeaderMobileMenu
      :isOpen="isMobileMenuOpen"
      @close="closeMobileMenu"
    />
  </header>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

// State management
const isMobileMenuOpen = ref(false)
const { isMobile } = useDeviceDetection()

// Scroll state
const headerState = reactive({
  lastScrollY: 0,
  isScrollingUp: true,
  isAtTop: true,
  scrollDirection: 'none'
})

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Optimized scroll handler
const handleScroll = useDebounceFn(() => {
  const currentScrollY = window.scrollY
  const previousScrollY = headerState.lastScrollY
  
  headerState.isScrollingUp = currentScrollY < previousScrollY
  headerState.isAtTop = currentScrollY <= 0
  headerState.lastScrollY = currentScrollY
  
  // Update scroll direction with threshold
  if (Math.abs(currentScrollY - previousScrollY) > 5) {
    headerState.scrollDirection = headerState.isScrollingUp ? 'up' : 'down'
  }
}, 10)

// Computed styles
const headerClasses = computed(() => ({
  'sticky top-0': !headerState.isAtTop,
  'relative': headerState.isAtTop,
  'h-auto': true
}))

const headerZIndex = computed(() => ({
  'z-50': !headerState.isAtTop,
  'z-20': headerState.isAtTop
}))

const ribbonClasses = computed(() => ({
  '-translate-y-full': !headerState.isAtTop,
  'translate-y-0': headerState.isAtTop
}))

const secondLayerClasses = computed(() => {
  if (isMobile.value) {
    return {
      'transform transition-transform duration-300': true,
      'translate-y-0': headerState.isAtTop,
      '-translate-y-10': !headerState.isAtTop && !headerState.isScrollingUp,
      '-translate-y-[160%]': !headerState.isAtTop && headerState.isScrollingUp
    }
  }
  return {
    'transform transition-transform duration-300': true,
    'translate-y-0': headerState.isAtTop,
    '-translate-y-12': headerState.isScrollingUp,
    '-translate-y-[150%]': !headerState.isAtTop && !headerState.isScrollingUp
  }
})

const thirdLayerClasses = computed(() => {
  if (isMobile.value) {
    return {
      'transform transition-transform duration-300': true,
      'translate-y-0': headerState.isAtTop || headerState.isScrollingUp,
      '-translate-y-full': !headerState.isAtTop && !headerState.isScrollingUp
    }
  }
  return {
    'transform transition-transform duration-300': true,
    'translate-y-0': headerState.isAtTop,
    '-translate-y-[200%]': !headerState.isAtTop && headerState.isScrollingUp,
    '-translate-y-[180%]': !headerState.isAtTop && !headerState.isScrollingUp
  }
})

const mobileSearchClasses = computed(() => ({
  '-translate-y-[200%]': !headerState.isAtTop || (headerState.isAtTop && !headerState.isScrollingUp),
  'translate-y-0': headerState.isAtTop,
}))

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>