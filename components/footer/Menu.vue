<script setup lang="ts">
import { computed } from 'vue'
import data from '@/assets/data.json'

const usefulPages = computed(() => data.menuUsefulPages)
</script>

<template>
  <div>
    <h6 class="heading-6 text-start mb-4">
      {{ usefulPages.title }}
    </h6>
    <ul class="flex flex-col items-start gap-2">
      <li v-for="(item, index) in usefulPages.items" :key="index">
        <Button
            :to="item.link"
            variant="ghost"
            class="body-3 py-1.5 px-2"
        >
          {{ item.text }}
        </Button>
      </li>
    </ul>
  </div>
</template>