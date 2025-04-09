<script setup lang="ts">

import Copyright from "~/components/footer/Copyright.vue";
</script>

<template>
  <footer class="bg-muted/30" dir="rtl">
    <div class="irsm-container py-8 md:flex-row md:flex md:flex-wrap md:gap-y-8 lg:justify-between lg:gap-x-8">
      <div class="md:flex md:flex-row md:items-center lg:items-start lg:flex-col lg:basis-[30%] lg:justify-between">
        <FooterAbout class="mb-8 md:basis-[48%]"/>
        <FooterNewsletter class="mb-8 md:basis-[48%] md:px-12 grow lg:px-0 lg:w-fit lg:mb-0 lg:grow-0 lg:basis-0"/>
      </div>

      <div class="md:flex md:flex-col md:basis-[48%] lg:basis-[30%] mb-8 lg:mb-0">
        <FooterContact />
      </div>

      <div class="flex justify-around md:justify-between md:px-12 items-center grow w-full md:basis-[48%] md:items-start lg:basis-[30%] lg:px-0 lg:grow-0">
        <FooterMenu/>
        <FooterTrust class="basis-1/3 max-w-[160px]"/>
      </div>

    </div>
    <copyright/>
  </footer>
</template>

<style scoped>

</style>