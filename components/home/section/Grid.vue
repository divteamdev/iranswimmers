<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { useHomeStore } from "~/stores/homeStore";

const homeStore = useHomeStore();

const props = defineProps({
  banner:{
    type: String,
    default: '/images/home-banners/banner-5.webp',
  },
  bannerAlt:{
    type: String,
  },
  grid: {
    type: Object,
    default: () => ({
      products: [],
      all: '',
    }),
  },
  maxProducts2Xl: {
    type: Number,
    default: 12
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
  // Safely handle undefined or null products
  const products = props.grid?.products || [];

  if (typeof window !== 'undefined') {
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
      return products.slice(0, 4); // Default to 4 products for extra small screens
    }
  }

  return products;
});
</script>

<template>
  <section class="irsm-container mb-24" dir="rtl">
    <div class="flex gap-4">
      <!-- Banner Image -->
      <Banner
          container-class="sm:basis-[48%] md:basis-[43%] lg:basis-[31%] xl:basis-[22%] 2xl:basis-[21%] rounded-3xl overflow-hidden"
          :src="banner"
          :alt="bannerAlt"
          variant="custom"
      />
      <div class="products-grid w-full">
        <ProductCard
            v-for="product in limitedProducts"
            :key="product.id"
            variant="accent"
            :product="product"
            class="h-auto"/>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
}

@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(153px, 1fr));
  }

  @media (min-width: 1024px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
    }
  }

  @media (min-width: 1280px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
  }
  @media (min-width: 1536px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
  }
}
</style>