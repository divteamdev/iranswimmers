<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Category } from './types'

const props = defineProps<{
  children: Category[]
  activeSubmenu: number
}>()

const emit = defineEmits(['showSubmenu'])

const handleCategoryHover = (categoryId: number) => {
  emit('showSubmenu', categoryId)
}
</script>

<template>
  <div class="flex flex-col h-auto w-auto min-w-[20%] border-l border-border/50 bg-muted overflow-auto max-h-[500px]">
    <ul class="h-full flex flex-col">
      <nuxt-link
        v-for="child in children"
        :key="child.id"
        :to="`/product-category/${child.slug}`"
        class="flex flex-row gap-2 px-3 py-3.5 items-center cursor-pointer transition-all duration-300"
        :class="{'active-category': activeSubmenu === child.id}"
        @mouseover="() => handleCategoryHover(child.id)"
      >
        <Icon name="hugeicons:swimming" class="main-item__icon" />
        
        <span class="main-item__title w-auto grow body-4">{{ child.name }}</span>
        
        <Icon 
          v-if="child.children && child.children.length > 0"
          name="hugeicons:chevron-left"
          class="main-item__icon__append"
        />
      </nuxt-link>
    </ul>
  </div>
</template>

<style scoped>
/* Category styles */
.main-item__icon {
  font-size: 1.5rem;
  margin-left: 0.5rem;
}

.main-item__icon__append {
  transition: all 0.3s ease;
  font-size: 0.625rem;
}

.active-category {
  background-color: white;
}

.active-category .main-item__title, 
.active-category .main-item__icon, 
.active-category .main-item__icon__append {
  color: var(--primary);
}

.active-category:hover .main-item__icon__append {
  animation: slideFromLeft 0.8s ease-in-out;
}

@keyframes slideFromLeft {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style> 