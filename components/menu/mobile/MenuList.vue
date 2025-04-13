<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCategoriesStore, type Category } from '~/stores/shop/categoriesStore'
import WebsitePagesList from './PagesList.vue'
import ProductCategoriesList from './CategoriesList.vue'

// Types definitions
interface Props {
  activeTab: string
}

interface MainMenuItem {
  text: string
  link: string
  icon: string
  iconColor: string
}

interface ContactItem {
  text: string
  icon: string
  color: string
  iconColor: string
  link: string
}

interface SocialItem {
  text: string
  icon: string
  link: string
  color: string
  logoColor: string
}

interface MainMenuData {
  mainMenu: MainMenuItem[]
  contact: ContactItem[]
  socials: SocialItem[]
}

const props = defineProps<Props>()
const route = useRoute()

// State
const categoriesStore = useCategoriesStore()
const mainCategories = ref<Category[]>([])
const waterSportsCategory = ref<Category | null>(null)
const mainMenuData = ref<MainMenuData | null>(null)
const WATER_SPORTS_CATEGORY_ID = 43

// Methods
const loadMainMenuData = async () => {
  try {
    const { default: data } = await import('~/assets/mainMenu.json')
    mainMenuData.value = data
  } catch (error) {
    console.error('Failed to load main menu data:', error)
  }
}

const loadCategories = async () => {
  try {
    const cachedCategories = sessionStorage.getItem('mainCategories')
    
    if (cachedCategories) {
      mainCategories.value = JSON.parse(cachedCategories)
      return
    }
    
    const response = await categoriesStore.fetchMainCategories()
    if (response && categoriesStore.responseStatus === 200) {
      mainCategories.value = response as Category[]
      sessionStorage.setItem('mainCategories', JSON.stringify(mainCategories.value))
    }
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
}

// Lifecycle hooks
onMounted(async () => {
  await Promise.all([
    loadCategories(),
    loadMainMenuData()
  ])
})
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Product Categories Tab -->
    <ProductCategoriesList 
      v-if="activeTab === 'productCategories'"
      :main-categories="mainCategories"
    />

    <!-- Website Pages Tab -->
    <WebsitePagesList
      v-else-if="activeTab === 'websitePages'"
      :main-menu-data="mainMenuData"
    />
  </div>
</template>

<style scoped>


.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>
