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
  },
  titleBadge: {
    type: String,
    default: ''
  },
  titleBadgeClass: {
    type: String,
    default: 'text-destructive bg-destructive/10 px-2 py-1 rounded-full font-fa-num body-4'
  }
})
</script>

<template>
  <div class="flex items-center justify-between mb-6 " dir="rtl">
    <div class="flex items-center gap-2">
      <h2 :class="titleClass + ' font-fa-num'">{{ title }}</h2>
      <span v-if="titleBadge" class="title-badge" :class="titleBadgeClass">
      {{ titleBadge }}
      </span>
    </div>
    <slot name="right-content"></slot>
    <Button v-if="showMoreLink" variant="link" :to="showMoreLink" class="pl-0" :class="showMoreClass" size="sm">
      {{ showMoreText }}
      <Icon name="heroicons:arrow-left" class="ms-1" />
    </Button>
  </div>
</template>

<style scoped>

</style>