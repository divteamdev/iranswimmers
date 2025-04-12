<script setup lang="ts">
import {Input} from "~/components/ui/input";
import { useRouter } from 'vue-router';

const { isMobile } = useDeviceDetection()
const router = useRouter()

const handleSearch = () => {
  router.push('#search')
}
</script>

<template>
  <div class="flex">
    <Input 
      type="text" 
      placeholder=" مدویو، عینک شنا، جمر،مایو اقتصادی و ... " 
      class="grow h-10 md:h-12 rounded-l-none rounded-r-xl bg-muted md:bg-background"
      @click="handleSearch"
    />
    <Button 
      variant="default" 
      :size="isMobile ? 'icon' : 'icon-lg'" 
      class="rounded-r-none h-10 w-10 md:h-12 md:w-12"
      @click="handleSearch"
    >
      <Icon name="hugeicons:search-01" class="text-primary-foreground text-2xl"/>
    </Button>
  </div>
</template>

<style scoped>

</style>