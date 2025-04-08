<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { NuxtLink } from '#components'

const props = defineProps<{
  class?: HTMLAttributes['class']
  to?: string
  href?: string
}>()

// Determine which component to render based on whether 'to' is provided
const componentTag = computed(() => (props.to ? NuxtLink : (props.href ? 'a' : 'div')))
</script>

<template>
  <component
      :is="componentTag"
      :to="to"
      :href="href"
      :class="
      cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl p-4',
        props.class,
      )
    "
  >
    <slot />
  </component>
</template>
