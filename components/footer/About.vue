<script setup lang="ts">
import { ref } from 'vue'

const isExpanded = ref(false)
const toggleReadMore = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div>
    <h6 class="heading-6 text-center mb-4 md:text-start ">
      درباره ما
    </h6>
    <div class="relative">
      <p class="body-3 text-start" :class="{ 'line-clamp-3': !isExpanded }">
        ایران سوییمرز، بزرگترین فروشگاه تخصصی محصولات شنا در ایران. ایران سوییمرز با 13 سال سابقه فروش بهترین برندهای شنای دنیا، از جمله ارنا، اسپیدو، زاگز، مدویو، نابایجی، توربو، سوانس، فینیس، میکاسا . فروشگاه لوازم شنا ایران سوییمرز توسط شناگران اسبق تیم ملی ایران اداره می‌شود.
      </p>
      <Button
          variant="link"
          size="sm"
          class="mt-1 text-primary px-0 body-4"
          @click="toggleReadMore"
      >
        {{ isExpanded ? 'نمایش کمتر' : 'ادامه مطلب' }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>