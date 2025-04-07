<script setup>
import { useProductStore } from '~/stores/productStore';
import {convertImageUrl} from "~/helpers/imageUtils.js";
import {formatPrice} from "../../helpers/priceUtils.js";

const productStore = useProductStore();

// Fetch products when the component mounts
onMounted(async () => {
  await productStore.fetchProducts();
});
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6">Shop Products</h1>

    <!-- Loading state -->
    <div v-if="productStore.isLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="productStore.error" class="bg-red-50 p-4 rounded-md">
      <p class="text-red-600">Error loading products: {{ productStore.error.message }}</p>
    </div>

    <!-- Products grid -->
    <div v-else-if="productStore.products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in productStore.products" :key="product.id" class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <NuxtLink :to="`/shop/${product.slug}`">
          <ProductCardThumbnail :primaryImage="product.thumbnail" :secondaryImage="product.thumbnail_alt" />
          <div class="p-4">
            <h2 class="font-semibold text-lg mb-2 line-clamp-1">{{ product.name }}</h2>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
            <div class="flex justify-between items-center">
              <span class="font-bold text-primary">{{ formatPrice(product.price) }}</span>
              <button class="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded text-sm">
                View Details
              </button>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-12">
      <p class="text-gray-500">No products found</p>
    </div>
  </div>
</template>