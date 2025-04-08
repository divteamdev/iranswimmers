<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  altText: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <li class="h-auto max-w-max border-b border-b-transparent hover:border-b-primary transition-colors duration-300 flex-1 pb-4">
    <nuxt-link :to="link" class="flex flex-col items-center text-center gap-2 h-full">
      <div class="category-bg justify-center flex items-center rounded-xl aspect-square p-2 xl:p-4">
        <img :src="imageUrl" :alt="altText || title" class="h-18 xl:h-22">
      </div>
      <span class="caption-1 ">{{ title }}</span>
    </nuxt-link>
  </li>
</template>

<style scoped>
.category-bg {
  box-shadow: 0px 0px 20px 0px rgb(115 115 115 / 7%);
  @apply transition-all duration-300;
}

.category-bg:hover {
  box-shadow: 0px 0px 20px 0px rgb(115 115 115 / 15%);
}
</style>