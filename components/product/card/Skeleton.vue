<script setup lang="ts">

</script>

<template>
    <div
        class="bg-card/50 min-h-[310px] md:min-h-[280px] lg:min-h-[340px] 2xl:min-w-[210px] flex flex-col gap-5 p-3 justify-between rounded-xl">
      <div class="flex flex-col gap-5">
        <Skeleton class="aspect-square w-full h-auto"/>
        <div>
          <skeleton class="h-6 max-w-3/4 mb-2"/>
          <skeleton class="h-6 max-w-1/2"/>
        </div>
      </div>
      <div class="flex flex-row gap-2 w-full h-4 items-center">
        <skeleton class="h-4 w-1/3"/>
        <skeleton class="h-3.5 w-1/6"/>
      </div>

    </div>
</template>

<style scoped>

</style>