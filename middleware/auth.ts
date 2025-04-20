// middleware/auth.ts
import {useAuthStore} from "~/stores/user/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    const authCookie = useCookie('auth_token');

    // On server side or when auth store is not initialized
    if (!authStore.isLoggedIn && authCookie.value) {
        // Get the token from cookie
        const token = authCookie.value;

        // Initialize auth store with token from cookie
        if (token) {
            authStore.token = token;

            // If we're on client side, try to get user data from localStorage
            if (import.meta.client) {
                const savedUser = localStorage.getItem('auth_user');
                if (savedUser) {
                    try {
                        authStore.user = JSON.parse(savedUser);
                    } catch (e) {
                        console.error('Failed to parse user data', e);
                    }
                }
            }
        }
    }

    // Only redirect if page requires authentication (add a meta property to protected pages)
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        return navigateTo({
            path: '/user/login',
            query: {
                redirect: to.fullPath,
            }
        });
    }
});