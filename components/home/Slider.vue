<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { ref } from 'vue'
import CarouselDots from '@/components/ui/carousel/CarouselDots.vue'
import { useHomeStore } from '~/stores/homeStore'
import { useImagePreloader } from '~/composables/useImagePreloader'

// Define the proper type for your carousel ref
interface CarouselRef {
  carouselApi?: CarouselApi
}

const props = defineProps({
  isLoading:{
    type: Boolean,
  },
})

const carouselRef = ref<CarouselRef | null>(null)
const currentIndex = ref(0)
const autoplayPlugin = ref(Autoplay({delay: 5000}))
const totalSlides = 4
const homeStore = useHomeStore()

// Track the current slide index with proper typing
function onSlideChange(api: CarouselApi | undefined) {
  if (api && typeof api.selectedScrollSnap === 'function') {
    currentIndex.value = api.selectedScrollSnap()
  }
}

// Handle API initialization safely
function handleInitApi(api: CarouselApi) {
  if (api) {
    api.on('select', () => onSlideChange(api))
  }
}

// Navigate to a specific slide when dot is clicked
function goToSlide(index: number) {
  if (carouselRef.value?.carouselApi) {
    carouselRef.value.carouselApi.scrollTo(index)
  }
}
const banners = [
  {
    mobile: '/images/hero-banners/banner-mobile-1.webp',
    src: '/images/hero-banners/banner-1.webp',
    alt: 'Banner image',
    width: 1920,
    height: 600, // Adjust to actual dimensions
    mobileWidth: 768,
    mobileHeight: 400, // Adjust to actual dimensions
  },
  // Update remaining banners with proper dimensions
  {
    mobile: '/images/hero-banners/banner-mobile-2.webp',
    src: '/images/hero-banners/banner-2.webp',
    alt: 'Banner image',
    width: 1920,
    height: 600,
    mobileWidth: 768,
    mobileHeight: 400,
  },
  {
    mobile: '/images/hero-banners/banner-mobile-3.webp',
    src: '/images/hero-banners/banner-3.webp',
    alt: 'Banner image',
    width: 1920,
    height: 600,
    mobileWidth: 768,
    mobileHeight: 400,
  },
  {
    mobile: '/images/hero-banners/banner-mobile-4.webp',
    src: '/images/hero-banners/banner-4.webp',
    alt: 'Banner image',
    width: 1920,
    height: 600,
    mobileWidth: 768,
    mobileHeight: 400,
  },
]



// Preload banner images
const { imagesLoaded } = useImagePreloader(() =>
        banners.flatMap(banner => [
          { src: banner.src, width: banner.width, height: banner.height },
          { src: banner.mobile, width: banner.mobileWidth, height: banner.mobileHeight }
        ]),
    { timeout: 3000 }
);
</script>

<template>
  <div class="carousel-container">
    <!-- Skeleton loader while images are loading -->
    <div v-if="homeStore.isLoading || !imagesLoaded" class="skeleton-carousel">
      <Skeleton class="skeleton-slide aspect-[440/825] lg:aspect-[2.2/1] h-full w-full rounded-4xl"></Skeleton>
    </div>

    <template v-else>
      <Carousel
          ref="carouselRef"
          class="relative w-full"
          :opts="{
            align: 'center',
            direction: 'rtl',
            loop: true,
          }"
          :plugins="[autoplayPlugin]"
          @init-api="handleInitApi">

        <CarouselContent class="-mr-4" >
          <CarouselItem v-for="(banner, index) in banners" :key="index" class="pr-4">
            <CardContent class="flex items-center justify-center px-0 rounded-4xl overflow-hidden h-auto lg:aspect-[2.2/1]">
              <img :src="banner.src" :alt="banner.alt"
                   :width="banner.width" :height="banner.height"
                   class="h-full w-full object-cover hidden md:block"/>
              <img :src="banner.mobile" :alt="banner.alt"
                   :width="banner.mobileWidth" :height="banner.mobileHeight"
                   class="h-full w-full object-cover md:hidden"/>
            </CardContent>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <CarouselDots
          class="mt-4"
          :current-index="currentIndex"
          :total-slides="totalSlides"
          @navigate="goToSlide"
      />
    </template>
  </div>
</template>

<style scoped>
/* Skeleton loader styles */
.skeleton-carousel {
  width: 100%;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
}

@media (min-width: 1024px) {
  @supports (not (aspect-ratio: 2.2/1) ) {
    .skeleton-carousel {
      padding-bottom: 45.45%; /* 1 / (2.2/1) * 100% */
    }
}

}

/* Ensure carousel container has fixed dimensions */
.carousel-container {
  width: 100%;
  position: relative;
}
</style>