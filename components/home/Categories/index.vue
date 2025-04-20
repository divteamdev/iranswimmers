<script setup lang="ts">
import {useImagePreloader} from "~/composables/useImagePreloader";

const categories = [
  {
    title: 'نجات غریق',
    link: '/product-category/nejat',
    imageUrl: '/images/svg/west.svg',
    altText: 'نجات غریق ایران سوییمرز',
    width: 80,
    height: 80
  },
  {
    title: 'تجهیزات شنا',
    link: '/product-category/تجهیزات-شنا',
    imageUrl: '/images/svg/galssess.svg',
    altText: 'تجهیزات',
    width: 80,
    height: 80
  },
  {
    title: 'مایو آقایان',
    link: '/product-category/آقایان',
    imageUrl: '/images/svg/mayo.svg',
    altText: 'مایو آقایان ایران سوییمرز',
    width: 80,
    height: 80
  },
  {
    title: 'واترپلو',
    link: '/product-category/waterpolo-2',
    imageUrl: '/images/svg/waterpolo.svg',
    altText: 'واترپلو ایران سوییمرز',
    width: 80,
    height: 80
  },
  {
    title: 'پوشاک ارنا',
    link: '/product-category/پوشاک-arena-icons',
    imageUrl: '/images/svg/west.svg',
    altText: 'پوشاک ارنا',
    width: 80,
    height: 80
  },
  {
    title: 'آب درمانی',
    link: '/product-category/آب-درمانی',
    imageUrl: '/images/svg/health.svg',
    altText: 'آب درمانی',
    width: 80,
    height: 80
  },
  {
    title: 'مایو بانوان',
    link: '/product-category/بانوان',
    imageUrl: '/images/svg/mayo.svg',
    altText: 'مایو بانوان',
    width: 80,
    height: 80
  },
  {
    title: 'مایو کودک',
    link: '/product-category/مایو-کودک-و-نوجوان',
    imageUrl: '/images/svg/mayo.svg',
    altText: 'مایو کودکان ایران سوییمرز',
    width: 80,
    height: 80
  },
]

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const { imagesLoaded } = useImagePreloader(() =>
        categories.map(category => ({
          src: category.imageUrl,
          width: category.width,
          height: category.height,
          type: category.imageUrl.endsWith('.svg') ? 'svg' : 'image'
        })),
    { timeout: 2000 }
);
</script>

<template>
  <div>
    <ul class="flex flex-row w-full justify-between flex-wrap">
      <HomeCategoriesItem
          v-for="(category, index) in categories"
          :key="index"
          :title="category.title"
          :link="category.link"
          :image-url="category.imageUrl"
          :alt-text="category.altText"
          :width="category.width"
          :height="category.height"
          :is-loading="isLoading || !imagesLoaded"
      />
    </ul>
  </div>
</template>

<style scoped>
</style>