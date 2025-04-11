<script setup lang="ts">
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'

interface SkeletonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<SkeletonProps>()
</script>

<template>
  <div
      data-slot="skeleton"
      class="skeleton animate-ping"
      :class="cn('rounded-md', props.class)"
  />
</template>

<style scoped>

.skeleton {
  animation: skeleton 1.5s infinite;
}

@keyframes skeleton {
  0% {
    background: var(--skeleton);
  }
  50% {
    background: var(--skeleton-foreground);
  }
  100% {
    background: var(--skeleton);
  }
}

</style>
