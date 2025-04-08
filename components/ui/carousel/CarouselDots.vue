<script setup lang="ts">
defineProps({
  currentIndex: {
    type: Number,
    required: true
  },
  totalSlides: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['navigate'])

// Emit the index to navigate to when a dot is clicked
function handleDotClick(index: number) {
  emit('navigate', index)
}
</script>

<template>
  <div class="flex justify-center gap-2 z-10">
    <button
        v-for="index in totalSlides"
        :key="index"
        @click="handleDotClick(index - 1)"
        class="size-2.5 rounded-full bg-primary/50 transition-all duration-300 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        :class="{ 'bg-primary/100 w-8': currentIndex === (index - 1) }"
        type="button"
        :aria-label="`Go to slide ${index}`"
        :aria-current="currentIndex === (index - 1) ? 'true' : 'false'"
    ></button>
  </div>
</template>