<script setup lang="ts">
import {useHomeStore} from "~/stores/homeStore";

const homeStore = useHomeStore();

const props = defineProps({
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
  <section class="irsm-container mb-20" dir="rtl">
    <HomeSectionHeader :title="carousel.title" title-class="heading-5"
                       :show-more-link="carousel.all"/>
    <div class="flex gap-4">
      <div class="w-[25%] xl:w-[18%] h-auto rounded-xl overflow-hidden">
        <img
            src="/images/home-banners/banner-5.webp"
            class="h-full object-contain"
            loading="lazy"/>
      </div>
      <ProductCarousel
          :products="carousel.products"
          class="h-auto w-[74%] xl:w-[81%]"
          carousel-item-class="basis-1/2 md:basis-[30.5%] lg:basis-[28.5%] xl:flex-[0_0_22.22%]"/>
    </div>
  </section>
</template>

<style scoped>

</style>