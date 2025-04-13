<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCategoriesStore } from '~/stores/shop/categoriesStore'
import { Button } from '@/components/ui/button'
import CategoryList from './CategoryList.vue'
import SubMenu from './SubMenu.vue'
import LoadingIndicator from './LoadingIndicator.vue'
import MenuContainer from './MenuContainer.vue'
import NoDataFound from './NoDataFound.vue'
import type { Category } from './types'

const categoriesStore = useCategoriesStore()
const mainCategories = ref<Category[]>([])
const targetCategory = ref<Category | null>(null)
const activeCategory = ref<Category | null>(null)
const activeSubMenu = ref(0)
const isMenuVisible = ref(false)
const isLoading = ref(false)
const TARGET_CATEGORY_ID = 43

const getCategories = async () => {
  try {
    isLoading.value = true
    const response = await categoriesStore.fetchMainCategories()
    mainCategories.value = response
    if (response && categoriesStore.responseStatus === 200) {
      sessionStorage.setItem('mainCategories', JSON.stringify(mainCategories.value))
    }
    await findTargetCategory()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const findTargetCategory = async () => {
  if (mainCategories.value && mainCategories.value.length > 0) {
    // Try to get cached categories from session storage first
    const cachedCategories = sessionStorage.getItem('mainCategories')
    if (cachedCategories) {
      mainCategories.value = JSON.parse(cachedCategories)
    }
    
    // Find the target category with ID 43
    targetCategory.value = categoriesStore.findCategoryById(mainCategories.value, TARGET_CATEGORY_ID)
    
    if (targetCategory.value && targetCategory.value.children.length > 0) {
      // Set the first child as active by default
      activeSubMenu.value = targetCategory.value.children[0].id
    }
  }
}

function showSubMenu(index: number) {
  activeSubMenu.value = index
}

function showMenu() {
  isMenuVisible.value = true
}

function hideMenu() {
  isMenuVisible.value = false
}

onMounted(async () => {
  await getCategories()
})
</script>

<template>
  <div class="relative" @mouseleave="hideMenu">
    <Button
      to="/shop"
      variant="secondary"
      class="no-ring h-[90%] flex items-center"
      @mouseover="showMenu"
    >
      <Icon name="hugeicons:menu-01" class="ml-1.5 pb-0.5 text-lg" />
      <span class="btn-text">دسته‌بندی محصولات</span>
    </Button>

    <transition 
      enter-active-class="transition duration-200 ease-out" 
      enter-from-class="opacity-0 translate-y-1" 
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in" 
      leave-from-class="opacity-100 translate-y-0" 
      leave-to-class="opacity-0 translate-y-1"
    >
      <div 
        class="fixed top-15 right-0 z-20 w-full"
        v-if="isMenuVisible"
      >
        <MenuContainer :is-loading="isLoading">
          <!-- Category menu (shown when data is loaded) -->
          <div v-if="targetCategory" class="flex flex-col">
            <!-- Menu Content -->
            <div class="flex flex-row">
              <!-- Category List -->
              <CategoryList 
                :children="targetCategory.children" 
                :active-submenu="activeSubMenu"
                @show-submenu="showSubMenu"
              />
              
              <!-- SubMenu -->
              <SubMenu 
                :children="targetCategory.children"
                :active-submenu="activeSubMenu"
              />
            </div>
          </div>
          
          <!-- No data found -->
          <NoDataFound v-else />
        </MenuContainer>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.btn-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.menu-container {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Category styles */
.main-item__icon {
  font-size: 1.5rem;
  margin-left: 0.5rem;
}

.main-item__icon__append {
  transition: all 0.3s ease;
  font-size: 0.625rem;
}

.active-category {
  background-color: white;
}

.active-category .main-item__title, 
.active-category .main-item__icon, 
.active-category .main-item__icon__append {
  color: var(--primary);
}

.active-category:hover .main-item__icon__append {
  animation: slideFromLeft 0.8s ease-in-out;
}

@keyframes slideFromLeft {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style> 