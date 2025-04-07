<script setup lang="ts">

</script>

<template>
  <div class="flex items-center gap-4">
    <Button variant="secondary" size="lg">
      <Icon name="hugeicons:menu-01" class="w-5 h-5"/>
      دسته‌بندی محصولات
    </Button>
    <nav>
      <ul class="flex items-center justify-between gap-4">
        <li>
          <NuxtLink to="/">
            <Icon name="hugeicons:home-11" class="w-5 h-5"/>
            صفحه نخست
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/academy">
            <Icon name="hugeicons:swimming" class="w-5 h-5"/>
            آکادمی ایران سوییمرز
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/mag">
            <Icon name="heroicons:document-text" class="w-5 h-5"/>
            مجله ایران سوییمرز
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about-us">
            <Icon name="heroicons:information-circle" class="w-5 h-5"/>
            درباره ما
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>

</template>

<style scoped>

</style>