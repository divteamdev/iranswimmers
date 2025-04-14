<script setup lang="ts">
import { computed, ref } from "vue";

interface Carousel {
  title: string;
  products: any[];
  all?: string;
}

const props = defineProps<{
  carousel: Carousel;
  sideBannerSrc?: string;
  sideBannerAlt?: string;
  bottomBannerSrc?: string;
  bottomBannerAlt?: string;
}>();

// Set default values for optional props
const sideBannerSrc = computed(() => props.sideBannerSrc || '/images/home-banners/banner-on-sale.webp');
const sideBannerAlt = computed(() => props.sideBannerAlt || 'On sale banner');
const bottomBannerSrc = computed(() => props.bottomBannerSrc || '/images/home-banners/banner-1.webp');
const bottomBannerAlt = computed(() => props.bottomBannerAlt || 'Secondary banner');

const { isMobile } = useDeviceDetection();

// Reference to the carousel for navigation control
const carouselRef = ref<any>(null);

// Navigation methods that safely call the carousel methods
const scrollNext = () => {
  carouselRef.value?.scrollNext();
};

const scrollPrev = () => {
  carouselRef.value?.scrollPrev();
};
</script>

<template>
  <section v-if="carousel.products?.length" class="irsm-container mb-28" dir="rtl">
    <HomeSectionHeader title-class="heading-3 text-destructive" class="md:flex hidden" :title="carousel.title">
      <template #right-content>
        <!-- Carousel Navigation Buttons -->
        <div class="hidden md:flex gap-2 z-10">
          <Button variant="ghost" size="icon"
            class="text-secondary bg-secondary/10 hover:bg-secondary/20 cursor-pointer"
            @click="scrollPrev">
            <Icon name="heroicons:arrow-right" class="text-lg" />
            <span class="sr-only">Previous slide</span>
          </Button>
          <Button variant="ghost" size="icon"
            class="text-secondary bg-secondary/10 hover:bg-secondary/20 cursor-pointer"
            @click="scrollNext">
            <Icon name="heroicons:arrow-left" class="text-lg" />
            <span class="sr-only">Next slide</span>
          </Button>
        </div>
      </template>
    </HomeSectionHeader>

    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Side Banner -->
      <div class="lg:block hidden">
        <Banner :src="sideBannerSrc" :alt="sideBannerAlt" variant="secondary" container-class="h-full w-full"
          image-class="w-full h-full object-cover" />
      </div>

      <!-- Main content column -->
      <div class="flex flex-col w-full lg:w-[73%] gap-4">
        <!-- Carousel section -->
        <div class="flex-grow flex md:flex-col min-h-[340px] bg-secondary md:bg-transparent py-6 pr-4 md:p-0 
          -mx-4 sm:-mx-6 md:mx-0 relative">
          <!-- Mobile title -->
          <div class="flex flex-col gap-4 items-start md:hidden min-w-[160px] justify-center">
            <p class="text-background heading-3">تخفیفات<br>شـگفت انگیز</p>
          </div>

          <!-- Product carousel -->
          <ProductCarousel ref="carouselRef" :products="carousel.products"
            :product-card-variant="isMobile ? 'default' : 'secondary'" dir="rtl" :loop="false"
            :show-banner-slot="isMobile" class="h-full w-full -mr-[160px] md:mr-0"
            carousel-item-class="basis-auto" :show-end-item="true">
            <template #banner-placeholder>
              <div class="min-w-[140px] h-full pointer-events-none md:hidden"></div>
            </template>
            <template #end-item>
              <Card :to="carousel.all"
                class="h-full flex items-center justify-center bg-secondary/10 hover:bg-secondary/15 transition-colors duration-300">
                <span class="body-2 flex items-center gap-2 text-background md:text-secondary">
                  مشاهده همه
                  <Icon name="heroicons:arrow-left" class="text-background md:text-secondary text-lg" />
                </span>
              </Card>
            </template>
          </ProductCarousel>
        </div>

        <!-- Bottom Banner -->
        <Banner :src="bottomBannerSrc" :alt="bottomBannerAlt" variant="full-width" container-class="h-full"
          image-class="w-full h-full object-contain" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>