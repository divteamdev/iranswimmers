<script setup lang="ts">
</script>

<template>
  <header class="flex flex-col w-full" dir="rtl">
    <HeaderRibbon/>

    <div class="flex items-center justify-between w-full px-12 py-4 border-b border-b-border">
      <div class="min-w-[220px] flex justify-start">
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" class="w-16 h-16"/>
          <span class="text-primary font-bold font-fa-num">
            ایران سوییمرز
          </span>
        </NuxtLink>
      </div>

      <div class="grow max-w-2xl">
        <HeaderSearch/>
      </div>

      <div class="flex gap-2 min-w-[220px] justify-end">
        <Button size="lg">
          <Icon name="hugeicons:user"/>
          ورود / ثبت نام
        </Button>
        <Button variant="ghost" size="icon-lg">
          <Icon name="heroicons:shopping-cart" class="text-2xl"/>
        </Button>
      </div>
    </div>

    <div class="flex items-center justify-between w-full px-12 py-4 border-b border-b-border">
      <HeaderMenu/>
      <Button variant="ghost" size="lg">
        <Icon name="hugeicons:customer-support" class="text-secondary text-2xl"/>
        <span dir="ltr" class="text-lg font-normal">
          0921 234 4566
        </span>
      </Button>
    </div>
  </header>
</template>