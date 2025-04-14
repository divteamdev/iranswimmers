<script lang="ts" setup>
import { useSearch } from '~/composables/useSearch';
import { computed, onMounted, ref, onBeforeUnmount } from 'vue';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
  SheetOverlay,
} from '~/components/ui/sheet';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

const { searchQuery, isActive, closeSearch } = useSearch();
const hasQuery = computed(() => searchQuery.value && searchQuery.value.length > 0);
const { isMobile } = useDeviceDetection();
const mobileInputRef = ref<HTMLInputElement | null>(null);

// Create a computed property for isActive
const computedIsActive = computed(() => isActive.value);

// Handle when sheet is closed manually
const handleSheetClose = () => {
  closeSearch();
};

// Focus the mobile input when the sheet opens
const onSheetAfterEnter = () => {
  if (mobileInputRef.value) {
    setTimeout(() => {
      mobileInputRef.value?.focus();
    }, 100);
  }
};

// Enhanced function to restore pointer events
const restorePointerEvents = () => {
  if (typeof document !== 'undefined') {
    document.body.style.pointerEvents = '';
  }
};

// Make sure to clean up regardless of component lifecycle
onBeforeUnmount(() => {
  restorePointerEvents();
});
</script>

<template>
  <!-- Desktop search dropdown -->
  <div v-if="!isMobile && computedIsActive"
    class="absolute top-full left-0 right-0 z-50 bg-background border border-border border-t-0 rounded-b-lg shadow-lg p-4 max-h-[80vh] overflow-y-auto">
    <div v-if="hasQuery" class="py-2">
      <p class="text-sm text-muted-foreground mb-2">جستجو برای: "{{ searchQuery }}"</p>
      <div class="space-y-2">
        <!-- Search results would go here -->
        <p class="text-center text-muted-foreground" v-if="true">در حال بارگذاری نتایج...</p>
      </div>
    </div>
    <div v-else class="py-2">
      <p class="text-center text-muted-foreground">لطفا عبارت مورد نظر خود را برای جستجو وارد کنید</p>
    </div>
  </div>

  <!-- Mobile search sheet -->
  <Sheet 
    :modal="false" 
    @close="handleSheetClose" 
    @after-leave="restorePointerEvents"
    :open="computedIsActive && isMobile" 
    @after-enter="onSheetAfterEnter">
    <SheetContent  side="bottom" class="h-full px-4 pt-6 pb-4 flex flex-col">
      <SheetHeader class="mb-4">
        <SheetTitle>جستجو</SheetTitle>
      </SheetHeader>
      
      <!-- Mobile search input -->
      <div class="flex mb-4">
        <Input
          ref="mobileInputRef"
          v-model="searchQuery"
          placeholder="عبارت مورد نظر خود را وارد کنید..."
          class="grow h-12 rounded-l-none rounded-r-xl bg-muted"
          autofocus
        />
        <Button
          variant="default"
          size="icon-lg"
          class="rounded-r-none h-12 w-12"
          :class="{ 'bg-primary-focus': hasQuery }"
        >
          <Icon name="hugeicons:search-01" class="text-primary-foreground text-2xl" />
        </Button>
      </div>

      <!-- Search results area -->
      <div class="flex-grow overflow-y-auto">
        <div v-if="hasQuery">
          <p class="text-sm text-muted-foreground mb-4">جستجو برای: "{{ searchQuery }}"</p>
          <div class="space-y-4">
            <!-- Empty state - replace with actual results -->
            <p class="text-center text-muted-foreground py-8">در حال بارگذاری نتایج...</p>
          </div>
        </div>
        <div v-else>
          <p class="text-center text-muted-foreground py-12">لطفا عبارت مورد نظر خود را برای جستجو وارد کنید</p>
        </div>
      </div>

      <SheetFooter class="mt-4">
        <SheetClose asChild>
          <Button @click="closeSearch" class="w-full">بستن</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<style></style>