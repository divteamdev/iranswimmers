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
  }
})
</script>

<template>
  <div class="flex items-center justify-between mb-6 " dir="rtl">
    <h2 :class="titleClass + ' font-fa-num'">{{ title }}</h2>
    <Button v-if="showMoreLink" variant="link" :to="showMoreLink" class="pl-0">
      {{ showMoreText }}
      <Icon name="heroicons:arrow-left" class="ms-1" />
    </Button>
  </div>
</template>

<style scoped>

</style>