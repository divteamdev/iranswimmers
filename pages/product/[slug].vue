<script setup lang="ts">
import {useRoute} from 'vue-router';
import {onMounted, computed, ref} from 'vue';
import {useProductStore} from '~/stores/product';
import {calculateDiscountPercentage} from '~/helpers/productUtils';
import {convertImageUrl} from "~/helpers/imageUtils";
import {formatPrice} from "~/helpers/priceUtils";
import {Badge} from "~/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "~/components/ui/breadcrumb";

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const productStore = useProductStore();
const {
  productData,
  groupedAttributes,
  isLoading,
  error,
  productPrice,
  productSalePrice,
  selectedVariation,
  selectedVariationId,
  addToCartDisabled
} = storeToRefs(productStore);

const quantity = ref(1);
const selectedAttributes = ref<Record<string, string>>({});

// Fetch product data when component mounts
onMounted(async () => {
  if (slug.value) {
    await productStore.fetchProduct(slug.value);
    await productStore.fetchRelatedProducts(slug.value);
  }
});

// Calculate discount percentage if there's a sale price
const discountPercentage = computed(() => {
  if (productSalePrice.value) {
    return calculateDiscountPercentage(productPrice.value, productSalePrice.value);
  }
  return 0;
});

// Handle attribute selection
const selectAttribute = async (typeId: string | number, slug: string) => {
  // Update selected attributes
  selectedAttributes.value = {
    ...selectedAttributes.value,
    [typeId]: slug
  };

  // Find matching variation
  if (Object.keys(selectedAttributes.value).length === groupedAttributes.value.length) {
    await productStore.findVariationId(selectedAttributes.value);
  }

  // Update in-stock attributes
  productStore.checkInStockWithSelectedAttribute(slug);
};

// Check if attribute is selected
const isAttributeSelected = (typeId: string | number, slug: string): boolean => {
  return selectedAttributes.value[typeId] === slug;
};

// Check if attribute is in stock
const isAttributeInStock = (slug: string): boolean => {
  return productStore.inStockAttributes.includes(slug);
};

// Increase quantity
const increaseQuantity = () => {
  // Use optional chaining for both properties and provide a fallback
  const maxQuantity = selectedVariation.value?.stock_quantity ||
      (productData.value as any).stock_quantity ||
      10;

  if (quantity.value < maxQuantity) {
    quantity.value++;
  }
};

// Decrease quantity
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};


const breadcrumbs = computed(() => {
  // Return empty array if breadCrumb doesn't exist yet
  if (!productStore.breadCrumb || !Array.isArray(productStore.breadCrumb)) {
    return [];
  }

  return productStore.breadCrumb.map((item, index, array) => {
    let slug = '';
    // Check that item.url exists and is a string before using includes
    if (item?.url && typeof item.url === 'string' && item.url.includes('category')) {
      let urlSegments = item.url.split('/');
      slug = urlSegments[urlSegments.length - 1];
    }

    // Use optional chaining and provide defaults
    let href = item?.url || '';
    let title = item?.text || '';

    if (index === 0 && href === '/') {
      href = '/shop';
      title = 'فروشگاه';
    }

    if (href && typeof href === 'string' && href.includes('category')) {
      href = `/product-category/${slug}`;
    }

    return {
      title,
      href,
      slug,
      disabled: index === array.length - 1
    };
  });
});

// Add to cart
const addToCart = () => {
  if (selectedVariation.value) {
    productStore.getReadyToAddCart(selectedVariation.value, quantity.value);
    // Here you would dispatch an action to add the item to cart
    // e.g., cartStore.addItem(productStore.readyToAddCart);
  }
};

const productSku = computed(() => {
  return selectedVariation.value?.sku || productData.value?.sku || '';
});
</script>

