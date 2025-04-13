<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  id: string
  label: string
  icon: string
}

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const tabs: Tab[] = [
  {
    id: 'productCategories',
    label: 'دسته‌بندی‌ها',
    icon: 'mdi-store-outline'
  },
  {
    id: 'websitePages',
    label: 'موارد دیگر',
    icon: 'mdi-more'
  }
]

const activeTab = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="border-b border-border">
    <div class="flex overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap no-ring"
        :class="[
          activeTab === tab.id 
            ? 'text-primary border-b-2 border-primary' 
            : 'text-muted-foreground hover:text-foreground'
        ]"
      >
        <i :class="tab.icon" class="text-lg" />
        <span>{{ tab.label }}</span>
        <i
          class="mdi mdi-chevron-down transition-all duration-300"
          :class="{ 'rotate-0': activeTab === tab.id, 'rotate-90': activeTab !== tab.id }"
        />
      </button>
    </div>
  </div>
</template> 