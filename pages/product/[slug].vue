<script setup lang="ts">
import {useRoute} from 'vue-router';
import {onMounted, computed, ref} from 'vue';
import {useProductStore} from '~/stores/product';
import {calculateDiscountPercentage} from '~/helpers/productUtils';
import {convertImageUrl} from "~/helpers/imageUtils";
import {formatPrice} from "~/helpers/priceUtils";
import WebFeatures from "~/components/product/WebFeatures.vue";

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
  console.log(productStore.product)
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
  const maxQuantity = selectedVariation.value?.stock_quantity ||
      productData.value.stock_quantity ||
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

// Add to cart
const addToCart = () => {
  if (selectedVariation.value) {
    productStore.getReadyToAddCart(selectedVariation.value, quantity.value);
    // Here you would dispatch an action to add the item to cart
    // e.g., cartStore.addItem(productStore.readyToAddCart);
  }
};
</script>

<template>
  <div dir="rtl" class="irsm-container">
    <div v-if="isLoading">در حال بارگذاری...</div>
    <div v-else-if="error">خطا در بارگذاری محصول</div>
    <div v-else class="product-page">
      <!-- Breadcrumbs and Actions -->
      <div class="flex items-center justify-between w-full">
        <div class="bread-crumbs">
          <ul class="flex items-center space-x-2 space-x-reverse">
            <li v-for="(item, index) in productStore.breadCrumb" :key="index" class="flex items-center">
              <NuxtLink :to="item.url">{{ item.name }}</NuxtLink>
              <span v-if="index < productStore.breadCrumb.length - 1" class="mx-2">/</span>
            </li>
          </ul>
        </div>
        <div class="flex product-actions">
          <!-- Product actions can be added here -->
        </div>
      </div>

      <div class="flex w-full gap-4 mb-8">
        <!-- Product Gallery -->
        <ProductPageGallery :images="productStore.images" :main-image="productStore.mainImage"/>

        <div class="grow flex justify-between p-8 border border-border rounded-xl h-auto">
          <div class="flex flex-col items-start justify-between">
            <!-- Product Name -->
            <h1 class="heading-1">
              {{ productData.name }}
            </h1>

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

            <div class="flex flex-col items-start justify-start">
              <!-- Price and Discount -->
              <div class="product-price my-4 ">
                <div v-if="productPrice > 0" class="flex items-center gap-2 body-1">
                  <span v-if="productSalePrice" class="line-through text-muted-foreground">
                    {{ formatPrice(productPrice) }} تومان
                  </span>
                  <span>
                    {{ formatPrice(productSalePrice || productPrice) }} تومان
                  </span>
                  <span
                      v-if="discountPercentage > 0"
                      class="bg-secondary text-secondary px-2 py-0.5 rounded"
                  >
                    {{ discountPercentage }}٪ تخفیف
                  </span>
                </div>
                <div v-else-if="productPrice === -1" class="text-muted-foreground body-2">
                  قیمت‌ها از {{ formatPrice(productData.variations?.[0]?.price) }} تومان
                </div>
                <div v-else class="text-destructive body-2">
                  ناموجود
                </div>
              </div>

              <!-- Add to Cart Section -->
              <div class="flex gap-4 mt-4">
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
                <div class="product-add">
                  <Button
                      @click="addToCart"
                      :disabled="addToCartDisabled || !selectedVariationId"
                  >
                    <Icon name="hugeicons:plus-sign"/>
                    افزودن به سبد خرید
                  </Button>
                </div>
                <Button variant="destructive" class="bg-destructive/10 text-destructive hover:bg-destructive/15">
                  قیمت مناسب‌تری سراغ داری؟
                </Button>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-start justify-between max-w-sm">
            <ProductSummary/>
            <WebFeatures/>
          </div>

        </div>
      </div>


      <h2 class="heading-4 mb-4">توضیحات محصول</h2>
      <!-- Product Description -->
      <div class="prose max-w-none rounded-xl border border-border p-8" v-if="productData.description">
        <div class="body-3" v-html="productData.description"></div>
      </div>

      <!-- Related Products (Could be implemented as a separate component) -->
      <div v-if="productStore.relatedProducts.length > 0" class="mt-10">
        <h2 class="heading-4 mb-4">محصولات مرتبط</h2>
        <!-- Related products list could go here -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No additional styles needed as requested */
</style>