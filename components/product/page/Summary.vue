<script setup>
import {computed, ref, onMounted, watch} from "vue";
import {useProductStore} from "~/stores/product";

const productStore = useProductStore();
const linkAndHtml = computed(() => productStore.getLinkAndHtml());
const isExpanded = ref(false);
const hasMoreItems = ref(false);
const contentRef = ref(null);
const contentHeight = ref('auto');
const collapsedHeight = ref('110px'); // Default collapsed height

// Parse and process the HTML content
const processedHtml = computed(() => {
  return linkAndHtml.value.html || '';
});

onMounted(() => {
  // Check if content needs the expander
  if (contentRef.value) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = processedHtml.value;
    const items = tempDiv.querySelectorAll('li');
    hasMoreItems.value = items.length > 4;

    // Set initial height
    updateHeight();
  }
});

const updateHeight = () => {
  if (!contentRef.value) return;

  if (isExpanded.value) {
    // Get the full height when expanded
    contentRef.value.style.height = 'auto';
    contentHeight.value = `${contentRef.value.scrollHeight}px`;
    contentRef.value.style.height = contentHeight.value;
  } else {
    // Measure the full height first to enable animation
    contentRef.value.style.height = 'auto';
    const fullHeight = contentRef.value.scrollHeight;

    // Force collapsed height
    contentRef.value.style.height = collapsedHeight.value;
  }
};

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;

  // Update height after state change
  nextTick(() => {
    if (isExpanded.value) {
      contentRef.value.style.height = `${contentRef.value.scrollHeight}px`;
    } else {
      contentRef.value.style.height = collapsedHeight.value;
    }
  });
};

// Watch for content changes
watch(() => processedHtml.value, updateHeight);
</script>

<template>
  <div class="summary-information w-full mb-4">
    <h5 class="heading-6 mb-4">
      مشخصات محصول
    </h5>
    <div class="brand-item flex items-center w-full">
      <div class="flex-1 flex items-center gap-2">
        <h6 class="body-3 font-medium">
          برند
        </h6>
      </div>
      <div class="body-4 flex-1">
        <Button class="py-0 px-0 h-fit" variant="link">
          {{ productStore.productData?.brand?.name }}
        </Button>
      </div>
    </div>

    <div
        ref="contentRef"
        class="summary-content"
        :class="{'is-expanded': isExpanded}"
    >
      <div v-html="processedHtml" class="summary-information"></div>
    </div>

    <Button
        v-if="hasMoreItems"
        @click="toggleExpand"
        variant="ghost"
        class="w-full justify-start mt-4 text-sm text-secondary hover:text-secondary hover:bg-secondary/5 cursor-pointer"
    >
      {{ isExpanded ? 'نمایش کمتر' : 'نمایش بیشتر' }}
      <Icon name="hugeicons:arrow-down-01"
            :class="isExpanded ? 'rotate-180' : ''"
            class="mr-1 transition-transform duration-300"/>
    </Button>
  </div>
</template>

<style>
@import "tailwindcss";
@import "assets/css/main.css";

.summary-information {
  @apply flex flex-col;

  & li, .brand-item {
    display: flex;
    @apply flex flex-row items-center justify-start text-foreground border-b border-b-border pb-2 px-1 last:pb-0 last:border-0 mb-2 last:mb-0;
    font-size: var(--fluid-body-3) !important;
    font-family: var(--font-fa-num);

    &:before {
      @apply leading-none pt-0.5 ml-2;
      content: url("data:image/svg+xml,%3Csvg width='18px' height='18px' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.2667 13.6714C21.4855 17.5776 18.5402 21.2558 14.4074 22.0776C12.3917 22.4791 10.3008 22.2343 8.43237 21.3783C6.56392 20.5222 5.01318 19.0985 4.00095 17.3098C2.98872 15.5211 2.56661 13.4587 2.79472 11.4162C3.02283 9.37368 3.88954 7.45519 5.27143 5.9339C8.1058 2.81202 12.8917 1.95265 16.798 3.51515' stroke='%2342BD3F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.98584 12.1083L12.8921 16.0145L22.2671 5.85828' stroke='%2342BD3F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    }
  }
}

.summary-content {
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  height: 100px; /* Initial collapsed height */
}

.summary-content.is-expanded {
  height: auto;
}
</style>