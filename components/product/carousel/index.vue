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
  }
})
</script>

<template>
  <Carousel
      class="h-full"
      :opts="{
        align: 'start',
        loop: true,
        direction: 'rtl',
        dragFree: true,
      }"
      :plugins="[autoplayPlugin]"
  >
    <CarouselContent class="-ml-4 h-full">
      <CarouselItem v-for="(product, index) in products"
                    :key="index"
                    :class="carouselItemClass">
        <ProductCard
            :variant="productCardVariant"
            :product="product" :index="index" class="h-full"/>
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>

<style scoped>

</style>