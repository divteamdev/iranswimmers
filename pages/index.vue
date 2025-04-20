<script setup>
import {HomeSectionSpecialProducts} from '#components';
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
      <HomeSlider dir="rtl" :isLoading="homeStore.isLoading"/>
    </section>
    <section class="irsm-container mb-24">
      <HomeCategories :is-loading="homeStore.isLoading" />
    </section>

    <home-section-on-sale
        :is-loading="homeStore.isLoading"
        :carousel="homeStore.onSaleCarousel"/>


    <HomeSectionSpecialProducts :carousel="homeStore.carousel1" :isLoading="homeStore.isLoading"
                                banner="/images/home-banners/swim-glasses.webp" variant="primary"/>

    <HomeSectionTabProducts
        :tabs="productTabs"
        :isLoading="homeStore.isLoading"
        banner="/images/home-banners/banner-5.webp"
        banner-alt="محصولات جدید"/>

    <HomeSectionBannerOnRight
        :isLoading="homeStore.isLoading"
        :carousel="homeStore.carousel5"
        banner-mobile="/images/home-banners/banner-6-mobile.webp"
        banner="/images/home-banners/banner-6.webp"/>

    <HomeSectionSpecialProducts
        :isLoading="homeStore.isLoading"
        :carousel="homeStore.carousel5" banner="/images/home-banners/image-on-right.webp"
        variant="secondary"/>

    <HomeSectionBannerOnRight
        :isLoading="homeStore.isLoading"
        :carousel="homeStore.carousel2" banner="/images/home-banners/banner-9.webp"/>

    <HomeSectionGrid
        :isLoading="homeStore.isLoading"
        :grid="homeStore.carousel2" banner="/images/home-banners/grid-banner.webp"/>
  </div>

</template>