<script setup lang="ts">
import { cn } from '@/lib/utils'

const socials = [
  {
    name: 'اینستاگرام',
    icon: 'hugeicons:instagram',
    link: 'https://www.instagram.com/iranswimmers/',
    color: 'bg-[#BD69FF0F]',
    logoColor: 'text-[#FF6969]',
    hoverColor: 'hover:bg-[#BD69FF3F]',
  },
  {
    name: 'تلگرام',
    icon: 'hugeicons:telegram',
    link: 'https://t.me/iranswimmers',
    color: 'bg-[#4FA2FF0F]',
    logoColor: 'text-[#4FA2FF]',
    hoverColor: 'hover:bg-[#4FA2FF3F]',
  },
  {
    name: 'واتس اپ',
    icon: 'hugeicons:whatsapp',
    link: 'https://wa.me/+989015521838',
    color: 'bg-[#19AE190F]',
    logoColor: 'text-[#19AE19]',
    hoverColor: 'hover:bg-[#19AE193F]',
  },
]

// Helper function to compute button classes
const getSocialButtonClasses = (social) => {
  return cn(
      'text-xl',
      social.color,
      social.logoColor,
      `${social.hoverColor} hover:text-[${social.logoColor}]`,
  )
}
</script>

<template>
  <div class="flex flex-col  lg:justify-between h-full">
    <h6 class="heading-5 text-center md:text-start mb-4">
      ارتباط با ما
    </h6>
    <div class="flex flex-col items-center md:items-end gap-2 mb-4 justify-center" dir="ltr">
      <Button size="sm" class="w-fit" variant="ghost">
        <span class="caption-2">021</span>
        <span class="text-primary body-1">
          88881426
        </span>
      </Button>

      <Button size="sm" class="w-fit" variant="ghost">
        <span class="text-foreground body-2">
          contact@iranswimmers.com
        </span>
      </Button>
    </div>

    <p class="body-2 bg-primary/10 text-primary text-center py-2 mb-4 md:text-start md:px-4">
      تهران، میرداماد، جنب موزه دفینه، بازار بزرگ میرداماد، طبقه همکف، واحد 32
    </p>

    <div class="flex gap-2 justify-center w-full md:justify-start">
      <div v-for="social in socials" :key="social.name">
        <Button
            as="a"
            :href="social.link"
            target="_blank"
            size="icon"
            :class="getSocialButtonClasses(social)"
            variant="ghost">
          <Icon :name="social.icon"/>
        </Button>
      </div>
    </div>
  </div>
</template>