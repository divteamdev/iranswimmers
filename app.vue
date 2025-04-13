<script setup>
import { Toaster } from '@/components/ui/sonner'

import { useDeviceDetection } from '~/composables/useDeviceDetection'

const { isMobile } = useDeviceDetection()
const { isActive } = useSearch()
</script>

<template>
  <NuxtLayout/>

  <ClientOnly>
    <Toaster />
  </ClientOnly>
</template>