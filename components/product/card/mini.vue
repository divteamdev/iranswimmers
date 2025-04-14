<script lang="ts" setup>
import { formatPrice, formatPriceWithCurrency } from '~/helpers/priceUtils';
import { computed } from 'vue';

interface ProductMini {
  name: string;
  slug: string;
  price: string;
  sale_price: string | null;
  thumbnail: string | null;
  [key: string]: any;
}

// Create a valid record for the thumbnail
type ImageRecord = Record<string, any>;

const props = defineProps({
  product: {
    type: Object as () => ProductMini,
    required: true
  }
});

// Format the product thumbnail to match expected structure for ProductCardThumbnail
const formattedThumbnail = computed<ImageRecord | undefined>(() => {
  return props.product.thumbnail ? { path: props.product.thumbnail } : undefined;
});

// Check if product has a discount
const hasDiscount = computed(() => {
  return props.product.sale_price !== null && props.product.sale_price !== props.product.price;
});

// Handle card click
const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', props.product);
};
</script>

<template>
  <Card class="rounded-md cursor-pointer transition-colors p-2" @click="handleClick">
    <div class="flex items-center gap-3">
      <!-- Product thumbnail using the shared component -->
      <div class="w-16 h-16 rounded overflow-hidden flex-shrink-0">
        <ProductCardThumbnail 
          :primaryImage="formattedThumbnail" 
          :alt="product.name"
          aspectRatio="square"
        />
      </div>
      
      <!-- Product info -->
      <div class="flex-1">
        <p class="body-3 font-medium line-clamp-1 mb-1">{{ product.name }}</p>
        
        <!-- Price information -->
        <div class="flex items-center gap-2">
          <!-- Regular price (show as strikethrough if has discount) -->
          <p v-if="hasDiscount" class="text-muted-foreground text-xs line-through">
            {{ formatPriceWithCurrency(product.price) }}
          </p>
          
          <!-- Final price -->
          <p class="text-primary body-4 font-medium">
            {{ formatPriceWithCurrency(product.sale_price || product.price) }}
          </p>
        </div>
      </div>
      
      <!-- Arrow icon to indicate it's clickable -->
      <Icon name="lucide:chevron-left" class="text-muted-foreground" />
    </div>
  </Card>
</template>

<style scoped>
</style> 