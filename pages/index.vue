<script setup>
import {useApiStore} from '~/stores/APIs';
import {Toaster} from '@/components/ui/sonner'

const apiStore = useApiStore();

</script>

<template>
  <HomeSlider class="irsm-container mb-20"/>
  <HomeCategories class="irsm-container mb-20"/>
</template>