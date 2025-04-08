<script setup lang="ts">

import {Card, CardFooter, CardTitle} from "~/components/ui/card";
import {formatPrice} from "../../../helpers/priceUtils";

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
})

</script>

<template>
  <Card dir="rtl" class="justify-between min-h-[360px]" :to="`/product/${product.slug}`">
    <CardHeader>
      <ProductCardThumbnail :primaryImage="product.thumbnail" :secondaryImage="product.thumbnail_alt"/>

      <CardTitle tag="h4" class="heading-5">
        {{ product.name }}
      </CardTitle>

    </CardHeader>

    <CardFooter>

      <div class="flex items-center gap-1">
        <span class="font-fa-num body-1 text-foreground">{{ formatPrice(product.price) }}</span>
        <span class="text-xs font-fa-num text-muted-foreground">تومان</span>
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

<style scoped>

</style>