<script setup lang="ts">
defineProps<{
  text: string
  to: string
  prependIcon?: string
  prependIconColor?: string
  appendIcon?: string
}>()
</script>

<template>
  <NuxtLink :to="to" 
            class="w-full max-w-[500px] flex px-4 py-4 items-center h-fit justify-between border-b border-b-border/30 last:border-b-0">
    <i v-if="prependIcon" :class="[prependIcon, prependIconColor || 'text-primary', 'ml-2 text-lg']" />
    <span class="w-full">{{ text }}</span>
    <i v-if="appendIcon" :class="[appendIcon, 'text-xs text-primary']" />
  </NuxtLink>
</template> 