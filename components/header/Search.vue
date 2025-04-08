<script setup lang="ts">

import {Input} from "~/components/ui/input";
</script>

<template>
  <div class="flex">
    <Input type="text" placeholder=" مدویو، عینک شنا، جمر،مایو اقتصادی و ... " class="grow h-12 rounded-l-none rounded-r-xl"/>
    <Button variant="default" size="icon-lg" class="rounded-r-none">
      <Icon name="hugeicons:search-01" class="text-primary-foreground text-2xl"/>
    </Button>
  </div>
</template>

<style scoped>

</style>