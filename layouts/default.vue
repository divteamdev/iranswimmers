<script setup lang="ts">
import Header from '~/components/header/index.vue';
import Footer from '~/components/footer/index.vue';
import BottomNavigation from '~/components/bottomNavigation/index.vue';
</script>

<template>
  <Header />

  <main class="py-8">
    <NuxtPage />
  </main>
  <Footer class="pb-16 lg:pb-0" />
  <BottomNavigation />
</template>

<style scoped></style>