<template>
  <div dir="rtl" class="">
    <div v-if="isLoading">در حال بارگذاری...</div>
    <div v-else-if="error">خطا در بارگذاری محصول</div>
    <div v-else class="product-page">
      <!-- Breadcrumbs and Actions -->
      <div class="flex flex-col lg:flex-row items-center justify-between w-full mb-4 md:mb-8 border-b border-b-border">
        <div class="irsm-container w-full pb-8">
          <BaseBreadcrumb :items="productStore.breadCrumb"/>

          <div class="flex product-actions">
            <!-- Product actions can be added here -->
          </div>
        </div>

      </div>

      <div class="flex flex-col md:flex-row w-full gap-4 mb-16 md:mb-8 irsm-container relative">
        <!-- Product Gallery -->
        <ProductPageGallery
            class="md:sticky md:top-24"
            :images="productStore.images"
        />

        <div class="grow flex flex-col gap-16 lg:flex-row justify-between pt-6 md:pt-8 md:pb-8 md:px-8 md:border md:border-border rounded-xl h-auto">
          <div class="flex flex-col items-start justify-between gap-8 md:gap-4">
            <div class="flex flex-col gap-6 w-full">
              <h1 class="heading-5 md:heading-3">
                {{ productData.name }}
              </h1>

              <div
                  class="border-t-border mb-4 border-t w-full flex gap-2 pt-2.5 [&_div]:border-l [&_div]:border-l-border [&_div]:last:border-0 [&_span]:flex [&_span]:items-center [&_span]:gap-1">
                <div class="body-4 pl-2">
                  <span>
                    <Icon name="line-md:star-alt-filled" class="text-warning mb-1"/>
                  {{ productData.average_rating }} از 5
                  </span>
                </div>
                <div class="pl-2">
                  <span v-if="productData?.rating_count && productData.rating_count > 0" class="body-4">
                    {{ productData.rating_count }}
                  </span>
                  <span v-else class="body-4">
                    <span class="text-muted-foreground">بدون نظر</span>
                  </span>
                </div>
                <div v-if="productSku" class="flex items-center gap-1">
                  <span class="text-muted-foreground body-4">کد محصول:</span>
                  <span class="body-4">{{ productSku }}</span>
                </div>

              </div>

              <div class="flex flex-col-reverse">
                <!-- Render each attribute group -->
                <div
                    v-for="group in groupedAttributes"
                    :key="group.type_id"
                    class="flex flex-col gap-2 mt-4 last:mt-0"
                >
                  <span class="font-medium body-3">{{ group.type }}:</span>
                  <div class="flex flex-wrap gap-2">
                    <!-- Render individual attributes -->
                    <Button
                        variant="outline"
                        v-for="attr in group.attributes"
                        :key="attr.slug"
                        @click="selectAttribute(group.type_id, attr.slug)"
                        :class="{
                      'cursor-pointer border border-border rounded-md p-2 body-3 h-auto': true,
                      'border-primary': isAttributeSelected(group.type_id, attr.slug),
                      'opacity-40': !isAttributeInStock(attr.slug)
                    }"
                    >
                      <!-- Show image for attributes with images (like colors) -->
                      <div v-if="attr.options?.image_path" class="flex flex-col items-center">
                        <img
                            :src="convertImageUrl(attr.options.image_path)"
                            :alt="attr.options.image_alt || attr.slug"
                            class="w-10 h-10 object-cover rounded-md"
                        />
                        <span class="text-sm mt-1">{{ attr.name || attr.value }}</span>
                      </div>
                      <!-- Text-only attributes -->
                      <span v-else>{{ attr.name || attr.slug }}</span>
                    </Button>
                  </div>
                </div>
              </div>

            </div>

            <div class="flex flex-col items-start justify-start w-full">
              <!-- Price and Discount -->
              <div class="product-price my-4">
                <div v-if="productPrice > 0" class="flex items-center gap-4 body-1">
                  <span v-if="productSalePrice" class="line-through text-muted-foreground body-3">
                    {{ formatPrice(productPrice) }} تومان
                  </span>
                  <span :class="productSalePrice ? 'text-success' : 'text-foreground'">
                    {{ formatPrice(productSalePrice || productPrice) }} تومان
                  </span>
                  <Badge
                      v-if="discountPercentage > 0"
                      variant="secondary"
                      class="py-1"
                  >
                    {{ discountPercentage }}٪ تخفیف
                  </Badge>
                </div>
                <div v-else-if="productPrice === -1" class="text-muted-foreground body-2">
                  قیمت‌ها از {{ formatPrice(productData.variations?.[0]?.price || 0) }} تومان
                </div>
                <div v-else class="text-destructive body-2">
                  ناموجود
                </div>
              </div>

              <!-- Add to Cart Section -->
              <div class="flex gap-4 mt-4 flex-wrap w-full">
                <div class="flex gap-4 flex-wrap grow md:grow-0">
                  <div class="product-counter flex items-center rounded-md">
                    <Button
                        variant="outline"
                        size="icon"
                        @click="increaseQuantity"
                        class="border-border"
                    >
                      <Icon name="hugeicons:plus-sign"/>
                    </Button>
                    <span class="flex justify-center items-center body-2 min-w-12">{{ quantity }}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        @click="decreaseQuantity"
                        class="border-border"
                    >
                      <Icon name="hugeicons:minus-sign"/>
                    </Button>
                  </div>
                  <div class="product-add grow">
                    <Button
                        class="w-full md:w-fit"
                        @click="addToCart"
                        :disabled="addToCartDisabled || !selectedVariationId"
                    >
                      <Icon name="hugeicons:plus-sign"/>
                      افزودن به سبد خرید
                    </Button>
                  </div>
                </div>

                <Button variant="destructive" class="bg-destructive/10 text-destructive hover:bg-destructive/15 flex-1 md:flex-0">
                  قیمت مناسب‌تری سراغ داری؟
                </Button>
              </div>
            </div>

          </div>
          <div class="flex flex-col items-start justify-between w-full lg:max-w-sm">
            <ProductPageSummary/>
            <ProductPageWebFeatures/>
          </div>

        </div>
      </div>


      <section class="irsm-container mb-16 md:mb-8">
        <h2 class="heading-5 mb-4">توضیحات محصول</h2>
        <!-- Product Description -->
        <div class="prose max-w-none rounded-xl border border-border p-4 lg:p-8" v-if="productData.description">
          <div class="body-3 product-page-description" v-html="productData.description"></div>
        </div>
      </section>


      <!-- Related Products (Could be implemented as a separate component) -->
      <section v-if="productStore.relatedProducts.length > 0" class="mb-16 md:mb-0 irsm-container">
        <h2 class="heading-5 mb-4">محصولات مرتبط</h2>
        <!-- Related products list could go here -->
        <ProductCarousel carousel-item-class="basis-auto" :products="productStore.relatedProducts" :loop="false"/>
      </section>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";
@import "assets/css/main.css";
@import "assets/css/typography.css";

.product-page-description {
  @apply gap-2 leading-relaxed;

  & h1 {
    @apply text-secondary font-semibold mb-4;
    font-size: var(--fluid-h4) !important;
  }

  & h3 {
    @apply text-secondary font-semibold mb-3;
    font-size: var(--fluid-h5) !important;
  }

  & a {
    @apply underline text-primary;
    font-size: var(--fluid-body-3) !important;
  }

  & p {
    @apply mt-3 mb-4;
  }

  & ul {
    @apply mt-3 mb-4;

    & li {
      @apply flex flex-row gap-2 items-center justify-start text-muted-foreground mr-4;
      @apply list-disc list-inside list-item;
      font-size: 14px !important;
    }
  }


}
</style>

<style scoped>
/* No additional styles needed as requested */
</style>