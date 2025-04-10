<script setup lang="ts">
import { useDeviceDetection } from '~/composables/useDeviceDetection';


interface CarouselProps {
  title?: string;
  products: any[];
  all?: string;
}

const props = defineProps({
  banner: {
    type: String,
    default: '/images/home-banners/banner-5.webp',
  },
  bannerAlt: {
    type: String,
    default: '',
  },
  bannerMobile: {
    type: String,
    default: '/images/home-banners/banner-5-mobile.webp',
  },
  bannerMobileAlt: {
    type: String,
    default: '',
  },
  carousel: {
    type: Object as () => CarouselProps,
    default: () => ({
      products: [],
      all: '',
      title: '',
    }),
  }
});

// Computed property to ensure title is always a string
const carouselTitle = computed(() => props.carousel.title || '');

// Use our device detection composable
const { isMobile } = useDeviceDetection();
</script>

<template>
  <section class="irsm-container mb-24" dir="rtl">
    <HomeSectionHeader 
      :title="carouselTitle" 
      title-class="heading-5" 
      :showMoreLink="carousel.all" 
    />
    
    <div class="flex gap-4">
      <!-- Banner Image -->
      <div class="md:grow h-auto w-[160px] md:min-w-[220px]">
        <Banner 
          container-class="w-full h-full" 
          image-class="object-cover md:object-contain"
          :src="isMobile ? bannerMobile : banner" 
          :alt="isMobile ? bannerMobileAlt : bannerAlt" 
          variant="primary" 
        />
      </div>
      
      <!-- Product Carousel -->
      <ProductCarousel 
        :products="carousel.products" 
        :loop="!isMobile"
        class="h-auto w-full -mr-[176px] md:mr-0 md:w-[74%] xl:w-[80%] 2xl:w-[82%]"
        carousel-item-class="basis-[20%] md:basis-[26.5%] lg:basis-[24.5%] xl:basis-[auto]" 
        :show-banner-slot="true"
      >
        <template #banner-placeholder>
          <div class="min-w-[160px] h-full pointer-events-none md::hidden ml-4"></div>
        </template>
      </ProductCarousel>
    </div>
  </section>
</template>

<style scoped></style>