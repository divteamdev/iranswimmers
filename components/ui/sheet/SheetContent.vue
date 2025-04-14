<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'

import { computed } from 'vue'

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: 'top' | 'right' | 'bottom' | 'left',
  disableOutsidePointerEvents?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: 'right',
  disableOutsidePointerEvents: false,
})
const emits = defineEmits<DialogContentEmits & { close: [] }>()

const delegatedProps = reactiveOmit(props, 'class', 'side')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Use the appropriate transition name based on the side
const transitionName = computed(() => `sheet-${props.side}`)

const handleClose = () => {
  emits('close')
}
</script>

<template>
  <DialogPortal>
    <Transition :name="transitionName">
      <DialogContent data-slot="sheet-content" :class="cn(
        'bg-background fixed z-50 flex flex-col gap-4 shadow-lg',
        side === 'right' && 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        side === 'left' && 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        side === 'top' && 'inset-x-0 top-0 h-auto border-b',
        side === 'bottom' && 'inset-x-0 bottom-0 h-auto border-t',
        props.class)" v-bind="{ ...forwarded, ...$attrs }">
        <slot />

        <Button variant="ghost" size="icon" @click="handleClose"
          class="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <Icon name="hugeicons:cancel-01" class="text-2xl" />
          <span class="sr-only">Close</span>
        </Button>

      </DialogContent>
    </Transition>
  </DialogPortal>
</template>
