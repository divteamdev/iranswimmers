<script setup lang="ts">
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '~/components/ui/carousel'
import {computed, onMounted, ref, watch} from 'vue'
import {useCategoriesStore} from '~/stores/shop/categoriesStore'

const categoriesStore = useCategoriesStore()
const isLoading = ref(true)
const mainParentSlug = 'ورزش-های-آبی'
const mainCategory = ref(null)

// Add prop for parent category ID
const props = defineProps({
  parentCategorySlug: {
    type: String,
    default: mainParentSlug
  },

  parentCategory: {
    type: String,
    default: '',
  },
  listType: {
    type: String,
    default: 'categories',
  }
});

// Get children categories, falling back to main category children if empty
const categories = computed(() => {
  const currentChildren = categoriesStore.selectedCategory?.children || [];

  // If current category has children, use them
  if (currentChildren.length > 0) {
    return currentChildren;
  }

  // Otherwise fall back to the main category children
  return mainCategory.value?.children || [];
});

const isParent = computed(() => {
  // Get the current selected category
  const selectedCat = categoriesStore.selectedCategory;

  // Return true if the category exists and has children
  return !!selectedCat && Array.isArray(selectedCat.children) && selectedCat.children.length > 0;
});

// Make sure parentCategory is defined for nested routing
const parentCategory = computed(() => {
  return categoriesStore.selectedCategory?.slug || props.parentCategorySlug;
});

// Load main fallback category separately
const loadMainCategory = async () => {
  if (mainCategory.value) return;

  // Find the main water sports category
  mainCategory.value = categoriesStore.findCategoryBySlug(mainParentSlug, false);

  // If not found and we need to fetch it
  if (!mainCategory.value) {
    mainCategory.value = await categoriesStore.findCategoryBySlug(mainParentSlug, false);
  }
};

// Initialize component
onMounted(async () => {
  if (!categoriesStore.mainCategories.length) {
    await categoriesStore.fetchMainCategories(3);
  }

  // Load both the requested category and the main fallback category
  await categoriesStore.findCategoryBySlug(props.parentCategorySlug, true);
  await loadMainCategory();

  isLoading.value = false;
});

// Watch for slug changes
watch(() => props.parentCategorySlug, async (newSlug) => {
  isLoading.value = true;
  await categoriesStore.findCategoryBySlug(newSlug, true);
  isLoading.value = false;
});

// Reference to the carousel for exposed methods
const carouselRef = ref<any>(null);

// Expose carousel API to parent components
defineExpose({
  scrollNext() {
    carouselRef.value?.scrollNext?.();
  },
  scrollPrev() {
    carouselRef.value?.scrollPrev?.();
  }
});
</script>

<template>
  <div class="relative" dir="rtl">
    <Carousel
        ref="carouselRef"
        class="h-full w-full bg-card/20 rounded-lg py-8 pr-6 pl-10 border border-border"
        :opts="{
          align: 'start',
          direction: 'rtl',
          dragFree: true,
        }"
    >
      <CarouselContent class="h-full">
        <CarouselItem
            v-for="category in categories"
            :key="category.id"
            v-show="listType !== 'brands' || category.products_count > 0"
            class="px-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/7 2xl:basis-1/8 border-l border-l-border last:border-l-0"
        >
          <nuxt-link
              :to="listType === 'categories'
    ? (isParent ? `/product-category/${parentCategory}/${category.slug}` : `/product-category/${category.slug}`)
    : `/brand/${category.slug}`"
              class="flex flex-col items-center justify-center gap-5 h-[120px] text-center transition-all duration-300 cursor-pointer relative border-r border-gray-200 last:border-r-0"
          >
            <img
                :src="category.image || '/images/svg/shop-categories-icon/no-image-category.svg'"
                :alt="category.name"
                class="w-auto h-auto"
            />
            <h6 class="body-4 text-card-foreground">
              {{ category.name }}
            </h6>
          </nuxt-link>
        </CarouselItem>
      </CarouselContent>

      <CarouselNext
          variant="ghost"
          size="icon"
          class="top-1/2 -translate-y-1/2 left-2 right-[unset] z-10"
      >
        <Icon name="hugeicons:arrow-left-01" class="text-xl"/>
      </CarouselNext>


      <CarouselPrevious
          variant="ghost"
          size="icon"
          class="top-1/2 -translate-y-1/2 right-2 z-10"
      >
        <Icon name="hugeicons:arrow-right-01" class="text-xl"/>
      </CarouselPrevious>

    </Carousel>
  </div>
</template>