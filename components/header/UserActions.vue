<script setup lang="ts">
import MenuMobile from '~/components/menu/mobile/index.vue'
import { useAuthStore } from '~/stores/user/authStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'


const { isMobile } = useDeviceDetection()
const isMenuOpen = ref(false)
const authStore = useAuthStore()

onMounted(() => {
  authStore.syncAuthState()
})

const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleMenuClose = () => {
  isMenuOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
}
</script>

<template>
  <div class="flex gap-2 min-w-[10%] justify-between md:justify-end w-full md:w-min">
    <!-- Show profile button when logged in, login button when not -->
    <Button
        v-if="!authStore.isLoggedIn"
        :size="!isMobile ? 'lg' : 'icon-lg'"
        :variant="!isMobile ? 'default' : 'ghost'"
        to="/user/login"
        class="hidden lg:flex">
      <Icon name="hugeicons:login-02" class="text-2xl"/>
      <span class="hidden lg:block">ورود / ثبت نام</span>
    </Button>

    <DropdownMenu dir="rtl"  v-else>
      <DropdownMenuTrigger as-child>
        <Button :size="isMobile ? 'icon-lg' : 'lg'" variant="ghost" class="hidden lg:flex">
          <Icon name="hugeicons:user" class="text-2xl"/>
          <span class="hidden lg:block truncate max-w-32">{{ authStore.user?.name || 'حساب کاربری' }}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
          align="start"
          position-strategy="absolute" class="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name="hugeicons:user-sharing" class="text-lg ml-2"/>
            <span>حساب کاربری</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="hugeicons:shopping-basket-01" class="text-lg ml-2"/>
            <span>سفارشات</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="hugeicons:favourite" class="text-lg ml-2"/>
            <span>لیست علاقمندی</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="hugeicons:location-01" class="text-lg ml-2"/>
            <span>مدیریت آدرس</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" @click="handleLogout">
          <Icon name="hugeicons:logout-01" class="text-lg ml-2"/>
          <span> خروج </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Button
        class="md:hidden"
        size="icon-lg"
        variant="ghost"
        @click="toggleMobileMenu">
      <Icon name="hugeicons:menu-01" class="text-2xl"/>
    </Button>

    <Button variant="ghost" size="icon-lg" class="flex">
      <Icon name="heroicons:shopping-cart" class="text-2xl"/>
    </Button>
  </div>

  <MenuMobile :open="isMenuOpen" @close="handleMenuClose" />
</template>