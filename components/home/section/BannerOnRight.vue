<script setup lang="ts">
import {useHomeStore} from "~/stores/homeStore";

const homeStore = useHomeStore();

const props = defineProps({
  banner:{
    type: String,
    default: '/images/home-banners/banner-5.webp',
  },
  bannerAlt:{
    type: String,
  },
  carousel: {
    type: Object,
    default: () => ({
      products: [],
      all: '',
    }),
  }
});
</script>

<template>
  <section class="irsm-container mb-24" dir="rtl">
    <HomeSectionHeader :title="carousel.title" title-class="heading-5"
                       :show-more-link="carousel.all"/>
    <div class="flex gap-4">
      <!-- Banner Image -->
      <div class="grow">
        <Banner
            :src="banner"
            :alt="bannerAlt"
            variant="primary"
        />
      </div>
      <ProductCarousel
          :products="carousel.products"
          class="h-auto w-[74%] xl:w-[80%] 2xl:w-[82%]"
          carousel-item-class="basis-1/2 md:basis-[26.5%] lg:basis-[24.5%] xl:basis-[auto]"/>
    </div>
  </section>
</template>

<style scoped>

</style>