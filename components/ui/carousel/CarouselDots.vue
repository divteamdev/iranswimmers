<script setup lang="ts">
defineProps({
  currentIndex: {
    type: Number,
    required: true
  },
  totalSlides: {
    type: Number,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'secondary'].includes(value)
  }
})

const emit = defineEmits(['navigate'])

// Emit the index to navigate to when a dot is clicked
function handleDotClick(index: number) {
  emit('navigate', index)
}
</script>

<template>
  <div class="flex justify-center gap-1 z-10">
    <button
        v-for="index in totalSlides"
        :key="index"
        @click="handleDotClick(index - 1)"
        class="size-2.5 rounded-full transition-all duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        :class="{
          'bg-primary/30 hover:bg-primary/90': variant === 'default',
          'bg-secondary/30 hover:bg-secondary/90': variant === 'secondary',
          'bg-primary/100 w-8': variant === 'default' && currentIndex === (index - 1),
          'bg-secondary/100 w-8': variant === 'secondary' && currentIndex === (index - 1)
        }"
        type="button"
        :aria-label="`Go to slide ${index}`"
        :aria-current="currentIndex === (index - 1) ? 'true' : 'false'"
    ></button>
  </div>
</template>