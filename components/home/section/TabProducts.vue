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
  banner: {
    type: String,
    default: '/images/home-banners/banner-5.webp',
  },
  bannerAlt: {
    type: String,
    default: 'Banner image',
  }
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
</script>

<template>
  <section class="irsm-container mb-24" dir="rtl">

    <div class="flex gap-4">
      <!-- Banner Image -->
      <Banner
          :src="banner"
          :alt="bannerAlt"
          variant="primary"
      />


      <!-- Tab Content -->
      <div class="flex flex-col w-[74%] xl:w-[80%] 2xl:w-[82%]">
        <!-- Tab Navigation -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex gap-2 items-center">
            <template v-for="(tab, index) in tabs" :key="index">
              <Button
                  size="sm"
                  :variant="activeTabId === tab.id ? 'default' : 'ghost'"
                  @click="setActiveTab(tab.id)">
                {{ tab.title }}
              </Button>
              <span v-if="index < tabs.length - 1" class="h-5 w-[1px] bg-border"/>
            </template>
          </div>

          <Button v-if="getActiveTab?.all" variant="link" :to="getActiveTab.all" class="pl-0">
            مشاهده همه {{ getActiveTitle }}
            <Icon name="heroicons:arrow-left" class="ms-1"/>
          </Button>
        </div>

        <!-- Active Tab Carousel -->
        <template v-if="getActiveTab">
          <ProductCarousel
              :products="getActiveTab.products"
              class="h-full"
              carousel-item-class="basis-1/2 md:basis-[26.5%] lg:basis-[24.5%] xl:basis-[auto]"/>
        </template>
      </div>

    </div>
  </section>
</template>