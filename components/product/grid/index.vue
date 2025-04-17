<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch} from 'vue';
import {useIntersectionObserver} from '@vueuse/core';

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
  },
  // View mode - grid or list
  viewMode: {
    type: String,
    default: 'grid',
    validator: (value: string) => ['grid', 'list'].includes(value)
  },
  // Auto loading when scrolled to bottom
  autoLoad: {
    type: Boolean,
    default: true
  },
  // Has more products to load
  hasMore: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['load-more']);

// Get products directly from props
const displayProducts = computed<Product[]>(() => props.products || []);

// Helper to check if error is valid
const hasError = computed(() => props.error && typeof props.error === 'object');

// Get error message safely
const errorMessage = computed(() => props.error?.message || 'Unknown error');

// Determine if list view is active
const isListView = computed(() => props.viewMode === 'list');

// Intersection observer for infinite loading
const loadTrigger = ref(null);
const loadingMore = ref(false);

const {stop} = useIntersectionObserver(
    loadTrigger,
    ([{isIntersecting}]) => {
      if (isIntersecting && props.autoLoad && props.hasMore && !props.isLoading && !loadingMore.value) {
        loadMore();
      }
    },
    {threshold: 0.8}
);

function loadMore() {
  if (loadingMore.value || props.isLoading || !props.hasMore) return;

  console.log("Load more called - hasMore:", props.hasMore, "isLoading:", props.isLoading);
  loadingMore.value = true;
  emit('load-more');
  setTimeout(() => {
    loadingMore.value = false;
  }, 1000);
}

// Set up intersection observer
onMounted(() => {
  const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && props.hasMore && !props.isLoading && !loadingMore.value) {
          loadMore();
        }
      },
      {
        rootMargin: '300px', // Load earlier before reaching the bottom
        threshold: 0.1 // Trigger when just 10% of the element is visible
      }
  );

  if (loadTrigger.value) {
    observer.observe(loadTrigger.value);
  }

  // Clean up
  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });
});


watch(() => props.hasMore, (newValue) => {
  if (!newValue) {
    loadingMore.value = false;
  }
});
</script>

<template>
  <div dir="rtl">
    <!-- Loading state (initial load) -->
    <div v-if="isLoading && !displayProducts.length" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="hasError" class="bg-red-50 p-4 rounded-md">
      <p class="text-destructive">Error loading products: {{ errorMessage }}</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="!isLoading && displayProducts?.length === 0" class="text-center py-12">
      <p class="text-muted-foreground">
        {{ emptyMessage }}
      </p>
    </div>

    <template v-else>
      <!-- Products grid -->
      <div class="grid" :class="[gridClass, gap]">
        <template v-for="product in displayProducts" :key="product.id">
          <ProductCard v-if="!isListView" :product="product"/>
          <ProductCardList v-else :product="product"/>
        </template>
      </div>

      <!-- Loading indicator (subsequent loads) -->
      <div v-if="isLoading && displayProducts.length" class="flex justify-center mt-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>

      <!-- Make the trigger element more visible for debugging -->
      <div v-if="hasMore" ref="loadTrigger" class="h-8 w-full" data-testid="load-trigger"></div>

      <!-- Show a message when there are no more items -->
      <div v-else-if="displayProducts.length > 0" class="text-center mt-8 text-muted-foreground body-4">
        پایان محصولات
      </div>
    </template>
  </div>
</template>