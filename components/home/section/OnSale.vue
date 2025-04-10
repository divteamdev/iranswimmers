<script setup lang="ts">
import {computed} from "vue";

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
</script>

<template>
  <section v-if="carousel.products?.length" class="irsm-container mb-28 " dir="rtl">
    <HomeSectionHeader :title="carousel.title" :show-more-link="carousel.all"/>

    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Side Banner - with responsive height control -->
      <div class="w-max lg:h-auto">
        <Banner
            :src="sideBannerSrc"
            :alt="sideBannerAlt"
            variant="secondary"
            container-class="h-full w-full"
            image-class="w-full h-full object-cover"
        />
      </div>

      <!-- Right column with flexible distribution -->
      <div class="flex flex-col w-full lg:w-[70%] gap-4">
        <!-- Carousel takes available height with min-height to ensure proper size -->
        <div class="flex-grow min-h-[320px]">
          <ProductCarousel
              :products="carousel.products"
              product-card-variant="secondary"
              dir="rtl"
              class="h-full"
              carousel-item-class="basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-[23.80%]"
          />
        </div>

        <!-- Bottom Banner with responsive height -->
        <div class="h-[120px] lg:h-min">
          <Banner
              :src="bottomBannerSrc"
              :alt="bottomBannerAlt"
              variant="full-width"
              container-class="h-full"
              image-class="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>