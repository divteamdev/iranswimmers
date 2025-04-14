<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSearchStore } from '~/stores/searchStore';
import { useSearch } from '~/composables/useSearch';

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();
const { setSearchQuerySilently } = useSearch();

// Get query from route
const searchQuery = computed(() => route.query.q as string || '');

// Search state
const isLoading = computed(() => searchStore.isFullSearching);
const results = computed(() => searchStore.fullSearchResults);
const error = computed(() => searchStore.fullSearchError);
const hasResults = computed(() => searchStore.hasFullResults);

// Execute search when query changes
watch(searchQuery, (newQuery) => {
  if (newQuery) {
    setSearchQuerySilently(newQuery);
    searchStore.performFullSearch(newQuery);
  } else {
    searchStore.clearFullSearch();
  }
}, { immediate: true });

// Ensure URL formatting is correct (e.g., /search/?q=query)
onMounted(() => {
  if (route.path === '/search' && !route.path.endsWith('/')) {
    router.replace({
      path: '/search/',
      query: route.query
    });
  }
});

// Page meta
useHead({
  title: computed(() => searchQuery.value ? `جستجو برای: ${searchQuery.value}` : 'جستجو'),
  meta: [
    {
      name: 'description',
      content: computed(() => `نتایج جستجو برای ${searchQuery.value || ''}`)
    }
  ]
});
</script>

<template>
  <div class="container mx-auto py-8 px-4" dir="rtl">
    <!-- Search header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-2" v-if="searchQuery">
        نتایج جستجو برای: "{{ searchQuery }}"
      </h1>
      <h1 class="text-2xl font-bold mb-2" v-else>
        جستجو
      </h1>
      <p v-if="searchQuery && hasResults" class="text-muted-foreground">
        {{ results.length }} نتیجه یافت شد
      </p>
    </div>

    <!-- Search results -->
    <div class="mb-8">
      <ProductGrid
        :products="results"
        :is-loading="isLoading"
        :error="error"
        empty-message="نتیجه‌ای یافت نشد. لطفا جستجوی دیگری را امتحان کنید."
      />
    </div>
  </div>
</template>

<style scoped>
/* Search page specific styles */
</style>