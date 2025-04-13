<script setup lang="ts">
import { useHomeStore } from "~/stores/homeStore";
import { useDeviceDetection } from "~/composables/useDeviceDetection";
import { computed } from 'vue';

const homeStore = useHomeStore();

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // 'primary' for top banner, 'secondary' for right banner
    validator: (value: string) => ['primary', 'secondary'].includes(value)
  },
  banner: {
    type: String,
    default: '/images/home-banners/banner-5.webp',
  },
  bannerAlt: {
    type: String,
    default: 'Banner image',
  },
  bannerMobile: {
    type: String,
    default: '/images/home-banners/banner-5-mobile.webp',
  },
  bannerMobileAlt: {
    type: String,
    default: 'Banner image',
  },
  carousel: {
    type: Object,
    default: () => ({
      title: '',
      products: [],
      all: '',
    }),
  }
});

const { isMobile } = useDeviceDetection();

// Computed values for responsive classes
const isPrimary = computed(() => props.variant === 'primary');
</script>

<template>
  <section 
    class="irsm-container mb-24 relative md:bg-transparent" 
    :class="isPrimary ? 'bg-primary' : 'bg-secondary'" 
    dir="rtl"
  >
    <!-- Secondary variant (ImageOnRight) layout -->
    <template v-if="!isPrimary">
      <div class="md:flex md:gap-4">
        <div class="hidden md:block rounded-4xl" :class="{ 'bg-secondary': !isPrimary }">
          <!-- Banner Image -->
          <Banner
              container-class="scale-140 flex h-full justify-center"
              image-class="w-full h-full object-contain"
              :src="banner"
              :alt="bannerAlt"
              variant="custom"
          />
        </div>

        <div class="flex flex-col h-auto w-full md:w-[84%] lg:w-[87%] xl:w-[90%] py-10 px-0 md:px-10 rounded-4xl" 
             :class="{ 'md:bg-secondary': !isPrimary }">
          <div class="flex sm:flex-row w-full justify-between items-center gap-6 mb-10 px-0" dir="rtl">
            <h2 class="heading-3 text-background font-fa-num">{{ carousel.title }}</h2>
            <Button v-if="carousel.all" variant="default" 
                   :size="isMobile ? 'sm' : 'lg'"
                   :to="carousel.all"
                   class="bg-background hover:bg-background/95 w-fit text-secondary">
              <span class="hidden md:block">مشاهده همه محصولات</span>
              <span class="block md:hidden">مشاهده همه</span>
            </Button>
          </div>

          <ProductCarousel
              :products="carousel.products"
              class="flex gap-4 md:gap-0 md:flex-col -ml-4 -mr-4 sm:-ml-6 sm:-mr-6 md:-ml-10 md:-mr-0"
              carousel-item-class="basis-auto">
          </ProductCarousel>
        </div>
      </div>
    </template>

    <!-- Primary variant (ImageOnTop) layout -->
    <template v-else>
      <div class="w-full py-10 rounded-4xl" :class="{ 'md:bg-primary': isPrimary }">
        <div class="flex sm:flex-row md:flex-col w-full justify-between items-center md:items-start md:w-max gap-6 mb-10 px-0 md:pr-10" dir="rtl">
          <h2 class="heading-3 text-background font-fa-num">{{ carousel.title }}</h2>
          <Button v-if="carousel.all" variant="default" 
                 :size="isMobile ? 'sm' : 'lg'"
                 :to="carousel.all"
                 class="bg-background hover:bg-background/95 w-fit text-primary">
            <span class="hidden md:block">مشاهده همه محصولات</span>
            <span class="block md:hidden">مشاهده همه</span>
          </Button>
        </div>

        <!-- Banner Image -->
        <Banner
            container-class="absolute -top-4 lg:-top-12 left-8 lg:left-20 h-30 lg:h-44 xl:h-52 w-auto hidden md:block"
            image-class="w-full h-full"
            :src="banner"
            :alt="bannerAlt"
            variant="custom"
        />
            
        <div class="flex gap-4 md:gap-0 md:flex-col md:pr-10 -ml-4 -mr-4 sm:-ml-6 sm:-mr-6 md:-ml-0 md:-mr-0">
          <ProductCarousel
              :products="carousel.products"
              class="h-auto w-full"
              carousel-item-class="basis-auto">
          </ProductCarousel>
        </div>
      </div>
    </template>
  </section>
</template> 