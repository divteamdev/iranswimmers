<script setup lang="ts">
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'
import {useVModel} from '@vueuse/core'
import { ref, watch, computed, nextTick } from 'vue'
import { convertPersianToEnglish } from '@/helpers/numberUtils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  size?: 'default' | 'lg'
  rules?: string // regex pattern string
  errorMessage?: string // custom error message
  ruleOnWatch?: boolean // Only validate after focus when true
  convertNumbers?: boolean // Enable Persian to English conversion
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const hasError = ref(false)
const hasBeenFocused = ref(false)

// Handle input and convert Persian numbers if needed
const handleInput = (event: Event) => {
  if (!props.convertNumbers) return;

  const input = event.target as HTMLInputElement;
  const cursorPosition = input.selectionStart;
  const originalValue = input.value;
  const convertedValue = convertPersianToEnglish(originalValue);

  if (convertedValue !== originalValue) {
    modelValue.value = convertedValue;

    // Preserve cursor position after conversion
    nextTick(() => {
      if (cursorPosition !== null) {
        input.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  }
}

const validateInput = () => {
  if (!props.rules || modelValue.value === undefined || modelValue.value === '') {
    hasError.value = false
    return
  }

  if (!props.ruleOnWatch || (props.ruleOnWatch && hasBeenFocused.value)) {
    try {
      const regex = new RegExp(props.rules)
      hasError.value = !regex.test(String(modelValue.value))
    } catch (e) {
      console.error('Invalid regex pattern:', e)
      hasError.value = false
    }
  }
}

const handleFocus = () => {
  hasBeenFocused.value = true
  validateInput() // Validate immediately on focus
}

watch(modelValue, validateInput)

const sizeClasses = computed(() => {
  return props.size === 'lg' ? 'h-12 py-1.5 rounded-lg' : 'h-9 py-1 rounded-md'
})
</script>

<template>
  <div class="w-full">
    <input
        v-model="modelValue"
        data-slot="input"
        :class="cn(
          'font-fa-num body-3',
          'file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-primary flex w-full min-w-0 border bg-transparent px-3 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          hasError ? 'border-destructive ring-destructive/20 bg-destructive/5' : 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          sizeClasses,
          props.class,
        )"
        :aria-invalid="hasError"
        @focus="handleFocus"
        @input="handleInput"
    >
    <small v-if="hasError" class="mt-1.5 block text-destructive px-1.5 py-0.5 rounded caption-2">
      {{ props.errorMessage || 'ورودی اشتباه است' }}
    </small>
  </div>
</template>