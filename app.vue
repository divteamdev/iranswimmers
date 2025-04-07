<script setup>
import { useApiStore } from '~/stores/APIs';

const apiStore = useApiStore();

// Call this to test the API
onMounted(() => {
  apiStore.testShopListApi();
});
</script>

<template>
  <div>
    <div v-if="apiStore.shopListLoading">Loading...</div>
    <div v-else-if="apiStore.shopListError">Error: {{ apiStore.shopListError }}</div>
    <div v-else-if="apiStore.shopListData">
      <pre>{{ JSON.stringify(apiStore.shopListData, null, 2) }}</pre>
    </div>
  </div>
</template>