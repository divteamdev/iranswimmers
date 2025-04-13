<script setup lang="ts">
// Define menu items outside for better performance
const menuItems = [
  {
    name: 'صفحه نخست',
    icon: 'hugeicons:home-11',
    to: '/',
    color: 'text-secondary',
  },
  {
    name: 'آکادمی ایران سوییمرز',
    icon: 'hugeicons:swimming',
    to: '/academy',
    color: 'text-primary',
  },
  {
    name: 'مجله ایران سوییمرز',
    icon: 'heroicons:document-text',
    to: '/mag',
    color: 'text-[#8224e3]',
  },
  {
    name: 'درباره ما',
    icon: 'heroicons:information-circle',
    to: '/about-us',
    color: 'text-primary',
  },
] as const;

defineProps<{
  isMobile?: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-4 md:flex-row md:items-center">
    <Button 
      variant="secondary" 
      class="font-fa-num justify-start" 
      to="/shop"
      size="lg"
    >
      <Icon name="hugeicons:menu-01" class="text-lg"/>
      <span class="hidden lg:block">دسته‌بندی محصولات</span>
      <span class="block lg:hidden">فهرست</span>
    </Button>

    <nav class="w-full">
      <ul class="hidden lg:flex md:items-center md:justify-between">
        <HeaderItem
          v-for="item in menuItems"
          :key="item.to"
          :name="item.name"
          :icon="item.icon"
          :icon-color="item.color"
          :to="item.to"
          :class="isMobile ? 'py-2 border-b border-border' : 'border-l border-l-border h-4 last:border-l-0'"
        />
      </ul>
    </nav>
  </div>
</template>