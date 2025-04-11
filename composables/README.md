# Device Detection Composable

This composable provides a convenient way to detect device sizes based on Tailwind CSS breakpoints.

## Usage

```vue
<script setup>
import { useDeviceDetection } from '~/composables/useDeviceDetection';

// Get all device detection properties
const { 
  // Current width and height
  width, 
  height,
  
  // Current breakpoint (xs, sm, md, lg, xl, 2xl)
  currentBreakpoint,
  
  // Device type
  isMobile,   // xs or sm
  isTablet,   // md or lg
  isDesktop,  // xl or 2xl
  
  // Specific breakpoint checks
  isXs,      // < 640px
  isSm,      // 640px-767px
  isMd,      // 768px-1023px
  isLg,      // 1024px-1279px
  isXl,      // 1280px-1535px
  is2Xl,     // >= 1536px
  
  // "At least" checks
  atLeastSm,  // >= 640px
  atLeastMd,  // >= 768px
  atLeastLg,  // >= 1024px
  atLeastXl,  // >= 1280px
  atLeast2Xl, // >= 1536px
  
  // Breakpoint constants
  BREAKPOINTS,
} = useDeviceDetection();
</script>

<template>
  <div>
    <div v-if="isMobile">Mobile Layout</div>
    <div v-else-if="isTablet">Tablet Layout</div>
    <div v-else>Desktop Layout</div>
    
    <div>Current breakpoint: {{ currentBreakpoint }}</div>
    <div>Screen size: {{ width }}px × {{ height }}px</div>
    
    <!-- Conditional classes -->
    <div :class="{
      'text-sm': isMobile,
      'text-base': isTablet,
      'text-lg': isDesktop,
    }">
      Responsive Text Size
    </div>
  </div>
</template>
```

## Breakpoints

The composable uses the following Tailwind CSS breakpoints:

- `xs`: < 640px
- `sm`: 640px - 767px
- `md`: 768px - 1023px
- `lg`: 1024px - 1279px
- `xl`: 1280px - 1535px
- `2xl`: >= 1536px

## Device Categories

- `isMobile`: `xs` or `sm` breakpoints (< 768px)
- `isTablet`: `md` or `lg` breakpoints (768px - 1279px)
- `isDesktop`: `xl` or `2xl` breakpoints (>= 1280px) 