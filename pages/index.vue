<script setup>
import {useApiStore} from '~/stores/APIs';
import {Toaster} from '@/components/ui/sonner'

const apiStore = useApiStore();

</script>

<template>
  <HomeSlider class="irsm-container"/>
</template>