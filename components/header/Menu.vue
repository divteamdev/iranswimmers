<script setup lang="ts">
// Move menu items outside of component setup for better caching
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
</script>

<template>
  <div class="flex items-center gap-4">
    <Button variant="secondary" size="lg" class="font-fa-num">
      <Icon name="hugeicons:menu-01" class="text-lg"/>
      دسته‌بندی محصولات
    </Button>

    <nav>
      <ul class="flex items-center justify-between">
        <HeaderItem
            v-for="item in menuItems"
            :key="item.to"
            :name="item.name"
            :icon="item.icon"
            :icon-color="item.color"
            :to="item.to"
            class="border-l border-l-border h-4 last:border-l-0"
        />
      </ul>
    </nav>
  </div>
</template>