<script setup lang="ts">
import {Card, CardFooter, CardTitle} from "~/components/ui/card";
import {formatPrice} from "~/helpers/priceUtils";
import { cn } from '@/lib/utils';

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
      class="justify-between min-h-[320px] lg:min-h-[360px] 2xl:min-w-[240px]"
      :class="cardVariants.card"
      :to="`/product/${product.slug}`">
    <CardHeader>
      <ProductCardThumbnail :primaryImage="product.thumbnail" :secondaryImage="product.thumbnail_alt"/>

      <CardTitle tag="h4" class="heading-5" :class="cardVariants.title">
        {{ product.name }}
      </CardTitle>
    </CardHeader>

    <CardFooter>
      <div class="flex items-center gap-1">
        <span class="font-fa-num body-1" :class="cardVariants.price">
          {{ formatPrice(product.price) }}
        </span>
        <span class="text-xs font-fa-num" :class="cardVariants.currency">
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