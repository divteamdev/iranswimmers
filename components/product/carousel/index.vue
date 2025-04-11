<script setup lang="ts">
import {Carousel} from "~/components/ui/carousel";
import {ref} from "vue";
import Autoplay from "embla-carousel-autoplay";

const autoplayPlugin = ref(Autoplay({delay: 5000}))

const props = defineProps({
  products: {
    type: Object,
    required: true
  },
  productCardVariant: {
    type: String,
    default: 'default'
  },
  carouselItemClass: {
    type: String,
    default: 'pl-4 md:basis-1/2 lg:basis-1/5 xl:basis-1/6 min-h-[400px]'
  },
  loop: {
    type: Boolean,
    default: true
  },
  showBannerSlot: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <div class="relative flex">
    <Carousel
        class="h-full w-full"
        :opts="{
          align: 'start',
          loop: loop,
          direction: 'rtl',
          dragFree: true,
        }"
        :plugins="[autoplayPlugin]"
    >
      <CarouselContent class="-ml-4 h-full">

        <slot name="banner-placeholder"></slot>

        <CarouselItem v-for="(product, index) in products"
                      :key="index"
                      :class="carouselItemClass + ' max-w-[300px] min-w-[200px] md:min-w-[220px] w-auto'">
          <ProductCard
              :variant="productCardVariant"
              :product="product" :index="index" class="h-full"/>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  
  </div>
</template>

<style scoped>
</style>