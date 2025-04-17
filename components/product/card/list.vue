<script setup lang="ts">
import {Card, CardFooter, CardTitle} from "~/components/ui/card";
import {formatPrice} from "~/helpers/priceUtils";
import {cn} from '@/lib/utils';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  button: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'default',
  },
})

const cardVariants = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return {
        card: 'bg-secondary',
        title: 'text-secondary-foreground',
        price: 'text-secondary-foreground',
        currency: 'text-secondary-foreground/80'
      }
    case 'accent':
      return {
        card: 'bg-primary/20',
        title: 'text-primary',
        price: 'text-foreground',
        currency: 'text-foreground/80'
      }
    case 'default':
    default:
      return {
        card: '',
        title: '',
        price: 'text-foreground',
        currency: 'text-muted-foreground'
      }
  }
})
</script>

<template>
  <Card
      dir="rtl"
      class="justify-between  hover:bg-card-hover transition-colors duration-300 flex flex-row"
      :class="cardVariants.card"
      :to="`/product/${product.slug}`">

    <div class="flex flex-row min-w-max gap-8">
      <ProductCardThumbnail :primaryImage="product.thumbnail" :secondaryImage="product.thumbnail_alt" class="w-32"
                            aspect-ratio="square"/>

      <CardTitle tag="h4" class="heading-6 py-4" :class="cardVariants.title">
        {{ product.name }}
      </CardTitle>
    </div>


    <CardFooter class="items-end">
      <div class="flex items-center gap-1 py-4">
        <span class="font-fa-num body-2" :class="cardVariants.price">
          {{ formatPrice(product.price) }}
        </span>
        <span class="body-4" :class="cardVariants.currency">
          تومان
        </span>
      </div>

      <Button
          v-if="button"
          :to="`/product/${product.slug}`"
          class="w-full"
          :loading="loading"
      >
      </Button>
    </CardFooter>
  </Card>
</template>