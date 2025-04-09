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

    <div class="bg-primary pt-10 rounded-4xl">
      <div class="flex flex-col w-max gap-6 mb-10 pr-10" dir="rtl">
        <h2 :class="' font-fa-num heading-2 text-background'">پرفروش‌ترین محصولات ما </h2>
        <Button v-if="carousel.all" variant="default" size="lg" :to="carousel.all"
                class="bg-background hover:bg-background/95 w-fit text-primary text-lg">
          مشاهده همه محصولات
        </Button>
      </div>


      <!-- Banner Image -->
      <Banner
          container-class="absolute -top-10 md:-top-4 lg:-top-12 left-8 lg:left-20 h-40 md:h-36 lg:h-44 xl:h-52 w-auto"
          image-class="w-full h-full"
          :src="banner"
          :alt="bannerAlt"
          variant="custom"
      />
      <div class="flex gap-4 pr-10 pb-10">
        <ProductCarousel
            :products="carousel.products"
            class="h-auto w-full"
            carousel-item-class="basis-1/2 sm:[30.5] md:basis-[28.5%] lg:basis-[22%] xl:basis-[17.5%] xl:min-h-[400px]"/>
      </div>
    </div>

  </section>

</template>

<style scoped>

</style>