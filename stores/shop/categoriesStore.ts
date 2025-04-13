import { defineStore } from 'pinia';
import { useApiStore } from '../APIs';
import { ref, computed } from 'vue';
import { apiRequest } from '../APIs/apiUtils';

export interface Category {
  id: number;
  name: string;
  slug: string;
  children: Category[];
  description?: string;
  posts_count?: number;
  image?: string | null;
}

export const useCategoriesStore = defineStore('categoriesStore', () => {
  const apiStore = useApiStore();
  const categories = ref<any>(null);
  const mainCategories = ref<Category[]>([]);
  const selectedCategory = ref<Category | null>(null);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const responseStatus = ref<number>(200); // Default to 200, updated on successful responses

  const fetchMainCategories = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const { data, error: apiError } = await apiRequest(
        apiStore.endpoints.shop.category.nested(3)
      );

      if (apiError) {
        error.value = apiError;
        responseStatus.value = 400; // Default error status
      } else {
        responseStatus.value = 200; // Successful response
        categories.value = data;
        mainCategories.value = data?.data || [];
      }
    } catch (err) {
      responseStatus.value = 500; // Server error
      if (err instanceof Error) {
        error.value = err;
      } else {
        error.value = new Error('Unknown error occurred');
      }
      console.error('Error fetching categories:', err);
    } finally {
      isLoading.value = false;
    }

    return mainCategories.value;
  };

  const setSelectedCategory = (categoryId: number) => {
    // Check main categories
    selectedCategory.value = findCategoryById(mainCategories.value, categoryId);
  };

  // Helper function to recursively find a category by ID
  const findCategoryById = (categories: Category[], id: number): Category | null => {
    for (const category of categories) {
      if (category.id === id) {
        return category;
      }
      
      if (category.children && category.children.length > 0) {
        const found = findCategoryById(category.children, id);
        if (found) return found;
      }
    }
    
    return null;
  };

  return {
    categories,
    mainCategories,
    selectedCategory,
    isLoading,
    error,
    responseStatus,
    fetchMainCategories,
    setSelectedCategory,
    findCategoryById
  };
}); 