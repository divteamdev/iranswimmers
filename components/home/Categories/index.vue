<script setup lang="ts">
const categories = [
  {
    title: 'نجات غریق',
    link: '/product-category/uncategories',
    imageUrl: '/images/svg/west.svg',
    altText: 'نجات غریق ایران سوییمرز'
  },
  {
    title: 'تجهیزات شنا',
    link: '/product-category/تجهیزات-شنا',
    imageUrl: '/images/svg/galssess.svg',
    altText: 'تجهیزات'
  },
  {
    title: 'مایو آقایان',
    link: '/product-category/آقایان',
    imageUrl: '/images/svg/mayo.svg',
    altText: 'مایو آقایان ایران سوییمرز'
  },
  {
    title: 'واترپلو',
    link: '/product-category/waterpolo-2',
    imageUrl: '/images/svg/waterpolo.svg',
    altText: 'واترپلو ایران سوییمرز'
  },
  {
    title: 'پوشاک ارنا',
    link: '/product-category/پوشاک-arena-icons',
    imageUrl: '/images/svg/west.svg',
    altText: 'پوشاک ارنا'
  },
  {
    title: 'آب درمانی',
    link: '/product-category/آب-درمانی',
    imageUrl: '/images/svg/health.svg',
    altText: 'آب درمانی'
  },
  {
    title: 'مایو بانوان',
    link: '/product-category/بانوان',
    imageUrl: '/images/svg/mayo.svg',
    altText: 'مایو بانوان'
  },
  {
    title: 'مایو کودک',
    link: '/product-category/مایو-کودک-و-نوجوان',
    imageUrl: '/images/svg/mayo.svg',
    altText: 'مایو کودکان ایران سوییمرز'
  },
]
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
      />
    </ul>
  </div>
</template>

<style scoped>
</style>