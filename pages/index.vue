<script setup>
import { HomeSectionSpecialProducts } from '#components';
import {useHomeStore} from '~/stores/homeStore';

const homeStore = useHomeStore();

onMounted(async () => {
  await homeStore.fetchHomeData();
});

const productTabs = computed(() => [
  {
    id: 'new',
    title: 'محصولات جدید',
    products: homeStore.carousel1?.products || [],
    all: homeStore.carousel1?.all
  },
  {
    id: 'bestseller',
    title: 'پرفروش‌ها',
    products: homeStore.carousel2?.products || [],
    all: homeStore.carousel2?.all
  },
  {
    id: 'popular',
    title: 'محبوب‌ترین‌ها',
    products: homeStore.carousel3?.products || [],
    all: homeStore.carousel3?.all
  }
]);
</script>

<template>
  <div>
    <section class="irsm-container mb-24">
      <HomeSlider dir="rtl"/>
    </section>
    <section class="irsm-container mb-24">
      <HomeCategories/>
    </section>

    <home-section-on-sale :carousel="homeStore.onSaleCarousel"/>


     <HomeSectionSpecialProducts :carousel="homeStore.carousel1" banner="/images/home-banners/swim-glasses.webp" variant="primary"/>

    <HomeSectionTabProducts
        :tabs="productTabs"
        banner="/images/home-banners/banner-5.webp"
        banner-alt="محصولات جدید" />

    <HomeSectionBannerOnRight :carousel="homeStore.carousel5"
    banner-mobile="/images/home-banners/banner-6-mobile.webp"
    banner="/images/home-banners/banner-6.webp"/>

    <HomeSectionSpecialProducts :carousel="homeStore.carousel5" banner="/images/home-banners/image-on-right.webp" variant="secondary"/>

    <HomeSectionBannerOnRight :carousel="homeStore.carousel2" banner="/images/home-banners/banner-9.webp"/>

    <HomeSectionGrid :grid="homeStore.carousel2" banner="/images/home-banners/grid-banner.webp"/>
  </div>

</template>