<script setup lang="ts">
import {useHomeStore} from "~/stores/homeStore";

const homeStore = useHomeStore();
</script>

<template>
  <section v-if="homeStore.onSaleCarousel.products?.length" class="irsm-container mb-20" dir="rtl">
    <HomeSectionHeader :title="homeStore.onSaleCarousel.title"/>

    <div class="flex gap-4">
      <img
          :src="'/images/home-banners/banner-on-sale.webp'"
          class="h-full w-[30%] object-contain"
          loading="lazy"/>


      <div class="flex flex-col w-[calc(69%)] gap-4 h-auto justify-between">
        <ProductCarousel :products="homeStore.onSaleCarousel?.products" product-card-variant="secondary" dir="rtl"
                         class="h-full"
                         carousel-item-class="basis-1/2 lg:basis-1/4 xl:basis-[23.80%]"/>
        <img
            :src="'/images/home-banners/banner-1.webp'"
            class="h-auto w-full object-contain"
            loading="lazy"/>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>