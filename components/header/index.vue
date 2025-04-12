<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

// State management
const isMobileMenuOpen = ref(false)
const { isMobile } = useDeviceDetection()

// Scroll state with throttled updates for better performance
const headerState = reactive({
  lastScrollY: 0,
  isScrollingUp: true,
  isAtTop: true
})

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Throttled scroll handler for better performance
const handleScroll = useDebounceFn(() => {
  const currentScrollY = window.scrollY
  headerState.isScrollingUp = currentScrollY < headerState.lastScrollY
  headerState.isAtTop = currentScrollY <= 0
  headerState.lastScrollY = currentScrollY
}, 10)

// Computed styles for cleaner template
const headerClasses = computed(() => ({
  fixed: !isMobile.value,
  'h-20': !headerState.isAtTop && !isMobile.value
}))

const ribbonClasses = computed(() => ({
  'opacity-0 h-0': !headerState.isAtTop && !isMobile.value,
  'opacity-100 h-12': headerState.isAtTop || isMobile.value
}))

const mainNavClasses = computed(() => ({
  'h-0 -translate-y-[130%]': !headerState.isAtTop && !headerState.isScrollingUp && !isMobile.value,
  'h-20 translate-y-0': headerState.isAtTop || headerState.isScrollingUp || isMobile.value
}))

const menuNavClasses = computed(() => ({
  '-translate-y-[140%]': !headerState.isAtTop && headerState.isScrollingUp && !isMobile.value,
  '-translate-y-[42%] h-20': !headerState.isScrollingUp && !isMobile.value,
  'h-auto translate-y-0': headerState.isAtTop
}))

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  // Initial calculation to set correct state
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    class="flex flex-col w-full top-0 z-50 bg-transparent transition-all duration-200"
    :class="headerClasses"
    dir="rtl"
  >
    <!-- Ribbon Layer -->
    <div 
      class="transition-all duration-300 ease-in-out"
      :class="ribbonClasses"
    >
      <HeaderRibbon/>
    </div>

    <!-- Second Layer (Logo, Search, User Actions) -->
    <div 
      class="flex items-center justify-between w-full px-4 md:px-8 py-4 border-b border-b-border transition-all duration-300 ease-in-out z-10 bg-background"
      :class="mainNavClasses"
    >
      <HeaderLogo/>
      
      <div class="grow max-w-lg lg:max-w-xl xl:max-w-2xl hidden md:block">
        <HeaderSearch/>
      </div>

      <HeaderUserActions/>
    </div>

    <!-- Third Layer (Menu, Support) -->
    <div 
      class="hidden md:flex items-center justify-between w-full px-8 py-4 border-b border-b-border transition-all duration-300 bg-background ease-in-out z-0"
      :class="menuNavClasses"
    >
      <HeaderMenu/>
      <HeaderSupportInfo/>
    </div>

    <!-- Mobile Search -->
    <div class="flex md:hidden items-center justify-between w-full px-4 py-3 border-b border-b-border bg-background">
      <div class="grow">
        <HeaderSearch/>
      </div>
    </div>

    <HeaderMobileMenu 
      :isOpen="isMobileMenuOpen"
      @close="closeMobileMenu"
    />
  </header>
  
  <!-- Add padding to prevent content from jumping under fixed header -->
  <div v-if="!isMobile" class="h-[calc(12rem+1px)]"></div>
</template>