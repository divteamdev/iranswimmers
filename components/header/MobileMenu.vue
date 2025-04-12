<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const closeMenu = () => {
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
    <div class="bg-background h-full w-3/4 p-4 right-0 absolute">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-bold text-lg">منو</h2>
        <Button variant="ghost" size="icon" @click="closeMenu">
          <Icon name="heroicons:x-mark" class="text-xl"/>
        </Button>
      </div>
      <HeaderMenu :isMobile="true"/>
    </div>
  </div>
</template> 