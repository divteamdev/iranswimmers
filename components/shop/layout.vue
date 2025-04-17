<script setup lang="ts">
import { ref } from 'vue';
import { useDeviceDetection } from "~/composables/useDeviceDetection";

const props = defineProps({
  // Banner props
  banner: {
    type: Object,
    default: () => ({ desktop: '', mobile: '' })
  },
  bannerAlt: {
    type: String,
    default: 'Shop banner'
  },

  // Categories props
  parentCategorySlug: {
    type: String,
  },
  showCategories: {
    type: Boolean,
    default: true
  },

  // Products props
  products: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: Object,
    default: null
  },
  hasMore: {
    type: Boolean,
    default: false
  },

  // Custom grid layout
  gridClass: {
    type: String,
    default: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
  }
});

const emit = defineEmits(['filter', 'load-more']);

const { isMobile } = useDeviceDetection();
const viewMode = ref('grid');

const handleFilter = () => {
  emit('filter');
};

const handleViewChange = (view) => {
  viewMode.value = view;
};

const loadMoreProducts = () => {
  emit('load-more');
};
</script>

<template>
  <div class="irsm-container" dir="rtl">
    <Banner
        v-if="banner.desktop || banner.mobile"
        class="mb-8"
        variant="full-width"
        :src="isMobile ? banner.mobile : banner.desktop"
        :alt="bannerAlt"
    />

    <ShopCategoriesCarousel
        v-if="showCategories && parentCategorySlug"
        :parentCategorySlug="parentCategorySlug"
        class="mb-8"
    />

    <slot name="before-filter"></slot>

    <ShopFilterBar
        class="mb-8"
        :view="viewMode"
        @filter="handleFilter"
        @change-view="handleViewChange"
    />

    <ProductGrid
        :products="products"
        :isLoading="isLoading"
        :error="error"
        :gridClass="viewMode === 'grid' ? gridClass : 'grid-cols-1'"
        :viewMode="viewMode"
        :hasMore="hasMore"
        @load-more="loadMoreProducts"
        gap="gap-6"
    />

    <slot name="after-products"></slot>
  </div>
</template>