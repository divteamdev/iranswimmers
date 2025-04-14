<script setup lang="ts">
import { Input } from "~/components/ui/input";
import { useSearch } from '~/composables/useSearch';
import Search from '~/components/search/index.vue'
import { Button } from '~/components/ui/button';
import { computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { isMobile } = useDeviceDetection()
const { searchQuery, handleInputFocus, handleButtonClick, isActive, isSearchPage, setSearchQuerySilently } = useSearch()
const isSearchActive = computed(() => isActive.value)

// Update search query from URL when on search page
onMounted(() => {
  if (isSearchPage() && route.query.q) {
    setSearchQuerySilently(route.query.q as string);
  }
});

// Watch for route changes to update query
watch(() => route.query.q, (newQuery) => {
  if (isSearchPage() && newQuery) {
    setSearchQuerySilently(newQuery as string);
  }
}, { immediate: true });

// Handle clicks on the search input div
const handleSearchClick = () => {
  // Always add #search to URL to activate search component, even on search page
  if (typeof window !== 'undefined') {
    // Get current path and search params
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    
    // Add #search to URL and update route
    router.push(currentPath + currentSearch + '#search');
  }
  
  // Focus the search input after a short delay
  setTimeout(() => {
    handleInputFocus();
  }, 100);
}

// Handle click on the search button
const handleSearchButtonClick = () => {
  handleButtonClick(); // Use the built-in toggle behavior
}
</script>

<template>
  <div class="flex relative">
    <!-- Desktop search trigger (looks like input but is a div) -->
    <div v-if="!isMobile" 
      class="grow h-10 md:h-12 rounded-l-none rounded-r-xl bg-muted md:bg-muted/50 border border-input px-3 py-2 text-sm flex items-center cursor-text"
      @click="handleSearchClick"
      :class="{ 'ring-2 ring-primary': isSearchActive }">
      <span v-if="!searchQuery" class="text-muted-foreground">
        مدویو، عینک شنا، جمر،مایو اقتصادی و ...
      </span>
      <span v-else>
        {{ searchQuery }}
      </span>
    </div>

    <!-- Mobile search trigger (already using a div) -->
    <div v-if="isMobile" 
      class="h-10 w-full bg-muted/50 rounded-r-xl flex items-center px-4 border-border border"
      @click="handleSearchClick">
      <span v-if="!searchQuery" class="text-muted-foreground">
        مدویو، عینک شنا، جمر،مایو اقتصادی و ...
      </span>
      <span v-else>
        {{ searchQuery }}
      </span>
    </div>

    <!-- Search button -->
    <Button 
      variant="default" 
      :size="isMobile ? 'icon' : 'icon-lg'" 
      :class="['rounded-r-none h-10 w-10 md:h-12 md:w-12']"
      @click="handleSearchButtonClick">
      <Icon name="hugeicons:search-01" class="text-primary-foreground text-2xl" />
    </Button>

    <Search />
  </div>
</template>

<style scoped></style>