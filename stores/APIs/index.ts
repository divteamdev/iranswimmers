import {defineStore} from 'pinia';
import {apiRequest} from './apiUtils';

export const useApiStore = defineStore('apiStore', () => {
    const config = useRuntimeConfig();

    const BASE_URL: Ref<string> = ref(config.public.baseURL);
    const API_PATH: Ref<string> = ref(config.public.apiPath);

    const endpoints = {
        shop: {
            product: {
                list: () => `${API_PATH.value}shop`,
                single: (slug: string) => `${API_PATH.value}product/${slug}`,
                related: (slug: string) => `${API_PATH.value}product/${slug}/related`,
            },
            category: {
                list: () => `${API_PATH.value}shop/categories`,
                nested: (depth: number) => `${API_PATH.value}shop/categories?d=${depth}`,
                single: (slug: string) => `${API_PATH.value}shop/category/${slug}`,
            },
            brand: {
                list: () => `${API_PATH.value}shop/brands`,
                single: (slug: string) => `${API_PATH.value}shop/brand/${slug}`,
            },
            search: (query: string) => `${API_PATH.value}shop/search?q=${query}`,
            rtSearch: (query: string) => `${API_PATH.value}shop/rt-search?q=${query}`,
            filter: {
                set: (query: string) => `${API_PATH.value}shop/filter?${query}`,
                options: `${API_PATH.value}shop/filter/sidebar`,
            },
            comment: {
                add: (productSlug: string) => `${API_PATH.value}product/${productSlug}/comment/create`,
                list: (productSlug: string) => `${API_PATH.value}product/${productSlug}/comments`,
            }
        },
        home: {
            index: () => `${API_PATH.value}index`,
        },
        auth: {
            otp: {
                request: () => `${API_PATH.value}auth/otp`,
                verify: () => `${API_PATH.value}auth/otp/verify`,
            },
            password: {
                login: () => `${API_PATH.value}auth/login`,
                create: () => `${API_PATH.value}auth/create`,
                update: () => `${API_PATH.value}auth/password/update`,
                forgot: () => `${API_PATH.value}auth/password/forget`,
                reset: () => `${API_PATH.value}auth/password/reset`,
            },
        },
        cart: {
            items: () => `${API_PATH.value}cart`,
            add: () => `${API_PATH.value}cart/add`,
            remove: () => `${API_PATH.value}cart/remove`,
            update: () => `${API_PATH.value}cart/update`,
        },
    }

    return {
        endpoints,
        BASE_URL,
        API_PATH,
    }
});