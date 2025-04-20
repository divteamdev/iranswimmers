<script setup lang="ts">
import {ref, computed} from 'vue';

interface ProductTab {
  id: string;
  title: string;
  products: any[];
  all?: string;
}

const props = defineProps({
  tabs: {
    type: Array as () => ProductTab[],
    required: true,
    default: () => [],
    validator: (value: ProductTab[]) => {
      return value.every(tab =>
          tab.id &&
          tab.title &&
          tab.products &&
          Array.isArray(tab.products) &&
          tab.all !== undefined
      );
    }
  },
  isLoading: {
    type: Boolean,
  },
  banner: {
    type: String,
    default: '/images/home-banners/banner-5.webp',
  },
  bannerAlt: {
    type: String,
    default: 'Banner image',
  },
  bannerMobile: {
    type: String,
    default: '/images/home-banners/banner-5-mobile.webp',
  },
  bannerMobileAlt: {
    type: String,
    default: 'Banner image',
  },
});

const activeTabId = ref<string | null>(props.tabs.length > 0 ? props.tabs[0]?.id : null);

const setActiveTab = (tabId: string): void => {
  activeTabId.value = tabId;
};

const getActiveTab = computed((): ProductTab | null => {
  return props.tabs.find(tab => tab.id === activeTabId.value) || null;
});

const getActiveTitle = computed((): string => {
  return props.tabs.find(tab => tab.id === activeTabId.value)?.title || '';
});

// Track image loading state
const isBannerLoaded = ref(false);
const handleBannerLoaded = (): void => {
  isBannerLoaded.value = true;
};

const {isMobile} = useDeviceDetection();
</script>

<template>
  <section class="irsm-container mb-24" dir="rtl">

    <div class="flex gap-4 h-auto md:max-h-full">

      <div class="w-full h-auto hidden md:block">
        <!-- Banner Image -->
        <Banner :src="banner" :alt="bannerAlt" variant="primary" container-class="w-full h-full"
                image-class="w-full h-full object-cover"/>
      </div>


      <!-- Tab Content -->
      <div class="flex flex-col w-full md:w-[75%] lg:w-[80%] 2xl:w-[85%]">
        <!-- Tab Navigation -->
        <div class="flex items-center justify-between mb-4 md:mb-6 flex-col md:flex-row">
          <div class="flex gap-2 items-center justify-start w-full mb-4 md:mb-0">
            <template v-for="(tab, index) in tabs" :key="index">
              <Button size="sm" :variant="activeTabId === tab.id ? 'default' : 'ghost'" @click="setActiveTab(tab.id)">
                {{ tab.title }}
              </Button>
              <span v-if="index < tabs.length - 1" class="h-5 w-[1px] bg-border"/>
            </template>
          </div>

          <div class="flex items-center justify-between w-full md:justify-end">
            <h3 class="heading-6 md:hidden">{{ getActiveTitle }}</h3>
            <Button v-if="getActiveTab?.all" variant="link" :to="getActiveTab.all" class="pl-0" size="sm">
              مشاهده همه {{ getActiveTitle }}
              <Icon name="heroicons:arrow-left" class="ms-1"/>
            </Button>
          </div>


        </div>

        <!-- Active Tab Carousel -->
        <template v-if="getActiveTab">
          <ProductCarousel
              :isLoading="isLoading"
              :products="getActiveTab.products" :loop="false" class="min-h-[310px] h-full"
              carousel-item-class="basis-auto md:basis-[26.5%] lg:basis-[24.5%] xl:basis-[auto]">
            <template v-if="isMobile" #banner-placeholder>
              <Banner :src="bannerMobile" :alt="bannerMobileAlt" variant="primary"
                      container-class="w-full h-full basis-auto min-w-[140px] ml-4"
                      image-class="w-full h-full object-cover"/>
            </template>
          </ProductCarousel>
        </template>
      </div>

    </div>
  </section>
</template>