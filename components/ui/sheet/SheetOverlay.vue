<script setup lang="ts">
import { cn } from '@/lib/utils'
import { DialogOverlay, type DialogOverlayProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

interface ExtendedDialogOverlayProps extends DialogOverlayProps {
  open?: boolean;
  class?: HTMLAttributes['class']
}

const props = defineProps<ExtendedDialogOverlayProps>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Transition name="sheet-overlay">
    <DialogOverlay
      data-slot="sheet-overlay"
      :class="cn('fixed inset-0 z-50 bg-background/80 backdrop-blur-sm h-screen transition-opacity duration-300 ease-in-out', props.class)"
      v-bind="delegatedProps"
    >
      <slot />
    </DialogOverlay>
  </Transition>
</template>

<style scoped>
.sheet-overlay-enter-active,
.sheet-overlay-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.sheet-overlay-enter-from,
.sheet-overlay-leave-to {
  opacity: 0;
}
</style>
