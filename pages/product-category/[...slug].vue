<script setup>
import {useRoute} from 'vue-router';
import {ref, computed, onMounted} from 'vue';
import {useProductsStore} from '~/stores/productsStore';
import {useCategoriesStore} from "~/stores/shop/categoriesStore";

const route = useRoute();
const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const isLoading = ref(true);

// Handle catch-all route params (will be an array)
const slugArray = computed(() => {
  // Ensure it's always an array
  return Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug];
});

// Get the last slug which is the current category
const currentSlug = computed(() => slugArray.value[slugArray.value.length - 1]);

// Function to load category and products based on slug
const loadCategoryData = async (slug) => {
  isLoading.value = true;
  try {
    // Make sure categories are loaded before searching
    if (!categoriesStore.mainCategories.length) {
      await categoriesStore.fetchMainCategories(3);
    }

    // Find the category by slug
    const category = categoriesStore.findCategoryBySlug(slug, true);

    // If category doesn't exist, redirect to shop page
    if (!category) {
      console.log(`Category not found: ${slug}, redirecting to /shop`);
      return navigateTo('/shop');
    }

    // Otherwise continue and fetch products
    productsStore.resetProducts();
    await productsStore.fetchProductsByCategory(slug, 1);
  } catch (error) {
    console.error('Error loading category data:', error);
    return navigateTo('/shop');
  } finally {
    isLoading.value = false;
  }
};

// Load data on initial mount
onMounted(() => {
  if (currentSlug.value) {
    loadCategoryData(currentSlug.value);
  }
});

// Watch for route changes
watch(() => route.params.slug, () => {
  if (currentSlug.value) {
    loadCategoryData(currentSlug.value);
  }
});

const products = computed(() => productsStore.products || []);
const hasMore = computed(() =>
    productsStore.pagination?.currentPage < productsStore.pagination?.lastPage
);
const categoryName = computed(() => categoriesStore.selectedCategory?.name || '');

const loadMoreProducts = async () => {
  if (!hasMore.value) return;
  const nextPage = productsStore.pagination?.currentPage + 1;
  if (nextPage) {
    await productsStore.fetchProductsByCategory(currentSlug.value, nextPage);
  }
};
</script>

<template>
  <ShopLayout
      :bannerAlt="categoryName"
      :parent-category-slug="currentSlug"
      :products="products"
      :isLoading="isLoading || productsStore.isLoading"
      :error="productsStore.error"
      :hasMore="hasMore"
      @load-more="loadMoreProducts"
  />
</template>