<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel'

import CarouselDots from "~/components/ui/carousel/CarouselDots.vue";

const trust = [
  {
    id: 1,
    image: '/images/trust/zarin.png',
    alt: 'zarinpal',
    link: 'https://www.zarinpal.com/trustPage/iranswimmers.com'
  },
  {
    id: 2,
    image: '/images/trust/mojavez.png',
    alt: 'mojavez',
    link: 'https://qr.mojavez.ir/track/15282729'
  },
  {
    id: 3,
    image: '/images/trust/samandehi.png',
    alt: 'samandehi',
    link: 'https://logo.samandehi.ir/Verify.aspx?id=362316&p=xlaogvkauiwkxlaorfthgvka'
  }
]

// Define the proper type for your carousel ref
interface CarouselRef {
  carouselApi?: CarouselApi
}

const carouselRef = ref<CarouselRef | null>(null)
const currentIndex = ref(0)
const totalSlides = 3

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
</script>

<template>
  <div>
    <Carousel
        ref="carouselRef"
        class="relative w-full flex items-center bg-background rounded-xl"
        :opts="{
        align: 'start',
        direction: 'rtl',
        loop: true,
      }"
        @init-api="handleInitApi"
    >
      <CarouselContent>
        <CarouselItem v-for="(item, index) in trust" :key="index">
          <a :href="item?.link" target="_blank" rel="noopener noreferrer">
            <img
                :src="item?.image"
                :alt="item.alt"
                class="w-full h-full object-contain p-4 "
            />
          </a>

        </CarouselItem>
      </CarouselContent>
    </Carousel>

    <CarouselDots
        class="mt-4"
        variant="secondary"
        :current-index="currentIndex"
        :total-slides="totalSlides"
        @navigate="goToSlide"
    />
  </div>


</template>