<script setup>
import {convertImageUrl} from "~/helpers/imageUtils";

const props = defineProps({
  primaryImage: {
    type: Object,
    required: true,
    default: null
  },
  secondaryImage: {
    type: Object,
    default: null
  },
  alt: {
    type: String,
  },
  aspectRatio: {
    type: String,
    default: "square", // Options: "square", "portrait", "landscape"
  }
});

// Computed properties for images
const thumbnailSrc = computed(() => {
  if (props.primaryImage?.path) {
    return convertImageUrl(props.primaryImage.path);
  }
  return null;
});

const secondaryThumbnailSrc = computed(() => {
  if (props.secondaryImage?.path) {
    return convertImageUrl(props.secondaryImage.path);
  }
  return null;
});

// Use the provided alt text or fallback to name properties
const imageAlt = computed(() => props.alt || props.primaryImage?.name || "Product image");
const secondaryImageAlt = computed(() => props.secondaryImage?.name || "Product image");

// Handle aspect ratio classes
const aspectRatioClasses = computed(() => {
  switch (props.aspectRatio) {
    case "portrait":
      return "aspect-[3/4]";
    case "landscape":
      return "aspect-[4/3]";
    default:
      return "aspect-square";
  }
});

// Determine if hover effect should be applied
const hasSecondaryImage = computed(() => Boolean(secondaryThumbnailSrc.value));
</script>

<template>
  <div :class="['bg-card overflow-hidden relative group rounded-lg', aspectRatioClasses]">
    <!-- Primary image with NuxtImg -->
    <NuxtImg
        v-if="thumbnailSrc"
        :src="thumbnailSrc"
        :alt="imageAlt"
        loading="lazy"
        format="webp"
        fit="cover"
        :class="[
        'w-full h-full object-cover transition-opacity duration-300',
        hasSecondaryImage ? 'group-hover:opacity-0' : ''
      ]"
    />

    <!-- Secondary image with NuxtImg (shown on hover) -->
    <NuxtImg
        v-if="secondaryThumbnailSrc"
        :src="secondaryThumbnailSrc"
        :alt="secondaryImageAlt"
        loading="lazy"
        format="webp"
        fit="cover"
        class="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />

    <!-- Fallback if no image is available -->
    <div v-if="!thumbnailSrc" class="w-full h-full flex items-center justify-center text-muted-foreground bg-background">
      No image
    </div>

    <!-- Optional badges can be added here through slots -->
    <slot name="badges"></slot>
  </div>
</template>