<script setup lang="ts">
const { isMobile } = useDeviceDetection()
</script>

<template>
  <div class="flex gap-2 min-w-[10%] justify-between md:justify-end w-full md:w-min">
    <Button 
      :size="isMobile ? 'icon-lg' : 'lg'"
      :variant="isMobile ? 'ghost' : 'default'"
      class="hidden lg:flex">
      <Icon name="hugeicons:login-02" class="text-2xl"/>
      <span class="hidden lg:block">ورود / ثبت نام</span>
    </Button>

    <Button 
      class="md:hidden" 
      size="icon-lg" 
      variant="ghost">
      <Icon name="hugeicons:menu-01" class="text-2xl"/>
    </Button>

    <Button variant="ghost" size="icon-lg" class="flex">
      <Icon name="heroicons:shopping-cart" class="text-2xl"/>
    </Button>
  </div>
</template> 