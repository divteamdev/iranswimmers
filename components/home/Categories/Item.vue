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
  <li class="h-auto max-w-min min-w-[23%] md:min-w-[10%] lg:min-w-max border-b border-b-transparent hover:border-b-primary transition-colors duration-300 flex-1 pb-4 ">
    <nuxt-link :to="link" class="flex flex-col items-center text-center gap-2 h-full w-full">
      <div class="category-bg rounded-xl aspect-square p-2 lg:p-3 hover:bg-primary/10">
        <component
            :is="imageUrl.endsWith('.svg') ? 'div' : 'img'"
            :src="!imageUrl.endsWith('.svg') ? imageUrl : undefined"
            :alt="altText || title"
            class="h-12 w-auto object-contain"
            v-if="!imageUrl.endsWith('.svg')"
        />
        <client-only v-else>
          <img :src="imageUrl" :alt="altText || title" class="h-full xl:h-22"/>
        </client-only>
      </div>
      <span class="caption-2 sm:font-medium md:text-sm lg:text-base">{{ title }}</span>
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