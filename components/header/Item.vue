<script setup lang="ts">
import type { ButtonVariants } from '@/components/ui/button';
import type { PropType } from 'vue';

// Improve props definition with more specific types
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String as PropType<ButtonVariants['size']>,
    default: "lg",
  },
  name: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  variant: {
    type: String as PropType<ButtonVariants['variant']>,
    default: "ghost",
  },
  iconColor: {
    type: String,
    default: "text-primary-foreground",
  },
});

// Use route outside of computed for better reactivity
const route = useRoute();
const isActive = computed(() => route.path === props.to);
</script>

<template>
  <li class="flex items-center justify-center">
    <Button
        :to="to"
        :variant="variant"
        :size="size"
        class="flex items-center gap-2 hover:bg-transparent hover:text-primary px-2"
    >
      <Icon
          :name="icon"
          :class="[isActive ? iconColor : 'text-foreground', 'text-lg']"
      />
      {{ name }}
    </Button>
  </li>
</template>