<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showMoreLink: {
    type: String,
  },
  showMoreText: {
    type: String,
    default: 'مشاهده همه'
  },
  titleClass: {
    type: String,
    default: 'text-destructive heading-2 font-semibold'
  },
  showMoreClass: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="flex items-center justify-between mb-6 " dir="rtl">
    <h2 :class="titleClass + ' font-fa-num'">{{ title }}</h2>
    <Button v-if="showMoreLink" variant="link" :to="showMoreLink" class="pl-0" :class="showMoreClass" size="sm">
      {{ showMoreText }}
      <Icon name="heroicons:arrow-left" class="ms-1" />
    </Button>
  </div>
</template>

<style scoped>

</style>