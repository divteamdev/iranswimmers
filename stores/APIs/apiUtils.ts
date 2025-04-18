import type {FetchOptions} from 'ofetch';
import {toast} from 'vue-sonner';

export const apiRequest = async <T = any>(
    endpoint: string,
    options?: FetchOptions & { method?: 'GET' | 'POST' | 'PUT' | 'DELETE' },
    customBase?: string
) => {
    const config = useRuntimeConfig();

    const base = customBase || config.public.baseURL;
    const url = `${base}${endpoint}`;

    try {
        const data = await $fetch<T>(url, {
            ...options,
            timeout: options?.timeout || 30000,
        });

        return {
            data,
            error: null
        };
    } catch (error: any) {
        toast.error('error', {
            description: "An error occurred",
        });

        return {
            data: null,
            error
        };
    }
};
