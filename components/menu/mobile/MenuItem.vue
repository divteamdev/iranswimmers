<script setup lang="ts">
interface MenuItemProps {
  text: string
  to?: string
  prependIcon?: string
  prependIconColor?: string
  appendIcon?: string
  isOpen?: boolean
  isActive?: boolean
}

const props = defineProps<MenuItemProps>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="w-full max-w-[500px] border-b border-b-border/30 last:border-b-0">
    <div 
      v-if="!to" 
      @click="$emit('click')" 
      class="w-full flex px-4 py-4 gap-2 items-center justify-between cursor-pointer">
      <Icon 
        v-if="prependIcon" 
        :name="prependIcon" 
        :class="[prependIconColor, 'text-xl']" 
      />
      <span class="w-full body-3">{{ text }}</span>
      <Icon 
        v-if="appendIcon" 
        :name="appendIcon" 
        :class="['text-lg text-primary transition-transform duration-300', { 'rotate-180': isOpen }]" 
      />
    </div>
    
    <NuxtLink 
      v-else
      :to="to" 
      class="w-full flex px-4 py-4 gap-2 items-center justify-between cursor-pointer"
      :class="{ 'bg-primary/5 text-primary': isActive }"
    >
      <Icon 
        v-if="prependIcon" 
        :name="prependIcon" 
        :class="[prependIconColor, 'text-xl']" 
      />  
      <span class="w-full body-3">{{ text }}</span>
      <Icon 
        v-if="appendIcon" 
        :name="appendIcon" 
        class="text-lg text-primary transition-transform duration-300" 
      />
    </NuxtLink>
  </div>
</template>

<style scoped>
.transition-transform {
  transition: transform 0.3s ease;
}
</style> 