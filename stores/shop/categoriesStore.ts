import { defineStore } from 'pinia';
import { useApiStore } from '../APIs';
import { ref } from 'vue';

export interface Category {
  id: number;
  name: string;
  slug: string;
  children: Category[];
}

export const useCategoriesStore = defineStore('categoriesStore', () => {
  const apiStore = useApiStore();
  const mainCategories = ref<Category[]>([]);
  const responseStatus = ref(0);
  const isLoading = ref(false);
  const error = ref<any>(null);

  const fetchMainCategories = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await $fetch(apiStore.endpoints.shop.category.nested(1));
      if (response) {
        responseStatus.value = 200;
        return response;
      }
      return [];
    } catch (err) {
      error.value = err;
      responseStatus.value = 500;
      console.error('Error fetching categories:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    mainCategories,
    responseStatus,
    isLoading,
    error,
    fetchMainCategories
  };
}); 