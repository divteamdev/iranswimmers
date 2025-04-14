<script setup lang="ts">
import { ref, computed } from 'vue';

// Product interface based on ProductCard usage
interface Product {
  id: string | number;
  name: string;
  slug: string;
  price: string;
  thumbnail?: string | null;
  thumbnail_alt?: string | null;
  [key: string]: any;
}

const props = defineProps({
  // Products array to display
  products: {
    type: Array as () => Product[],
    default: () => [],
  },
  // Loading state
  isLoading: {
    type: Boolean,
    default: false,
  },
  // Error state - allow null
  error: {
    type: [Object, null],
    default: null,
  },
  // Custom grid class for different layouts
  gridClass: {
    type: String,
    default: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  },
  // Gap between grid items
  gap: {
    type: String,
    default: 'gap-4',
  },
  // Empty state message
  emptyMessage: {
    type: String,
    default: 'محصولی برای نمایش وجود ندارد',
  }
});

// Get products directly from props
const displayProducts = computed<Product[]>(() => props.products || []);

// Helper to check if error is valid
const hasError = computed(() => props.error && typeof props.error === 'object');

// Get error message safely
const errorMessage = computed(() => props.error?.message || 'Unknown error');
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="hasError" class="bg-red-50 p-4 rounded-md">
      <p class="text-destructive">Error loading products: {{ errorMessage }}</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="displayProducts?.length === 0" class="text-center py-12">
      <p class="text-muted-foreground">
        {{ emptyMessage }}
      </p>
    </div>

    <!-- Products grid -->
    <div 
      v-else 
      class="grid"
      :class="[gridClass, gap]"
    >
      <template v-for="product in displayProducts" :key="product.id">
        <ProductCard :product="product" />
      </template>
    </div>
  </div>
</template> 