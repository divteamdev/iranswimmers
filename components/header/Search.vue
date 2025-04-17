<script setup lang="ts">
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

onMounted(() => {
  if (isSearchPage() && route.query.q) {
    setSearchQuerySilently(route.query.q as string);
  }
});

watch(() => route.query.q, (newQuery) => {
  if (isSearchPage() && newQuery) {
    setSearchQuerySilently(newQuery as string);
  }
}, { immediate: true });

// Handle clicks on the search input div
const handleSearchClick = () => {
  if (typeof window !== 'undefined') {
    
    setTimeout(() => {
      handleInputFocus();
    }, 100);
  }
}

// Forward to the main search button click handler
const handleSearchButtonClick = () => {
  handleButtonClick();
}
</script>

<template>
  <div class="flex relative">
    <!-- Desktop search trigger -->
    <div v-if="!isMobile" 
      class="grow h-10 md:h-12 rounded-l-none rounded-r-xl bg-muted md:bg-muted/50 border border-input px-3 py-2 text-sm flex items-center cursor-text"
      @click="handleSearchClick"
      :class="{ 'ring-2 ring-primary': isSearchActive }">
      <span v-if="!searchQuery" class="text-muted-foreground body-3">
        مدویو، عینک شنا، جمر،مایو اقتصادی و ...
      </span>
      <span v-else class="body-3">
        {{ searchQuery }}
      </span>
    </div>

    <!-- Mobile search trigger -->
    <div v-if="isMobile" 
      class="h-10 w-full bg-muted/50 rounded-r-xl flex items-center px-4 border-border border"
      @click="handleSearchClick">
      <span v-if="!searchQuery" class="text-muted-foreground body-3">
        مدویو، عینک شنا، جمر،مایو اقتصادی و ...
      </span>
      <span v-else class="body-3">
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