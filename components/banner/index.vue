<script setup lang="ts">
import {ref} from 'vue';
import {NuxtLink} from "#components";
import { cn } from '@/lib/utils'

interface BannerProps {
  src: string;
  alt?: string;
  variant?: 'primary' | 'secondary' | 'full-width' | 'custom';
  containerClass?: string;
  imageClass?: string;
  loadingClass?: string;
  loading?: boolean;
  to?: string
  href?: string
}

const props = withDefaults(defineProps<BannerProps>(), {
  alt: 'Banner image',
  variant: 'primary',
  containerClass: '',
  imageClass: '',
  loadingClass: '',
  loading: false,
});

const isLoaded = ref(false);

const handleImageLoaded = (): void => {
  isLoaded.value = true;
};

// Determine which component to render based on whether 'to' is provided
const componentTag = computed(() => (props.to ? NuxtLink : (props.href ? 'a' : 'div')))

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return {
        container: 'h-full w-[30%] rounded-2xl md:rounded-4xl overflow-hidden relative',
        image: 'h-full object-contain'
      };
    case 'full-width':
      return {
        container: 'h-auto w-full rounded-2xl md:rounded-4xl overflow-hidden relative',
        image: 'h-auto w-full object-contain'
      };
    case 'primary':
    default:
      return {
        container: 'min-w-min h-auto rounded-2xl md:rounded-4xl overflow-hidden relative',
        image: 'h-full object-contain'
      };
    case "custom":
      return {
        container: '',
        image: ''
      };
  }
});
</script>

<template>
  <component
      :is="componentTag"
      :to="to"
      :href="href"
      :class="
      cn(
        variantClasses.container, containerClass,
      )">
    <img
        :src="src"
        :alt="alt"
        :class="[variantClasses.image, imageClass]"
        loading="lazy"
        @load="handleImageLoaded"
    />

    <!-- Loading state -->
    <div
        v-if="!isLoaded && loading"
        :class="['absolute inset-0 bg-foreground/10 animate-pulse', loadingClass]"
    ></div>
  </component>
</template>