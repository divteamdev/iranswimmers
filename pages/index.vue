<script setup>
import {useHomeStore} from '~/stores/homeStore';

const homeStore = useHomeStore();

onMounted(async () => {
  await homeStore.fetchHomeData();
});
</script>

<template>
  <div>
    <section class="irsm-container mb-20">
      <HomeSlider dir="rtl"/>
    </section>
    <section class="irsm-container mb-20">
      <HomeCategories/>
    </section>

    <home-section-on-sale/>

    <HomeSectionFullCarousel :carousel="homeStore.carousel1" banner="/images/home-banners/banner-5.webp"/>

    <HomeSectionFullCarousel :carousel="homeStore.carousel5" banner="/images/home-banners/banner-6.webp"/>

    <HomeSectionFullCarousel :carousel="homeStore.carousel2" banner="/images/home-banners/banner-9.webp"/>

    <!-- Third Carousel -->
    <section v-if="homeStore.carousel3.products?.length" class="irsm-container mb-20" dir="rtl">
      <HomeSectionHeader :title="homeStore.carousel3.title" title-class="heading-5"
                         :show-more-link="homeStore.carousel3.all"/>
      <ProductCarousel :products="homeStore.carousel3.products"/>
    </section>

  </div>

</template>