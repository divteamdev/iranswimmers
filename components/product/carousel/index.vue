<script setup lang="ts">
import {Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from "~/components/ui/carousel";
import {ref, computed} from "vue";
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
  isLoading: {
    type: Boolean,
    default: false,
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
  },
  showEndItem: {
    type: Boolean,
    default: false
  },
  showNavigation: {
    type: Boolean,
    default: false
  },
  navPrevClass: {
    type: String,
    default: "size-8 bg-background text-secondary border-secondary/20 hover:bg-secondary/10 hover:text-secondary"
  },
  navNextClass: {
    type: String,
    default: "size-8 bg-background text-secondary border-secondary/20 hover:bg-secondary/10 hover:text-secondary"
  }
})

// Reference to the underlying carousel with any type to bypass TypeScript errors
const carouselRef = ref<any>(null);

// Expose carousel API to parent components
defineExpose({
  scrollNext() {
    carouselRef.value?.scrollNext?.();
  },
  scrollPrev() {
    carouselRef.value?.scrollPrev?.();
  },
  carouselApi: computed(() => carouselRef.value?.carouselApi)
});
</script>

<template>
  <div class="relative flex">
    <Carousel
        ref="carouselRef"
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

        <CarouselItem 
          v-if="showBannerSlot"
          :class="carouselItemClass + ' w-max'"
        >
          <slot name="banner-placeholder"></slot>
        </CarouselItem>
        <CarouselItem v-if="isLoading" v-for="i in 10" :key="i"
                      :class="carouselItemClass + ' max-w-[300px] min-w-[200px] md:min-w-[220px] w-auto'">
          <ProductCardSkeleton class="h-full"/>
        </CarouselItem>
        <CarouselItem v-else v-for="(product, index) in products"
                      :key="index"
                      :class="carouselItemClass + ' max-w-[300px] min-w-[200px] md:min-w-[220px] w-auto'">
          <ProductCard
              :variant="productCardVariant"
              :product="product" :index="index" class="h-full"/>
        </CarouselItem>
        
        <CarouselItem
          :class="carouselItemClass + ' w-max'"
          v-if="showEndItem">
          <!-- Custom end item slot -->
          <slot name="end-item"></slot>
        </CarouselItem>
      </CarouselContent>
      
      <!-- Navigation buttons -->
      <template v-if="showNavigation">
        <div class="hidden md:block">
          <CarouselPrevious 
            variant="outline"
            size="icon"
            :class="navPrevClass">
            <Icon name="heroicons:arrow-right" class="size-4" />
          </CarouselPrevious>
          <CarouselNext 
            variant="outline"
            size="icon"
            :class="navNextClass">
            <Icon name="heroicons:arrow-left" class="size-4" />
          </CarouselNext>
        </div>
      </template>
    </Carousel>
  
  </div>
</template>

<style scoped>
</style>