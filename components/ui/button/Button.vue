<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { type ButtonVariants, buttonVariants } from '.'
import {NuxtLink} from "#components";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})

const componentTag = computed(() => props.to ? NuxtLink : props.as)

</script>

<template>
  <Primitive
      :as="componentTag"
      :as-child="asChild"
      :to="props.to"
      :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
