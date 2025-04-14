<script lang="ts" setup>
import { useSearchStore } from '~/stores/searchStore';
import { computed, watch, onMounted } from 'vue';
import ProductMiniCard from '~/components/product/card/mini.vue';
import { useSearch } from '~/composables/useSearch';
import { useRouter } from 'vue-router';

interface SearchProduct {
  name: string;
  slug: string;
  price: string;
  sale_price: string | null;
  thumbnail: string | null;
  [key: string]: any;
}

// Props are optional since we can use the global search state
const props = defineProps({
  query: {
    type: String,
    default: ''
  }
});

const router = useRouter();
const searchStore = useSearchStore();
// Get the shared search query for consistency
const { searchQuery: globalSearchQuery, closeSearch } = useSearch();

// Reactive states
const isLoading = computed(() => searchStore.isSearching);
const hasResults = computed(() => searchStore.hasResults);
const searchResults = computed(() => searchStore.searchResults as SearchProduct[]);
const hasSearched = computed(() => searchStore.hasSearched);
const error = computed(() => searchStore.searchError);
// Use global search query if available, otherwise fallback to prop
const displayQuery = computed(() => globalSearchQuery.value || props.query);

// Initialize search if query is provided via props
onMounted(() => {
  if (props.query && props.query !== globalSearchQuery.value) {
    searchStore.setSearchQuery(props.query);
  }
});

// Watch for query changes from parent component
watch(() => props.query, (newQuery) => {
  if (newQuery && newQuery !== globalSearchQuery.value) {
    searchStore.setSearchQuery(newQuery);
  } else if (!newQuery && globalSearchQuery.value && !props.query) {
    searchStore.clearSearch();
  }
});

// Handle product click - navigate to product page
const handleProductClick = (product: SearchProduct): void => {
  navigateTo(`/product/${product.slug}`);
};

// Navigate to full search page with current query
const navigateToFullSearch = () => {
  // Navigate to search page with query and trailing slash
  router.push({
    path: '/search/',
    query: { q: displayQuery.value }
  });
  
  // Close the search component after 200ms delay (only on search page)
  setTimeout(() => {
    closeSearch(); // Close the search dropdown
  }, 200);
};
</script>

<template>
  <div class="w-full" dir="rtl">
    <!-- Query info when has results -->
    <div v-if="hasSearched && hasResults" class="mb-3 flex justify-between items-center">
      <p class="text-sm text-muted-foreground">جستجو برای: "{{ displayQuery }}"</p>
      <Button 
        variant="link"
        @click="navigateToFullSearch"
        class="text-sm text-primary hover:underline transition-all"
      >
        مشاهده همه نتایج
      </Button>
    </div>
    
    <!-- Loading state -->
    <div v-if="isLoading" class="py-4">
      <p class="text-center text-muted-foreground body-3">در حال جستجو...</p>
      <!-- Optional: Add a spinner here -->
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="py-4">
      <p class="text-center text-destructive body-3">مشکلی در جستجو پیش آمد. لطفاً دوباره امتحان کنید.</p>
    </div>

    <!-- Empty results -->
    <div v-else-if="hasSearched && !hasResults" class="py-4">
      <p class="text-center text-muted-foreground body-3">نتیجه‌ای برای جستجوی شما یافت نشد.</p>
    </div>

    <!-- Results -->
    <div v-else-if="hasResults" class="py-2">
      <ul class="space-y-2">
        <li v-for="(product, index) in searchResults" :key="index">
          <ProductMiniCard 
            :product="product" 
            @click="handleProductClick(product)"
          />
        </li>
      </ul>
      
      <!-- "See all results" button after results -->
      <div class="mt-4 text-center">
        <Button 
          variant="ghost"
          @click="navigateToFullSearch"
          class="px-4 py-2 text-sm"
        >
          مشاهده همه نتایج جستجو
        </Button>
      </div>
    </div>

    <!-- No search performed yet -->
    <div v-else class="py-4">
      <p class="text-center text-muted-foreground body-3">لطفا عبارت مورد نظر خود را برای جستجو وارد کنید</p>
    </div>
  </div>
</template>

<style scoped>
</style> 