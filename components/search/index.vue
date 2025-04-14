<script lang="ts" setup>
import { useSearch } from '~/composables/useSearch';
import { computed, onMounted, ref, onBeforeUnmount, watch, nextTick } from 'vue';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';

import { Input } from '~/components/ui/input';
import SearchContent from '~/components/search/SearchContent.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { searchQuery, isActive, closeSearch, isSearchPage, handleButtonClick, setSearchQuerySilently } = useSearch();
const hasQuery = computed(() => searchQuery.value && searchQuery.value.length > 0);
const { isMobile } = useDeviceDetection();
const mobileInputRef = ref<HTMLInputElement | null>(null);
const desktopInputRef = ref<HTMLInputElement | null>(null);
const searchContainerRef = ref<HTMLElement | null>(null);

// Create a computed property for isActive
const computedIsActive = computed(() => isActive.value);

// Handle when sheet is closed manually
const handleSheetClose = () => {
  removeHashAndCloseSearch();
};

// Prevent propagation when clicking inside search component
const stopPropagation = (event: MouseEvent) => {
  event.stopPropagation();
};

// Remove #search from URL and close search component
const removeHashAndCloseSearch = () => {
  // Remove #search from URL
  if (typeof window !== 'undefined' && window.location.hash === '#search') {
    const currentPath = window.location.pathname + window.location.search;
    router.replace(currentPath);
  }
  
  // Clear query if not on search page
  if (!isSearchPage()) {
    searchQuery.value = '';
  }
  
  // Close the search component
  closeSearch();
};

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  if (searchContainerRef.value && !searchContainerRef.value.contains(event.target as Node) && isActive.value) {
    removeHashAndCloseSearch();
  }
};

// Navigate to search page
const navigateToSearchPage = () => {
  if (searchQuery.value.trim()) {
    const query = searchQuery.value;
    
    router.push({
      path: '/search/',
      query: { q: query }
    });
    
    // Set a timeout to close the search component after navigation
    setTimeout(() => {
      removeHashAndCloseSearch();
      
      // If we're on the search page, update the query silently
      if (isSearchPage()) {
        setSearchQuerySilently(query);
      }
    }, 200);
  }
};

// Handle keyboard events
const handleKeyDown = (event: KeyboardEvent) => {
  if (isActive.value) {
    if (event.key === 'Escape') {
      event.preventDefault();
      removeHashAndCloseSearch();
    } else if (event.key === 'Enter' && searchQuery.value.trim()) {
      event.preventDefault();
      navigateToSearchPage();
    }
  }
};

// Focus the mobile input when the sheet opens
const onSheetAfterEnter = () => {
  if (mobileInputRef.value) {
    setTimeout(() => {
      mobileInputRef.value?.focus();
    }, 100);
  }
};

// Focus the desktop input when search becomes active
watch(computedIsActive, (newValue) => {
  if (newValue && !isMobile && desktopInputRef.value) {
    setTimeout(() => {
      desktopInputRef.value?.focus();
    }, 100);
  }
});

// Handle search button click
const onSearchButtonClick = () => {
  if (hasQuery.value) {
    navigateToSearchPage();
  } else {
    handleButtonClick();
  }
};

// Add a direct route change listener to absolutely ensure search closes on navigation
onMounted(() => {
  // Watch for route changes to close search when navigating
  const removeRouteListener = router.afterEach((to, from) => {
    // If navigating to a non-search page, close search
    if (to.path !== from.path && !to.path.startsWith('/search')) {
      if (isActive.value) {
        removeHashAndCloseSearch();
      }
    }
    
    // If navigating to search page, update query from URL
    if (to.path.startsWith('/search') && to.query.q) {
      const query = to.query.q as string;
      setSearchQuerySilently(query);
    }
  });

  // Add click outside and keyboard listeners
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeyDown);

  // Clean up route listener
  onBeforeUnmount(() => {
    removeRouteListener();
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleKeyDown);
  });
});

// Watch hash changes to ensure search component activates
watch(() => route.hash, (newHash) => {
  if (newHash === '#search' && !isActive.value) {
    nextTick(() => {
      isActive.value = true;
    });
  } else if (newHash !== '#search' && isActive.value) {
    nextTick(() => {
      closeSearch();
    });
  }
}, { immediate: true });

// Enhanced function to restore pointer events
const restorePointerEvents = () => {
  if (typeof document !== 'undefined') {
    document.body.style.pointerEvents = '';
  }
};

// Make sure to clean up regardless of component lifecycle
onBeforeUnmount(() => {
  restorePointerEvents();
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <!-- Desktop search dropdown - only show if not on search page or if force-showing -->
  <div v-if="!isMobile && computedIsActive"
    ref="searchContainerRef"
    class="absolute -top-2 -left-2 -right-2 z-50 bg-background border border-border border-t-0 rounded-b-lg shadow-lg p-2 max-h-[80vh] overflow-y-auto"
    @click="stopPropagation">
    
    <!-- Desktop search input -->
    <div class="flex mb-4 relative" dir="rtl">
      <Input 
        ref="desktopInputRef"
        v-model="searchQuery" 
        placeholder="عبارت مورد نظر خود را وارد کنید..."
        class="grow h-12 rounded-l-none rounded-r-xl bg-muted/50" 
        autofocus 
        @keydown.enter="navigateToSearchPage"
        @keydown.esc="removeHashAndCloseSearch"
      />
      <!-- Search button -->
      <Button 
        variant="default" 
        :size="isMobile ? 'icon' : 'icon-lg'" 
        :class="['rounded-r-none h-10 w-10 md:h-12 md:w-12']"
        @click="onSearchButtonClick">
        <Icon name="hugeicons:search-01" class="text-primary-foreground text-2xl" />
      </Button>
    </div>

    <!-- Search results -->
    <SearchContent :query="searchQuery" />
  </div>

  <!-- Mobile search sheet -->
  <Sheet :modal="false" @after-leave="restorePointerEvents" :open="computedIsActive && isMobile"
    @after-enter="onSheetAfterEnter">
    <SheetContent side="bottom" class="h-full px-4 pt-6 pb-4 flex flex-col" @close="handleSheetClose">
      <SheetHeader>
        <SheetTitle>جستجو</SheetTitle>
      </SheetHeader>

      <!-- Mobile search input -->
      <div class="flex mb-4 relative" dir="rtl">
        <Input 
          ref="mobileInputRef" 
          v-model="searchQuery" 
          placeholder="عبارت مورد نظر خود را وارد کنید..."
          class="grow h-12 rounded-xl bg-muted" 
          autofocus 
          @keydown.enter="navigateToSearchPage"
          @keydown.esc="removeHashAndCloseSearch"
        />
        <Icon name="hugeicons:search-01" class="text-primary text-2xl absolute left-2 top-1/2 -translate-y-1/2" />
      </div>
      <!-- Search results area -->
      <div class="flex-grow overflow-y-auto">
        <SearchContent :query="searchQuery" />
      </div>
    </SheetContent>
  </Sheet>
</template>

<style></style>