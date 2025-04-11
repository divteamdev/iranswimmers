<script setup lang="ts">
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  tag?: string
}>()
</script>

<template>
  <component
      :is="props.tag || 'h2'"
      data-slot="card-title"
      :class="cn(props.class)"
  >
    <slot/>
  </component>
</template>
