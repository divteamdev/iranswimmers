<script setup lang="ts">
import { useAuthStore } from '@/stores/user/authStore';
import { toast } from 'vue-sonner';
import { PinInput, PinInputGroup } from "~/components/ui/pin-input";
import { PinInputInput } from "reka-ui";

definePageMeta({
  layout: 'user',
})

const authStore = useAuthStore();
const mobile = ref('');
const otpCode = ref<string[]>([]);
const showOtpInput = ref(false);
const loading = ref(false);

// First step: Request OTP and show input
const handleRequestOTP = async () => {
  if (!mobile.value) {
    toast.error('شماره همراه را وارد کنید');
    return;
  }

  // Validate mobile format
  const mobileRegex = /^09[0-9]{9}$/;
  if (!mobileRegex.test(mobile.value)) {
    toast.error('شماره همراه نامعتبر است', {
      description: 'شماره همراه باید با ۰۹ شروع شود و ۱۱ رقم باشد'
    });
    return;
  }

  loading.value = true;

  try {
    // Make API call but don't wait for response
    authStore.requestOTP(mobile.value);

    // Show OTP input immediately
    showOtpInput.value = true;
    toast.info('کد تایید ارسال شد', {
      description: 'لطفا کد دریافتی را وارد کنید'
    });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

// Second step: Verify OTP and set cookies
const handleVerifyOTP = async () => {
  if (!otpCode.value || otpCode.value.filter(Boolean).length < 6) {
    toast.error('کد تایید را کامل وارد کنید');
    return;
  }

  loading.value = true;

  try {
    // Convert array to string for the API call
    const otpString = otpCode.value.join('');

    // Make API call (don't wait for response)
    authStore.verifyOTP(mobile.value, otpString);

    // Set fake token in cookie (for middleware)
    const authCookie = useCookie('auth_token', {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });
    authCookie.value = `fake_token_${Date.now()}`;

    // Create fake user data
    const fakeUser = {
      id: Date.now(),
      name: 'کاربر موقت',
      phone: mobile.value,
      email: null
    };

    // Manually set auth data in store and localStorage
    if (process.client) {
      localStorage.setItem('auth_token', authCookie.value);
      localStorage.setItem('auth_user', JSON.stringify(fakeUser));

      // Update store values directly
      authStore.token = authCookie.value;
      authStore.user = fakeUser;
    }

    toast.success('ورود موفقیت‌آمیز');
    navigateTo('/');
  } catch (error) {
    console.error(error);
    toast.error('خطا در ورود به حساب کاربری');
  } finally {
    loading.value = false;
  }
}

// Handle form submission
const handleSubmit = () => {
  if (!showOtpInput.value) {
    handleRequestOTP();
  } else {
    handleVerifyOTP();
  }
}
</script>

<template>
  <div dir="rtl" class="w-full max-w-md">
    <Button variant="ghost" size="sm" to="/" class="mb-2">
      <Icon name="hugeicons:arrow-right-02" class="text-2xl"/>
      بازگشت
    </Button>

    <div class="w-full p-6 rounded-xl justify-between flex flex-col border border-border">
      <div class="login-header w-full mb-6">
        <img
            class="max-w-18"
            src="/images/logo.png"
            alt="iranswimmers - logo"
            loading="lazy"
        />
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-3 mb-6">
        <h1 class="heading-5 mb-3">{{ !showOtpInput ? 'ورود یا ثبت‌نام' : 'تایید کد یکبار مصرف' }}</h1>

        <div v-if="showOtpInput" class="flex flex-col justify-start items-start mb-2 body-4 text-muted-foreground w-full">
          <span>کد یکبار مصرف به همراه {{ mobile }} ارسال شد</span>
          <div>
            <span>شماره اشتباه است؟</span>
            <Button variant="link" size="sm" class="px-0.5" @click="showOtpInput = false">
              <small class="text-xs">
                تغییر شماره
              </small>
            </Button>
          </div>
        </div>

        <div v-if="!showOtpInput">
          <Label for="mobile" class="mb-1.5 body-3">
            شماره همراه خود را وارد کنید
          </Label>
          <Input
              type="tel"
              size="lg"
              id="mobile"
              required
              class="w-full"
              placeholder="09121234567"
              v-model="mobile"
              convert-numbers
              rules="^09[0-9]{9}$"
              errorMessage="شماره همراه باید با ۰۹ شروع شود و ۱۱ رقم باشد"
          />
        </div>

        <div v-if="showOtpInput" class="mt-2">
          <PinInput
              id="pin-input"
              v-model="otpCode"
              placeholder="-"
          >
            <PinInputGroup class="gap-4 justify-center">
              <PinInputInput
                  v-for="(_, index) in 6"
                  :key="index"
                  :index="index"
                  class="w-auto h-10 aspect-square text-center font-fa-num border border-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none focus-visible:ring-primary/50 dark:focus-visible:ring-primary/50"
              />
            </PinInputGroup>
          </PinInput>
          <div class="flex justify-end mt-2">
            <Button
                variant="link"
                type="button"
                size="sm"
                :disabled="loading"
                @click="handleRequestOTP">
              ارسال مجدد کد
            </Button>
          </div>
        </div>

        <Button
            size="lg"
            type="submit"
            :loading="loading || authStore.loading">
          {{ !showOtpInput ? 'دریافت کد تایید' : 'ورود' }}
        </Button>
      </form>

      <small class="font-fa-num text-xs">
        ورود یا ثبت نام به منزله پذیرش
        <Button variant="link" size="sm" class="px-0.5">
          <small class="text-xs">
            قوانین ایرانسوییمرز
          </small>
        </Button>
        می‌باشد.
      </small>
    </div>
  </div>
</template>