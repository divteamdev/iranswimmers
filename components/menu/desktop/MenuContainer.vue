<script setup lang="ts">
import { defineProps } from 'vue'
import LoadingIndicator from './LoadingIndicator.vue'

defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <div class="menu-container w-[97vw] lg:w-[85vw] mx-auto bg-background border border-border shadow-lg overflow-hidden rounded-md">
    <div v-if="isLoading" class="flex items-center justify-center p-8">
      <LoadingIndicator />
    </div>
    <slot v-else></slot>
  </div>
</template>

<style scoped>
.menu-container {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style> 