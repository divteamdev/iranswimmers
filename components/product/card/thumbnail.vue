<script setup>
import {convertImageUrl} from "~/helpers/imageUtils";
import {ref} from 'vue';
import {Skeleton} from "~/components/ui/skeleton/index.js";

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


// Track image loading state
const primaryImageError = ref(false);
const secondaryImageError = ref(false);

const isPrimaryImageLoaded = ref(false);
const isSecondaryImageLoaded = ref(false);

const isLoading = computed(() => {
  // Show loading state when thumbnails exist but aren't loaded yet
  if (thumbnailSrc.value && !isPrimaryImageLoaded.value) return true;
  if (hasSecondaryImage.value && secondaryThumbnailSrc.value && !isSecondaryImageLoaded.value) return true;
  return false;
});

const handlePrimaryImageLoaded = () => {
  isPrimaryImageLoaded.value = true;
};

const handleSecondaryImageLoaded = () => {
  isSecondaryImageLoaded.value = true;
};

// Computed properties for images
const thumbnailSrc = computed(() => {
  if (props.primaryImage?.path && !primaryImageError.value) {
    return convertImageUrl(props.primaryImage.path);
  } else if (props.secondaryImage?.path && !secondaryImageError.value) {
    // Try secondary image as fallback for primary
    return convertImageUrl(props.secondaryImage.path);
  }
  return null;
});

const secondaryThumbnailSrc = computed(() => {
  if (props.secondaryImage?.path && !secondaryImageError.value) {
    return convertImageUrl(props.secondaryImage.path);
  }
  return null;
});

// Handle image error events
const handlePrimaryImageError = () => {
  primaryImageError.value = true;
  console.error('Primary image failed to load:', props.primaryImage?.path);
};

const handleSecondaryImageError = () => {
  secondaryImageError.value = true;
  console.error('Secondary image failed to load:', props.secondaryImage?.path);
};

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
const hasSecondaryImage = computed(() => {
  return !primaryImageError.value &&
      Boolean(secondaryThumbnailSrc.value) &&
      !secondaryImageError.value;
});
</script>

<template>
  <div :class="['bg-card overflow-hidden relative group rounded-lg', aspectRatioClasses]">
    <!-- Primary image (or secondary as fallback) with NuxtImg -->
    <div v-if="thumbnailSrc" class="h-full w-full p-4 bg-background">
      <NuxtImg
          :src="thumbnailSrc"
          :alt="imageAlt"
          loading="lazy"
          format="webp"
          fit="cover"
          :class="[
            'w-full h-full object-cover transition-opacity duration-300 bg-back',
            hasSecondaryImage ? 'group-hover:opacity-0' : ''
          ]"
          @load="handlePrimaryImageLoaded"
      />
      <!-- Hidden standard img for error detection -->
      <img
          :src="thumbnailSrc"
          class="hidden"
          @error="handlePrimaryImageError"
          alt=""
      />
    </div>

    <!-- Secondary image with NuxtImg (shown on hover) - only if we should show hover effect -->
    <div v-if="hasSecondaryImage" class="h-full w-full bg-background">
      <NuxtImg
          :src="secondaryThumbnailSrc"
          :alt="secondaryImageAlt"
          loading="lazy"
          format="webp"
          fit="cover"
          class="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          @load="handleSecondaryImageLoaded"
      />
      <!-- Hidden standard img for error detection -->
      <img
          :src="secondaryThumbnailSrc"
          class="hidden"
          @error="handleSecondaryImageError"
          alt=""
      />
    </div>

    <!-- Loading state - show skeleton until images are loaded -->
    <div v-if="isLoading" class="w-full h-full absolute top-0 left-0 flex z-10">
      <Skeleton class="w-full h-full"/>
    </div>

    <!-- Fallback if both images failed to load or are not available -->
    <div
        v-if="(!thumbnailSrc) || (primaryImageError.value && (secondaryImageError.value || !props.secondaryImage?.path))"
        class="w-full h-full flex items-center justify-center text-muted-foreground bg-background">
      No image
    </div>

    <!-- Optional badges can be added here through slots -->
    <slot name="badges"></slot>
  </div>
</template>