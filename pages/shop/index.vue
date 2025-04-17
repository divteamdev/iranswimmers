<script setup>
import { useProductStore } from '~/stores/productStore';
import { ref, onMounted, computed } from 'vue';
import { ProductGrid } from '#components';

const productStore = useProductStore();
const isLoading = ref(true);

// Fetch products when the component mounts
onMounted(async () => {
  try {
    await productStore.fetchProducts();
  } finally {
    isLoading.value = false;
  }
});

// Get products from store
const products = computed(() => productStore.products || []);
</script>

<template>
  <div class="irsm-container">
    <ProductGrid 
      :products="products"
      :isLoading="isLoading || productStore.isLoading"
      :error="productStore.error"
      gridClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
      gap="gap-6"
    />
  </div>
</template>
