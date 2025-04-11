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
const { isXs, isMobile } = useDeviceDetection();

// Create a computed property for the loop setting
const shouldLoop = computed(() => !isXs.value);
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
      <div class="md:grow h-auto w-[140px] md:min-w-[200px]">
        <Banner 
          container-class="w-full h-full" 
          image-class="object-cover"
          :src="isMobile ? bannerMobile : banner" 
          :alt="isMobile ? bannerMobileAlt : bannerAlt" 
          variant="primary" 
        />
      </div>
      
      <!-- Product Carousel -->
      <ProductCarousel 
        :products="carousel.products" 
        :loop="shouldLoop"
        class="h-auto w-full -mr-[156px] md:mr-0 md:w-[74%] lg:w-[80%] 2xl:w-[85%]"
        carousel-item-class="basis-auto md:basis-[26.5%] lg:basis-[24.5%] xl:basis-[auto]" 
        :show-banner-slot="true"
      >
        <template #banner-placeholder>
          <div class="min-w-[140px] h-full pointer-events-none md:hidden ml-4"></div>
        </template>
      </ProductCarousel>
    </div>
  </section>
</template>

<style scoped></style>