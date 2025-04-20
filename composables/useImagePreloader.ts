// composables/useImagePreloader.ts
import { ref, onMounted } from 'vue'

export interface PreloadableImage {
    src: string;
    width?: number;
    height?: number;
    type?: 'image' | 'svg';
}

export function useImagePreloader(
    images: PreloadableImage[] | (() => PreloadableImage[]),
    options = { timeout: 3000 }
) {
    const imagesLoaded = ref(false)
    const isLoading = ref(true)

    const preloadImages = async () => {
        const imagesToLoad = typeof images === 'function' ? images() : images

        // Create preload promises for all images
        const preloadPromises = imagesToLoad.map(image => {
            const isSvg = image.type === 'svg' || image.src.endsWith('.svg')

            if (isSvg) {
                // SVG preloading via XMLHttpRequest
                return new Promise(resolve => {
                    const xhr = new XMLHttpRequest()
                    xhr.open('GET', image.src, true)
                    xhr.onload = () => resolve(true)
                    xhr.onerror = () => resolve(false) // Still resolve to avoid hanging
                    xhr.send()
                })
            } else {
                // Standard image preloading
                return new Promise(resolve => {
                    const img = new Image()
                    if (image.width) img.width = image.width
                    if (image.height) img.height = image.height
                    img.onload = () => resolve(true)
                    img.onerror = () => resolve(false)
                    img.src = image.src
                })
            }
        })

        // Set images as loaded when all are ready or after timeout
        return Promise.race([
            Promise.all(preloadPromises),
            new Promise(resolve => setTimeout(() => resolve(false), options.timeout))
        ])
    }

    onMounted(async () => {
        await preloadImages()
        imagesLoaded.value = true
        isLoading.value = false
    })

    return {
        imagesLoaded,
        isLoading,
        preloadImages
    }
}