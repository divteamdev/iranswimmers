<script setup lang="ts">
import {useHomeStore} from "~/stores/homeStore";

const homeStore = useHomeStore();

const props = defineProps({
  banner: {
    type: String,
    default: '/images/home-banners/banner-5.webp',
  },
  bannerAlt: {
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
  <section class="irsm-container mb-24 relative " dir="rtl">

    <div class="flex gap-4">
      <div class="bg-secondary rounded-4xl">
        <!-- Banner Image -->
        <Banner
            container-class="scale-120 flex h-full justify-center"
            image-class="w-full h-full object-contain"
            :src="banner"
            :alt="bannerAlt"
            variant="custom"
        />
      </div>

      <div class="flex flex-col gap-4 px-10 py-10 h-auto w-[82%] xl:w-[85%] bg-secondary rounded-4xl">

        <HomeSectionHeader :title="carousel.title" title-class="heading-2 text-background"
                           show-more-class="text-white"
                           :show-more-link="carousel.all"/>

        <ProductCarousel
            :products="carousel.products"
            class="h-auto w-full"
            carousel-item-class="basis-1/2 sm:[31] md:basis-[29%] lg:basis-[28%] xl:basis-[auto] xl:min-h-[400px]"/>
      </div>
    </div>

  </section>

</template>

<style scoped>

</style>