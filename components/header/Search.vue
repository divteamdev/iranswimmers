<script setup lang="ts">
import { Input } from "~/components/ui/input";
import { useSearch } from '~/composables/useSearch';
import Search from '~/components/search/index.vue'
import { Button } from '~/components/ui/button';
import { computed } from 'vue';

const { isMobile } = useDeviceDetection()
const { searchQuery, handleInputFocus, handleInputBlur, handleButtonClick, isActive } = useSearch()
const isSearchActive = computed(() => isActive.value)
</script>

<template>
  <div class="flex relative">
    <!-- Only show input on desktop -->
    <Input v-if="!isMobile" type="text" placeholder=" مدویو، عینک شنا، جمر،مایو اقتصادی و ... "
      class="grow h-10 md:h-12 rounded-l-none rounded-r-xl bg-muted md:bg-muted/50" v-model="searchQuery"
      @focus="handleInputFocus" @blur="handleInputBlur" :class="{ 'ring-2 ring-primary': isSearchActive }" />


    <div v-if="isMobile" class="h-10 w-full bg-muted/50 rounded-r-xl flex items-center px-4 border-border border"
      @click="handleInputFocus">
      <span class="text-sm text-muted-foreground body-4"> مدویو، عینک شنا، جمر،مایو اقتصادی و ...</span>
    </div>
    <Button variant="default" :size="isMobile ? 'icon' : 'icon-lg'" :class="['rounded-r-none h-10 w-10 md:h-12 md:w-12']">
      <Icon name="hugeicons:search-01" class="text-primary-foreground text-2xl" />
    </Button>

    <Search />
  </div>
</template>

<style scoped></style>