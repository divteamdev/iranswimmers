<!-- pages/shop/index.vue -->
<script setup lang="ts">
import {useProductsStore} from '~/stores/productsStore';
import {ref, onMounted, computed} from 'vue';
import {useCategoriesStore} from "~/stores/shop/categoriesStore";
import {useDeviceDetection} from "~/composables/useDeviceDetection";

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const {isMobile} = useDeviceDetection();
const isLoading = ref(true);
const parentCategoryId = 43;

// Fetch products when component mounts
onMounted(async () => {
  try {
    isLoading.value = true;

    await productsStore.fetchProducts(1);
  } finally {
    isLoading.value = false;
  }
});

// Get products from store
const products = computed(() => productsStore.products || []);

// Access pagination info
const hasMore = computed(() => {
  return productsStore.pagination?.currentPage < productsStore.pagination?.lastPage;
});

const handleFilter = () => {
  console.log('Filter button clicked');
};

const loadMoreProducts = async () => {
  if (productsStore.isLoading || !hasMore.value) return;
  const nextPage = productsStore.pagination?.currentPage + 1;
  if (nextPage) {
    await productsStore.fetchProducts(nextPage);
  }
};
</script>

<template>
  <ShopLayout
      :banner="{
      desktop: '/images/shop-banners/banner-1.webp',
      mobile: '/images/shop-banners/banner-1-mobile.webp'
    }"
      bannerAlt="محصولات جدید"
      parent-category-slug="ورزش-های-آبی"
      :products="products"
      :isLoading="productsStore.isLoading || isLoading"
      :error="productsStore.error"
      :hasMore="hasMore"
      @filter="handleFilter"
      @load-more="loadMoreProducts"
  />
</template>