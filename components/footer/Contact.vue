<script setup lang="ts">
import {cn} from '@/lib/utils'

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
      <Button size="sm" class="w-fit" variant="ghost" href="tel:+982188881426" as="a">
        <span class="caption-2">021</span>
        <span class="text-primary body-1">
          88881426
        </span>
      </Button>

      <Button as="a" size="sm" class="w-fit" variant="ghost" href="mailto:contact@iranswimmers.com">
        <span class="text-foreground body-2">
          contact@iranswimmers.com
        </span>
      </Button>
    </div>

    <a class="body-2 bg-primary/10 text-primary text-center py-2 mb-4 md:text-start md:px-4 rounded-lg"
       target="_blank" rel="noopener noreferrer"
       href="https://www.google.com/maps/place/iranswimmers/@35.762189,51.4122559,17z/data=!3m1!4b1!4m6!3m5!1s0x3f8e07c25f8a70e7:0xd1d2cae8e8cbcbc8!8m2!3d35.7621847!4d51.4148308!16s%2Fg%2F11sttd2rd4?entry=ttu&g_ep=EgoyMDI1MDQwOC4wIKXMDSoASAFQAw%3D%3D"
    >
      <p>
        تهران، میرداماد، جنب موزه دفینه، بازار بزرگ میرداماد، طبقه همکف، واحد 32
      </p>
    </a>

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