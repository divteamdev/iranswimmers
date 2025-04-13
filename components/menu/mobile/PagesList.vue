<script setup lang="ts">
import { ref } from 'vue'
import MenuItem from './MenuItem.vue'

interface MainMenuItem {
  text: string
  link: string
  icon: string
  iconColor: string
}

interface ContactItem {
  text: string
  icon: string
  color: string
  iconColor: string
  link: string
}

interface SocialItem {
  text: string
  icon: string
  link: string
  color: string
  logoColor: string
}

interface MainMenuData {
  mainMenu: MainMenuItem[]
  contact: ContactItem[]
  socials: SocialItem[]
}

const props = defineProps<{
  mainMenuData: MainMenuData | null
}>()

const route = useRoute()
const isContactExpanded = ref(false)

const toggleContactMenu = () => {
  isContactExpanded.value = !isContactExpanded.value
}
</script>

<template>
  <div class="overflow-y-auto h-full max-h-[calc(100vh-180px)]">
    <!-- Main Menu Items -->
    <template v-if="mainMenuData">
      <MenuItem 
        v-for="item in mainMenuData.mainMenu" 
        :key="item.text"
        :text="item.text"
        :to="item.text === 'تماس با ما' ? undefined : item.link"
        :is-active="route.path === item.link"
        :prepend-icon="item.icon"
        :prepend-icon-color="item.iconColor"
        :append-icon="item.text === 'تماس با ما' ? 'hugeicons:arrow-down-01' : 'hugeicons:arrow-up-left-01'"
        :class="{'bg-muted': item.text === 'تماس با ما' && isContactExpanded}"
        @click="item.text === 'تماس با ما' ? toggleContactMenu() : null"
        :is-open="item.text === 'تماس با ما' && isContactExpanded"
      />
      
      <!-- Collapsible Contact Section -->
      <transition name="slide-fade">
        <div v-if="isContactExpanded" class="bg-muted overflow-hidden">
          <!-- Contact page link -->
          <div class="flex justify-end px-4 py-2">
            <NuxtLink 
              :to="mainMenuData.mainMenu.find(item => item.text === 'تماس با ما')?.link || '/contact'" 
              class="btn btn-outline-primary body-4 w-full justify-between flex mb-4"
            >
              صفحه تماس
              <Icon name="hugeicons:arrow-up-left-01" class="text-base text-primary" />
            </NuxtLink>
          </div>
          
          <!-- Contact Items -->
          <div 
            v-for="contact in mainMenuData.contact" 
            :key="contact.text" 
            class="flex items-center px-4 h-13 border-b border-border/50 mr-2"
          >
            <div :class="[contact.color, 'w-10 h-10 rounded-full flex items-center justify-center ml-4']">
              <Icon :name="contact.icon" :class="contact.iconColor + ' text-xl'" />
            </div>
            <a :href="contact.link" class="text-foreground body-3">{{ contact.text }}</a>
          </div>
          
          <!-- Social Items -->
          <div 
            v-for="social in mainMenuData.socials" 
            :key="social.text" 
            class="flex items-center px-4 py-3 border-b border-border/30 mr-2"
          >
            <div :class="[social.color, 'w-10 h-10 rounded-full flex items-center justify-center ml-4']">
              <Icon :name="social.icon" :class="social.logoColor + ' text-xl'" />
            </div>
            <a :href="social.link" class="text-foreground body-3">{{ social.text }}</a>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style> 