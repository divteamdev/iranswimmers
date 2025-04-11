<script setup lang="ts">
import {Card, CardContent} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import {ref, onMounted} from 'vue'
import CarouselDots from '@/components/ui/carousel/CarouselDots.vue'

// Define the proper type for your carousel ref
interface CarouselRef {
  carouselApi?: CarouselApi
}

const carouselRef = ref<CarouselRef | null>(null)
const currentIndex = ref(0)
const autoplayPlugin = ref(Autoplay({delay: 5000}))
const totalSlides = 4

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

const {isMobile, isXs} = useDeviceDetection()

const banners = [
  {
    mobile: '/images/hero-banners/banner-mobile-1.webp',
    src: '/images/hero-banners/banner-1.webp',
    alt: 'Banner image',
  },
  {
    mobile: '/images/hero-banners/banner-mobile-2.webp',
    src: '/images/hero-banners/banner-2.webp',
    alt: 'Banner image',
  },
  {
    mobile: '/images/hero-banners/banner-mobile-3.webp',
    src: '/images/hero-banners/banner-3.webp',
    alt: 'Banner image',
  },
  {
    mobile: '/images/hero-banners/banner-mobile-4.webp',
    src: '/images/hero-banners/banner-4.webp',
    alt: 'Banner image',
  },
]
</script>

<template>
  <div class="carousel-container">
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
          <CardContent class="flex items-center justify-center px-0 rounded-4xl overflow-hidden max-h-[800px]">
            <img :src="isXs ? banner.mobile : banner.src" :alt="banner.alt"
                 class="h-full w-full object-cover"/>
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

  </div>
</template>