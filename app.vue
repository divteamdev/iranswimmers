<script setup>
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <NuxtLayout/>

  <ClientOnly>
    <Toaster />
  </ClientOnly>
</template>