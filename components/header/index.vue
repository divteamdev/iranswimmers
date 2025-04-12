<script setup lang="ts">
const isMobileMenuOpen = ref(false)
const { isMobile } = useDeviceDetection()
const lastScrollY = ref(0)
const isScrollingUp = ref(false)
const isAtTop = ref(true)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Handle scroll events
const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // Determine scroll direction
  isScrollingUp.value = currentScrollY < lastScrollY.value
  isAtTop.value = currentScrollY <= 0
  
  lastScrollY.value = currentScrollY
}

// Add scroll listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

// Clean up listener
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    class="flex flex-col w-full top-0 z-50 bg-transparent"
    :class="{
      'h-20': !isAtTop && !isMobile,
      'fixed': !isMobile
    }"
    dir="rtl"
  >
    <!-- Ribbon Layer -->
    <div 
      class="transition-all duration-300 ease-in-out"
      :class="{
        'opacity-0 h-0': !isAtTop,
        'opacity-100 h-12': isAtTop || isMobile
      }"
    >
      <HeaderRibbon/>
    </div>

    <!-- Second Layer (Logo, Search, User Actions) -->
    <div 
      class="flex items-center justify-between w-full px-4 md:px-8 py-4 border-b border-b-border transition-all duration-300 ease-in-out z-10 bg-background"
      :class="{
        'h-0 -translate-y-[130%]': !isAtTop && !isScrollingUp && !isMobile,
        'h-20 translate-y-0': isAtTop || isScrollingUp || isMobile
      }"
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
      :class="{
        '-translate-y-[140%]': !isAtTop && isScrollingUp && !isMobile,
        '-translate-y-[42%] h-20': !isScrollingUp && !isMobile,
        'h-auto translate-y-0': isAtTop
      }"
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
  <div v-if="!isMobile" class="h-[calc(12rem+1px)] md:h-[calc(16rem+1px)]"></div>
</template>