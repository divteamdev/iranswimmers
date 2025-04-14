<script setup lang="ts">
import { computed, watch } from 'vue';

interface UnderlayProps {
  show?: boolean;
  blur?: boolean;
  opacity?: number | string;
  zIndex?: number | string;
  onClick?: () => void;
}

const props = withDefaults(defineProps<UnderlayProps>(), {
  show: false,
  blur: true,
  opacity: 0.2,
  zIndex: 10
});

const styles = computed(() => ({
  zIndex: props.zIndex,
  backgroundColor: `rgba(255, 255, 255, ${props.opacity})`
}));

const classes = computed(() => ({
  'backdrop-blur-sm': props.blur,
  'pointer-events-none': !props.show,
  'opacity-0': !props.show,
}));

// For debugging
watch(() => props.show, (newVal) => {
  console.log('Underlay show prop changed to:', newVal);
});
</script>

<template>
  <Teleport to="body">
    <div 
      class="fixed inset-0 h-full w-full transition-opacity duration-300 ease-in-out"
      :class="classes"
      :style="styles"
      @click="props.onClick && props.onClick()"
    />
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 