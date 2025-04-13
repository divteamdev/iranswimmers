<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCategoriesStore, type Category } from '~/stores/shop/categoriesStore'
import MenuItem from './MenuItem.vue'

interface Props {
  activeTab: string
}

const props = defineProps<Props>()

const categoriesStore = useCategoriesStore()
const mainCategories = ref<Category[]>([])
const activeSubMenu = ref<number | null>(null)
const route = useRoute()

const getCategories = async () => {
  try {
    const response = await categoriesStore.fetchMainCategories()
    if (response && categoriesStore.responseStatus === 200) {
      mainCategories.value = response as Category[]
      sessionStorage.setItem('mainCategories', JSON.stringify(mainCategories.value))
    }
    await defaultCategory()
  } catch (error) {
    console.error(error)
  }
}

const defaultCategory = async () => {
  if (mainCategories.value && mainCategories.value.length > 0) {
    activeSubMenu.value = null
    const cachedCategories = sessionStorage.getItem('mainCategories')
    if (cachedCategories) {
      mainCategories.value = JSON.parse(cachedCategories) as Category[]
    } else {
      const response = await categoriesStore.fetchMainCategories()
      if (response && categoriesStore.responseStatus === 200) {
        sessionStorage.setItem('mainCategories', JSON.stringify(response))
        mainCategories.value = response as Category[]
      }
    }
  }
}

const toggleSubMenu = (index: number) => {
  if (activeSubMenu.value === index) {
    activeSubMenu.value = null
  } else {
    activeSubMenu.value = index
  }
}

const submenuHeight = computed(() => {
  if (activeSubMenu.value !== null && mainCategories.value[activeSubMenu.value]) {
    return `${(mainCategories.value[activeSubMenu.value].children.length * 40 + 8)}px`
  }
  return '40px'
})

const randomCategories = computed(() => {
  if (mainCategories.value?.length > 6) {
    let shuffled = [...mainCategories.value].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 6)
  }
  return [...(mainCategories.value || [])]
})

onMounted(async () => {
  await getCategories()
})
</script>

<template>
  <div class="flex flex-col">
    <div v-if="activeTab === 'productCategories'" class="overflow-y-auto max-h-[calc(100vh-140px)]">
      <ul>
        <li v-for="(category, index) in mainCategories" :key="category.id"
            class="flex flex-col w-full transition-all duration-500"
            :style="activeSubMenu === index ? `height: calc(${submenuHeight} + 60px)` : 'height: 60px'"
            :class="{'bg-accent': activeSubMenu === index}">
          
          <NuxtLink v-if="category.children && category.children.length === 0"
                    :to="'/product-category/' + category.slug"
                    class="w-full max-w-[500px] flex px-4 py-4 items-center h-fit justify-between border-b border-b-border/30 last:border-b-0"
                    :class="{ 'bg-primary text-primary-foreground': route.path === '/product-category/' + category.slug }">
            <i class="is-swimming ml-2 text-lg"
               :class="{ 'text-white': route.path === '/product-category/' + category.slug, 'text-primary': route.path !== '/product-category/' + category.slug }" />
            <span class="w-auto grow text-base">{{ category.name }}</span>
            <i class="mdi mdi-arrow-top-left text-xs" 
               :class="{ 'text-white': route.path === '/product-category/' + category.slug, 'text-primary': route.path !== '/product-category/' + category.slug }" />
          </NuxtLink>
          
          <div v-else
               @click="category.children && category.children.length > 0 ? toggleSubMenu(index) : null"
               class="w-full max-w-[500px] flex px-4 py-4 items-center h-fit justify-between border-b border-b-border/30 last:border-b-0 cursor-pointer">
            <i class="is-swimming ml-2 text-primary text-lg" />
            <span class="w-auto grow text-base"
                  :class="activeSubMenu === index ? 'text-primary' : 'text-foreground'">
              {{ category.name }}
            </span>
            <i class="is-chevron-left text-xs text-primary transition-all duration-300"
               :style="activeSubMenu === index ? 'transform: rotate(-90deg)' : 'transform: rotate(0deg)'" />
          </div>

          <ul v-show="activeSubMenu === index && category.children && category.children.length > 0"
              :style="{ height: submenuHeight }"
              class="h-0 overflow-hidden transition-all duration-300">
            <li v-for="child in category.children" :key="child.id" class="flex items-center h-10 mr-6">
              <NuxtLink :to="'/product-category/' + child.slug" class="flex items-center">
                <i class="is-swimming ml-2 text-primary text-lg" />
                <span :class="{ 'text-primary': route.path === '/product-category/' + child.slug }"
                      class="text-[15px] font-normal">
                  {{ child.name }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </li>
        
        <li class="w-full max-w-[500px] flex px-4 py-4 items-center h-fit justify-between border-b border-b-border/30 last:border-b-0">
          <i class="mdi mdi-percent ml-2 text-secondary text-lg" />
          <span class="w-full">پر تخفیف‌ترین‌ها</span>
          <i class="mdi mdi-arrow-top-left text-xs text-primary" />
        </li>
      </ul>
      
      <div class="mt-4 h-14 px-4 flex items-center w-full overflow-x-auto thin-scrollbar-thumb overflow-y-hidden">
        <span class="text-secondary text-sm whitespace-nowrap ml-2">دسته‌بندی‌های پرطرفدار:</span>
        <div v-for="(category, index) in randomCategories" :key="index"
             class="bg-primary-50 ml-2 rounded-md">
          <NuxtLink :to="'/product-category/'+ category.slug"
                     class="w-fit whitespace-nowrap text-sm px-2 py-1.5 text-primary">
            {{ category.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <div v-else-if="activeTab === 'websitePages'">
      <MenuItem 
        text="آکادمی شنا"
        to="/SwimAcademy"
        prepend-icon="is-swimming"
        prepend-icon-color="text-red-400"
        append-icon="mdi mdi-arrow-top-left"
      />
      
      <MenuItem 
        text="وبلاگ"
        to="/blog"
        prepend-icon="is-document"
        prepend-icon-color="text-primary-600"
        append-icon="mdi mdi-arrow-top-left"
      />
      
      <MenuItem 
        text="درباره ما"
        to="/about"
        prepend-icon="mdi mdi-information-outline"
        prepend-icon-color="text-green-400"
        append-icon="mdi mdi-arrow-top-left"
      />
    </div>
  </div>
</template> 