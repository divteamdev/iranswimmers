<script setup>
import {useProductStore} from '~/stores/productStore';
import { ref } from 'vue';

const productStore = useProductStore();
const initialLoading = ref(true); // Track initial loading state

// Fetch products when the component mounts
onMounted(async () => {
  try {
    await productStore.fetchProducts();
  } finally {
    initialLoading.value = false;
  }
});
</script>

<template>
  <div class="py-8">
    <!-- Loading state - show during initial load or subsequent loads -->
    <div v-if="productStore.isLoading || initialLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="productStore.error" class="bg-red-50 p-4 rounded-md">
      <p class="text-destructive">Error loading products: {{ productStore.error.message }}</p>
    </div>

    <!-- Empty state - only show when we're sure products were loaded and none were found -->
    <div v-else-if="productStore.products?.length === 0" class="text-center py-12">
      <p class="text-muted-foreground">
        محصولی برای نمایش وجود ندارد
      </p>
    </div>

    <!-- Products grid -->
    <div v-else class="products-grid">
      <template v-for="product in productStore.products" :key="product.id">
        <ProductCard :product="product"/>
      </template>
    </div>
  </div>
</template>
