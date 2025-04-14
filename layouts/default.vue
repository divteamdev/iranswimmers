<script setup lang="ts">
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "~/components/ui/sheet"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
</script>

<template>
  <Header/>

  <main class="py-8">
    <NuxtPage/>
  </main>
  <Footer class="pb-16 lg:pb-0"/>
  <BottomNavigation/>
</template>

<style scoped>

</style>