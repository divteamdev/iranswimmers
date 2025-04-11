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
  bannerMobile: {
    type: String,
    default: '/images/home-banners/banner-5-mobile.webp',
  },
  bannerMobileAlt: {
    type: String,
    default: 'Banner image',
  },
  carousel: {
    type: Object,
    default: () => ({
      products: [],
      all: '',
    }),
  }
});

const { isMobile } = useDeviceDetection();
</script>

<template>
  <section class="irsm-container mb-24 relative bg-primary md:bg-transparent" dir="rtl">

    <div class="md:bg-primary w-full pt-6 md:pt-10 rounded-4xl">
      <div class="flex sm:flex-row md:flex-col w-full justify-between items-center md:items-start md:w-max gap-6 mb-6 md:mb-10 px-0 md:px-0 md:pr-10" dir="rtl">
        <h2 class="heading-3 text-background font-fa-num">پرفروش‌ترین محصولات </h2>
        <Button v-if="carousel.all" variant="default" 
        :size="isMobile ? 'sm' : 'lg'"
        :to="carousel.all"
                class="bg-background hover:bg-background/95 w-fit text-primary">
          <span class="hidden md:block">
            مشاهده همه محصولات
          </span>
          <span class="block md:hidden">
            مشاهده همه
          </span>
        </Button>
      </div>


      <!-- Banner Image -->
      <Banner
          container-class="absolute -top-4 lg:-top-12 left-8 lg:left-20 h-30 lg:h-44 xl:h-52 w-auto hidden md:block"
          image-class="w-full h-full"
          :src="banner"
          :alt="bannerAlt"
          variant="custom"
      />



          
      <div class="flex gap-4 md:gap-0 md:flex-col md:pr-10 pb-6 md:pb-10 -ml-6 -mr-6 md:-ml-0 md:-mr-0">
        <ProductCarousel
            :products="carousel.products"
            class="h-auto w-full"
            carousel-item-class="basis-auto"/>

      </div>
    </div>

  </section>

</template>

<style scoped>

</style>