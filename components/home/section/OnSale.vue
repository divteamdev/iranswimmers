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

const { isMobile } = useDeviceDetection();
</script>

<template>
  <section v-if="carousel.products?.length" class="irsm-container mb-28 " dir="rtl">
    <HomeSectionHeader class="md:flex hidden" :title="carousel.title" :show-more-link="carousel.all"/>

    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Side Banner - with responsive height control -->
      <div class="w-max lg:h-auto md:block hidden">
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
        <div class="flex-grow flex md:flex-col min-h-[320px] bg-secondary md:bg-transparent py-6 pr-4 md:pr-0 md:py-0 -ml-4 sm:-ml-6 sm:-mr-6 -mr-4 md:ml-0 md:mr-0">

          <div class="flex flex-col gap-4 items-start md:hidden min-w-[150px] h-auto justify-center">
            <p class="text-background heading-3">تخفیفات 
            </br>
              شـگفت انگیز</p>
            <Button variant="link" class="text-background px-0"
            :to="carousel.all"
            >مشاهده همه</Button>
          </div>

          <ProductCarousel
              :products="carousel.products"
              :product-card-variant="isMobile ? 'default' : 'secondary'"
              dir="rtl"
              :loop="false"
              class="h-full w-full -mr-[150px] md:mr-0"
              carousel-item-class="basis-auto"
          >
          <template #banner-placeholder>
            <div v-if="isMobile" class="min-w-[150px]  h-full pointer-events-none ml-4 "></div>
          </template>
        </ProductCarousel>
        </div>

        <!-- Bottom Banner with responsive height -->
        <div class="h-auto w-full lg:h-min">
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