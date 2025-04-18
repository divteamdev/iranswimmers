<script setup lang="ts">
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import {watchOnce} from '@vueuse/core'
import {ref} from 'vue'
import {convertImageUrl} from "~/helpers/imageUtils";

const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)

interface ProductImage {
  variation_id?: number;
  src: string;
  alt: string;
}

defineProps({
  images: {
    type: Array as PropType<ProductImage[]>,
    required: true,
    default: () => []
  }
})

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value)
    return
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value)
    return
  emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi)
    return

  onSelect()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('reInit', onSelect)
})
</script>

<template>
  <div class="w-full h-fit md:max-w-xs lg:max-w-sm">
    <Carousel
        class="relative w-auto mb-4"
        :opts="{
          loop: false,
          align: 'start',
          direction: 'rtl'
        }"
        @init-api="(val) => emblaMainApi = val"
    >
      <CarouselContent>
        <CarouselItem v-for="(image, index) in images" :key="index">
          <div class="p-1 flex aspect-square items-center justify-center border border-border rounded-xl relative overflow-hidden">
            <img :src="convertImageUrl(image.src)" :alt="image.alt" class="max-h-min absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"/>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>

    <Carousel
        class="relative w-auto"
        :opts="{
          loop: false,
          align: 'start',
          direction: 'rtl'
        }"
        @init-api="(val) => emblaThumbnailApi = val"
    >
      <CarouselContent class="flex gap-4 ml-0 pl-2">
        <CarouselItem v-for="(image, index) in images" :key="index" class="pl-0 basis-[31.2%] cursor-pointer rounded-xl border border-border"
                      @click="onThumbClick(index)">
          <div class="aspect-square p-2" :class="index === selectedIndex ? '' : 'opacity-50'">
              <img :src="convertImageUrl(image.src)" :alt="image.alt"
                   class="rounded-xl aspect-square object-cover"/>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>