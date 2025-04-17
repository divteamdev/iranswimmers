import {defineStore} from 'pinia';
import {useApiStore} from '../APIs';
import {ref, computed} from 'vue';
import {apiRequest} from '../APIs/apiUtils';

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

    const fetchMainCategories = async (depth: 3) => {
        isLoading.value = true;
        error.value = null;

        try {
            const {data, error: apiError} = await apiRequest(
                apiStore.endpoints.shop.category.nested(depth)
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
        console.log(selectedCategory.value);
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

    const findCategoryBySlug = (slug: string, setSelected = true): Category | null => {
        if (!slug || !mainCategories.value?.length) return null;

        // Create all possible slug variants for matching
        const slugVariants = createSlugVariants(slug);

        // First check main categories
        const foundInMain = findInCategoryList(mainCategories.value, slugVariants);
        if (foundInMain) {
            if (setSelected) selectedCategory.value = foundInMain;
            return foundInMain;
        }

        // Recursively search in nested categories
        const foundInNested = searchNestedCategories(mainCategories.value, slugVariants);
        if (foundInNested && setSelected) {
            selectedCategory.value = foundInNested;
        }

        return foundInNested;
    };

// Helper functions to improve structure and readability
    const createSlugVariants = (slug: string): Record<string, string> => {
        const originalSlug = slug;
        const normalizedSlug = slug.replace(/-/g, ' ');
        const encodedSlug = encodeURIComponent(normalizedSlug);
        const lowercaseEncodedSlug = encodedSlug.replace(/%[0-9A-F]{2}/g, match => match.toLowerCase());
        const dashedEncodedSlug = lowercaseEncodedSlug.replace(/%20/g, '-');

        return {
            originalSlug,
            normalizedSlug,
            encodedSlug,
            lowercaseEncodedSlug,
            dashedEncodedSlug
        };
    };

    const isSlugMatch = (category: Category, slugVariants: Record<string, string>): boolean => {
        const {originalSlug, normalizedSlug, encodedSlug, lowercaseEncodedSlug, dashedEncodedSlug} = slugVariants;
        const decodedCategorySlug = decodeURIComponent(category.slug);

        return (
            category.slug === originalSlug ||
            category.slug === encodedSlug ||
            category.slug === lowercaseEncodedSlug ||
            category.slug === dashedEncodedSlug ||
            decodedCategorySlug === normalizedSlug
        );
    };

    const findInCategoryList = (categories: Category[], slugVariants: Record<string, string>): Category | null => {
        for (const category of categories) {
            if (isSlugMatch(category, slugVariants)) {
                return category;
            }
        }
        return null;
    };

    const searchNestedCategories = (categories: Category[], slugVariants: Record<string, string>): Category | null => {
        for (const category of categories) {
            // Check if current category matches
            if (isSlugMatch(category, slugVariants)) {
                return category;
            }

            // Check category's children recursively
            if (category.children?.length) {
                const found = searchNestedCategories(category.children, slugVariants);
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
        findCategoryById,
        findCategoryBySlug,
    };
}); 