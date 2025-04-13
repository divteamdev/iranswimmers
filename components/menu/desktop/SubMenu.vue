<script setup lang="ts">
import { defineProps } from 'vue'
import type { Category } from './types'

const props = defineProps<{
  children: Category[]
  activeSubmenu: number
}>()
</script>

<template>
  <div class="py-2.5 px-4 bg-background h-full max-h-[500px] flex w-full relative">
    <div 
      v-for="child in children" 
      :key="child.id"
      class="flex-col h-full gap-x-6 gap-y-1 max-h-[480px] overflow-auto w-full"
      :class="{'flex': activeSubmenu === child.id, 'hidden': activeSubmenu !== child.id}"
    >
      <div class="mb-3 border-b border-border pb-2 w-full">
        <nuxt-link 
          :to="`/product-category/${child.slug}`"
          class="text-secondary font-medium caption-1 leading-relaxed py-2 px-1.5 w-fit flex items-center hover:text-primary transition-all duration-300"
        >
          تمام محصولات {{ child.name }}
          <Icon name="hugeicons:arrow-left" class="text-sm mr-2" />
        </nuxt-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full">
        <div 
          v-for="grandchild in child.children" 
          :key="grandchild.id" 
          class="w-full"
        >
          <nuxt-link 
            :to="`/product-category/${grandchild.slug}`"
            class="child-item hover:text-primary hover:bg-muted hover:rounded-md text-foreground font-medium body-4 leading-relaxed py-2 px-3 w-full flex items-center transition-all duration-300"
          >
            <Icon name="hugeicons:swimming" class="text-xl text-primary ml-2" />
            {{ grandchild.name }}
          </nuxt-link>
          
          <div class="pl-7 ml-1 mt-1 flex flex-col">
            <template v-if="grandchild.children && grandchild.children.length">
              <nuxt-link 
                v-for="greatgrandchild in grandchild.children" 
                :key="greatgrandchild.id"
                :to="`/product-category/${greatgrandchild.slug}`" 
                class="hover:bg-muted hover:rounded-md text-foreground body-4 py-1.5 hover:text-primary transition-all duration-300"
              >
                {{ greatgrandchild.name }}
              </nuxt-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style> 