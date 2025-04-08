<script setup lang="ts">
import {Card, CardContent} from '@/components/ui/card'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { ref, onMounted } from 'vue'
import CarouselDots from '@/components/ui/carousel/CarouselDots.vue'

const carouselRef = ref(null)
const currentIndex = ref(0)
const autoplayPlugin = ref(Autoplay({ delay: 5000 }))
const totalSlides = 4

// Track the current slide index
function onSlideChange(api) {
  if (api) {
    currentIndex.value = api.selectedScrollSnap()
  }
}

// Navigate to a specific slide when dot is clicked
function goToSlide(index) {
  if (carouselRef.value?.carouselApi) {
    carouselRef.value.carouselApi.scrollTo(index)
  }
}
</script>

<template>
  <div class="carousel-container">
    <Carousel
        ref="carouselRef"
        class="relative w-full"
        :opts="{
        align: 'center',
        loop: true,
      }"
        :plugins="[autoplayPlugin]"
        @init-api="(api) => { api.on('select', () => onSlideChange(api)) }">

      <CarouselContent class="-ml-4">
        <CarouselItem v-for="(_, index) in totalSlides" :key="index" class="pl-4">
          <CardContent class="flex items-center justify-center px-0 rounded-4xl overflow-hidden">
            <img :src="`/images/hero-banners/banner-${index + 1}.webp`" alt="Banner image" class="h-full w-full object-cover"/>
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