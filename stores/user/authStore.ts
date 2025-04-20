// stores/user/authStore.ts
import { defineStore } from 'pinia';
import { useApiStore } from '../APIs';
import { apiRequest } from '../APIs/apiUtils';
import { toast } from 'vue-sonner';

export const useAuthStore = defineStore('authStore', () => {
    // Dependencies
    const apiStore = useApiStore();
    const router = useRouter();

    // State
    const user = ref(null);
    const token = ref('');
    const loading = ref(false);
    const otpToken = ref('');
    const otpExpiry = ref(0);

    // Computed
    const isLoggedIn = computed(() => !!token.value);

    // Initialize store from localStorage
    const initAuth = () => {
        if (import.meta.client) {
            // Try localStorage first
            const savedToken = localStorage.getItem('auth_token');
            const savedUser = localStorage.getItem('auth_user');

            if (savedToken) token.value = savedToken;
            if (savedUser) user.value = JSON.parse(savedUser);
        }

        // Also check for cookie (works on both client and server)
        const authCookie = useCookie('auth_token');
        if (authCookie.value && !token.value) {
            token.value = authCookie.value;
        }
    }

    // Request OTP for login
    const requestOTP = async (phone: string) => {
        loading.value = true;

        try {
            const { data, error } = await apiRequest(
                apiStore.endpoints.auth.otp.request(),
                {
                    method: 'POST',
                    body: { phone }
                }
            );

            if (error) {
                toast.error('خطا در ارسال کد تایید', {
                    description: error.message || 'لطفا دوباره تلاش کنید'
                });
                return false;
            }

            if (data) {
                otpToken.value = data.token;
                otpExpiry.value = Date.now() + (data.expires_in || 120) * 1000;
                toast.success('کد تایید ارسال شد', {
                    description: 'لطفا کد ارسال شده را وارد کنید'
                });
                return true;
            }
        } catch (err) {
            toast.error('خطا در ارسال کد تایید');
            console.error(err);
        } finally {
            loading.value = false;
        }

        return false;
    };

    const syncAuthState = async (): Promise<void> => {
        const authCookie = useCookie('auth_token');
        if (authCookie.value) {
            token.value = authCookie.value;
        }
    }

    // Verify OTP and complete login
    const verifyOTP = async (phone: string, code: string) => {
        loading.value = true;

        try {
            const { data, error } = await apiRequest(
                apiStore.endpoints.auth.otp.verify(),
                {
                    method: 'POST',
                    body: {
                        phone,
                        code,
                        token: otpToken.value
                    }
                }
            );

            if (error) {
                toast.error('خطا در تایید کد', {
                    description: error.message || 'کد وارد شده صحیح نمی‌باشد'
                });
                return false;
            }

            if (data?.token) {
                // Save auth data
                token.value = data.token;
                user.value = data.user;

                if (import.meta.client) {
                    localStorage.setItem('auth_token', data.token);
                    localStorage.setItem('auth_user', JSON.stringify(data.user));
                }

                toast.success('ورود موفقیت‌آمیز', {
                    description: 'به ایران سوییمرز خوش آمدید'
                });

                return true;
            }
        } catch (err) {
            toast.error('خطا در ورود به حساب کاربری');
            console.error(err);
        } finally {
            loading.value = false;
            otpToken.value = '';
            otpExpiry.value = 0;
        }

        return false;
    };

    // Logout user
    const logout = () => {
        user.value = null;
        token.value = '';

        if (import.meta.client) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
        }

        toast.success('خروج از حساب کاربری');
        router.push('/');
    };

    // Check if OTP is expired
    const isOtpExpired = computed(() => {
        return otpExpiry.value > 0 && Date.now() > otpExpiry.value;
    });

    // Initialize on store creation (for client-side only)
    if (import.meta.client) {
        initAuth();
    }



    return {
        // State
        user,
        token,
        loading,
        otpToken,
        otpExpiry,

        // Computed
        isLoggedIn,
        isOtpExpired,

        // Actions
        requestOTP,
        verifyOTP,
        logout,
        initAuth,
        syncAuthState
    };
});