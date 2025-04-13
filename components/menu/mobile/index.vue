<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import MenuTabs from './MenuTabs.vue'
import MenuItems from './MenuItems.vue'

interface Props {
    open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const activeTab = ref('productCategories')

const handleClose = () => {
    emit('close')
}

// Control body overflow based on menu state
watch(() => props.open, (isOpen) => {
    if (typeof window === 'undefined') return

    if (isOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
}, { immediate: true })

// Clean up when component is unmounted
onUnmounted(() => {
    if (typeof window === 'undefined') return
    document.body.style.overflow = ''
})
</script>

<template>
    <teleport to="body">
        <div class="h-screen fixed top-0 right-0 z-50" :class="{ 'pointer-events-none': !open }">
            <div class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm h-screen transition-opacity duration-300 ease-in-out"
            :class="{ 'opacity-0 pointer-events-none': !open }"
            @click="handleClose">
            </div>
            <div class="fixed top-0 right-0 z-50 w-full max-w-xs bg-background shadow-lg transition-transform duration-300 ease-in-out h-screen"
                :class="{ 'translate-x-0': open, 'translate-x-full': !open }" dir="rtl">
                <div class="flex flex-col h-full">
                    <div class="flex items-center justify-between p-4 border-b border-border">
                        <h2 class="text-lg font-medium">منو</h2>
                        <button
                            class="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground"
                            @click="handleClose" aria-label="Close menu">
                            <i class="mdi mdi-close text-xl"></i>
                        </button>
                    </div>

                    <div class="flex-1 overflow-y-auto">
                        <MenuTabs v-model="activeTab" />
                        <MenuItems :active-tab="activeTab" />
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>