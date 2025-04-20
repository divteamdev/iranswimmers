<script setup lang="ts">
import {computed, onMounted, onBeforeUnmount, ref} from 'vue';
import {useHomeStore} from "~/stores/homeStore";

const homeStore = useHomeStore();

const props = defineProps({
  banner: {
    type: String,
    default: '/images/home-banners/banner-5.webp',
  },
  bannerAlt: {
    type: String,
  },

  bannerMobile: {
    type: String,
  },
  bannerMobileAlt: {
    type: String,
  },
  grid: {
    type: Object,
    default: () => ({
      products: [],
      all: '',
    }),
  },
  isLoading: {
    type: Boolean,
  },
  maxProducts2Xl: {
    type: Number,
    default: 10
  },
  maxProductsXl: {
    type: Number,
    default: 10
  },
  maxProductsLg: {
    type: Number,
    default: 8
  },
  maxProductsMd: {
    type: Number,
    default: 6
  },
  maxProductsSm: {
    type: Number,
    default: 4
  },
});

// Track window width
const windowWidth = ref(0);

// Initialize window width on mount
onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', updateWindowWidth);
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateWindowWidth);
  }
});

const updateWindowWidth = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
  }
};

// Computed property to limit the number of products based on screen size
const limitedProducts = computed(() => {
  const products = props.grid?.products || [];
  const width = windowWidth.value;

  if (width >= 1536) { // 2xl breakpoint
    return products.slice(0, props.maxProducts2Xl);
  } else if (width >= 1280) { // xl breakpoint
    return products.slice(0, props.maxProductsXl);
  } else if (width >= 1024) { // lg breakpoint
    return products.slice(0, props.maxProductsLg);
  } else if (width >= 768) { // md breakpoint
    return products.slice(0, props.maxProductsMd);
  } else if (width >= 640) { // sm breakpoint
    return products.slice(0, props.maxProductsSm);
  } else { // xs breakpoint
    return products.slice(0, 4);
  }
});

const limitedProductsCount = computed(() => {
  const products = props.grid?.products || [];
  const width = windowWidth.value;

  if (width >= 1536) { // 2xl breakpoint
    return props.maxProducts2Xl;
  } else if (width >= 1280) { // xl breakpoint
    return props.maxProductsXl;
  } else if (width >= 1024) { // lg breakpoint
    return props.maxProductsLg;
  } else if (width >= 768) { // md breakpoint
    return props.maxProductsMd;
  } else if (width >= 640) { // sm breakpoint
    return props.maxProductsSm;
  } else { // xs breakpoint
    return 4;
  }
});
</script>

<template>
  <section class="irsm-container mb-24" dir="rtl">
    <HomeSectionHeader :title="grid.title" :showMoreLink="grid.all" title-class="heading-5" title-badge="تا 30% تخفیف"/>
    <div class="flex gap-4 md:min-h-[738px] relative">
      <!-- Banner Image -->
      <Banner class="hidden md:block"
              container-class="relative ml-4 bg-primary rounded-3xl overflow-visible sm:basis-[40%] md:basis-[35%] lg:basis-[25%] xl:basis-[20%] 2xl:basis-[21%]"
              image-class="w-full h-full max-h-[90%] absolute bottom-0 right-0 object-cover rounded-3xl -ml-4 scale-105 origin-bottom-right z-0 pointer-events-none"
              :src="banner" :alt="bannerAlt" variant="custom">
        <div class="absolute top-0 left-0 w-full px-4 py-10 z-10 flex flex-col">
          <h5 class="heading-4 font-bold text-background font-fa-num mb-2 -tracking-[1px] text-nowrap">
            تا 30% تخفیف
          </h5>
          <span class="text-background font-fa-num body-3 mb-4">
            {{ grid.title }}
          </span>
          <Button variant="default" class="bg-background text-primary hover:bg-background/95 w-fit" size="sm"
                  :to="grid.all">
            <span class="hidden md:block">مشاهده همه محصولات</span>
            <span class="block md:hidden">مشاهده همه</span>
          </Button>
        </div>

        <div
            class="absolute -left-[25px] top-1/2 -translate-y-1/2 -z-10 flex items-center justify-center py-4">
          <svg width="31" height="133" viewBox="0 0 31 133" fill="none" xmlns="http://www.w3.org/2000/svg"
               class="fill-primary">
            <path
                d="M30.5 0.318359C30.5 0.318359 0.0878906 51.8181 0.0878906 66.409C0.0878906 81 30.5 132.5 30.5 132.5V0.318359Z"/>
            <path d="M20.1429 49L18.718 51.1392C12.9292 59.8301 13.4243 71.2666 19.9425 79.4248L22 82" stroke="white"
                  stroke-width="3" stroke-linecap="round"/>
          </svg>

        </div>
      </Banner>


      <div class="products-grid w-full hidden md:grid">
        <template v-if="isLoading" v-for="i in limitedProductsCount">
          <ProductCardSkeleton class="h-auto"/>
        </template>
        <ProductCard v-else v-for="product in limitedProducts" :key="product.id" variant="accent" :product="product"
                     class="h-auto"/>
      </div>

      <ProductCarousel :products="grid.products" class="h-auto w-full md:hidden"
                       :isLoading="isLoading"
                       product-card-variant="accent"
                       carousel-item-class="basis-auto md:basis-[26.5%] lg:basis-[24.5%] xl:basis-auto"
                       :show-banner-slot="bannerMobile ? true : false"
                       :loop="false">
        <template v-if="bannerMobile" #banner-placeholder>
          <Banner container-class="w-full h-full" image-class="object-cover" :src="bannerMobile" :alt="bannerMobileAlt"
                  variant="primary"/>
        </template>
      </ProductCarousel>

    </div>
  </section>
</template>

<style scoped>
.products-grid {
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
}

@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(20vw, 1fr));
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(16vw, 1fr));
  }
}

@media (min-width: 1280px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(12.5vw, 1fr));
  }
}

@media (min-width: 1536px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}
</style>