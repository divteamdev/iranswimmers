<script setup lang="ts">

import {SelectIcon} from "reka-ui";
</script>

<template>

  <header class="flex items-center justify-between w-full flex-col" dir="rtl">

    <HeaderRibbon/>

    <div class="first-layer flex items-center justify-between w-full px-12 border-b-border border-b py-4 gap-4">
      <div class="logo">
        <NuxtLink to="/" class="flex items-center justify-center gap-2">
          <img src="/images/logo.png" alt="Logo" class="w-16 h-16"/>
          <span class="text-primary font-bold font-fa-num">
          ایران سوییمرز
          </span>
        </NuxtLink>
      </div>

      <div class="search-box grow max-w-2xl">
        <HeaderSearch/>
      </div>

      <div class="user-box gap-2 flex">
        <Button size="lg">
          <icon name="hugeicons:user"/>
          ورود / ثبت نام
        </Button>
        <Button variant="ghost" size="icon-lg">
          <Icon name="heroicons:shopping-cart"/>
        </Button>
      </div>
    </div>

    <div class="second-layer flex items-center w-full justify-between px-12 border-b-border border-b py-4">
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

<style scoped>

</style>