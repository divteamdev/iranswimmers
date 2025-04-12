<script setup lang="ts">
const { isMobile, isTablet } = useDeviceDetection()

const navItems = [
  {
    name: 'خانه',
    icon: 'home',
    to: '/',
    color: 'text-secondary',
  },
  {
    name: 'محصولات',
    icon: 'shop',
    to: '/shop',
    color: 'text-primary',
  },
  {
    name: 'جستجو',
    icon: 'search',
    to: '#search',
    color: 'text-primary',
  },
  {
    name: 'سبد خرید',
    icon: 'cart',
    to: '/checkout/cart',
    color: 'text-[#8224e3]',
  },

  {
    name: 'پروفایل',
    icon: 'user',
    to: '/user',
    color: 'text-primary',
  },
] as const

const route = useRoute()
const isActive = (path: string) => route.path === path
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden z-50" dir="rtl">
    <nav class="flex items-center justify-around h-14">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center justify-center w-full h-full border-l border-l-border/50 :last-border-none pt-1"
        :class="isActive(item.to) ? 'text-primary' : 'text-muted-foreground'"
      >
        <BottomNavigationIcon
          :name="item.icon"
          :class="isActive(item.to) ? item.color : ''"
          :isActive="isActive(item.to)"
        />
        <span class="text-xs font-fa-num mt-1">{{ item.name }}</span>
      </NuxtLink>
    </nav>
  </div>
</template> 