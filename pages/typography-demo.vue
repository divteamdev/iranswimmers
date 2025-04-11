<script setup lang="ts">
import { useDeviceDetection } from '~/composables/useDeviceDetection';

const { currentBreakpoint, width } = useDeviceDetection();
</script>

<template>
  <div class="irsm-container py-10">
    <div class="mb-8 p-4 bg-card rounded-lg">
      <h1 class="heading-1 mb-2 text-primary">Fluid Typography Demo</h1>
      <p class="body-2">
        Current breakpoint: <span class="font-bold">{{ currentBreakpoint }}</span>, 
        Screen width: <span class="font-bold">{{ width }}px</span>
      </p>
      <p class="body-3 mt-2">
        Resize the browser window to see how the typography smoothly scales across all screen sizes using CSS clamp().
      </p>
    </div>

    <!-- Heading Examples -->
    <section class="mb-10">
      <h2 class="heading-3 mb-4 pb-2 border-b">Heading Examples (Fluid)</h2>
      
      <div class="space-y-6">
        <div class="p-4 bg-muted/20 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">heading-1</h3>
          <p class="heading-1">This is fluid heading 1</p>
          <p class="caption-1 mt-2">Uses clamp(2.25rem, 1.35rem + 4.5vw, 4rem)</p>
        </div>
        
        <div class="p-4 bg-muted/20 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">heading-2</h3>
          <p class="heading-2">This is fluid heading 2</p>
          <p class="caption-1 mt-2">Uses clamp(1.875rem, 1.2rem + 3.4vw, 3.5rem)</p>
        </div>
        
        <div class="p-4 bg-muted/20 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">heading-3</h3>
          <p class="heading-3">This is fluid heading 3</p>
          <p class="caption-1 mt-2">Uses clamp(1.5rem, 1rem + 2.5vw, 3rem)</p>
        </div>
        
        <div class="p-4 bg-muted/20 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">heading-4</h3>
          <p class="heading-4">This is fluid heading 4</p>
          <p class="caption-1 mt-2">Uses clamp(1.25rem, 0.9rem + 1.8vw, 2.25rem)</p>
        </div>
        
        <div class="p-4 bg-muted/20 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">heading-5</h3>
          <p class="heading-5">This is fluid heading 5</p>
          <p class="caption-1 mt-2">Uses clamp(1.125rem, 0.85rem + 1.4vw, 1.75rem)</p>
        </div>
      </div>
    </section>

    <!-- How clamp() works -->
    <section class="mb-10">
      <h2 class="heading-3 mb-4 pb-2 border-b">How Fluid Typography Works</h2>
      
      <div class="p-4 bg-primary/10 rounded-lg">
        <h3 class="heading-4 mb-3">The CSS clamp() function</h3>
        <p class="body-2 mb-2">
          Fluid typography uses CSS <code class="bg-muted/30 px-1 rounded">clamp(min, preferred, max)</code> to create smooth scaling:
        </p>
        <ul class="space-y-2 list-disc ml-6">
          <li class="body-3">
            <strong>min:</strong> Minimum size (mobile screens)
          </li>
          <li class="body-3">
            <strong>preferred:</strong> The fluid part that scales with viewport width
          </li>
          <li class="body-3">
            <strong>max:</strong> Maximum size (larger screens)
          </li>
        </ul>
        <p class="body-3 mt-3">
          This creates a smooth scaling between breakpoints without the need for media queries!
        </p>
      </div>
    </section>

    <!-- New Fluid Type Scale Examples -->
    <section class="mb-10">
      <h2 class="heading-3 mb-4 pb-2 border-b">Fluid Type Scale</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="p-4 bg-accent/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">fluid-type-xs</h3>
          <p class="fluid-type-xs">Fluid extra small text</p>
        </div>
        
        <div class="p-4 bg-accent/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">fluid-type-sm</h3>
          <p class="fluid-type-sm">Fluid small text</p>
        </div>
        
        <div class="p-4 bg-accent/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">fluid-type-base</h3>
          <p class="fluid-type-base">Fluid base text</p>
        </div>
        
        <div class="p-4 bg-accent/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">fluid-type-lg</h3>
          <p class="fluid-type-lg">Fluid large text</p>
        </div>
        
        <div class="p-4 bg-accent/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">fluid-type-xl</h3>
          <p class="fluid-type-xl">Fluid extra large text</p>
        </div>
        
        <div class="p-4 bg-accent/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">fluid-type-2xl</h3>
          <p class="fluid-type-2xl">Fluid 2xl text</p>
        </div>
        
        <div class="p-4 bg-accent/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">fluid-type-4xl</h3>
          <p class="fluid-type-4xl">Fluid 4xl</p>
        </div>
        
        <div class="p-4 bg-accent/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">fluid-type-6xl</h3>
          <p class="fluid-type-6xl">Fluid 6xl</p>
        </div>
      </div>
    </section>

    <!-- Responsive + Fluid Examples -->
    <section class="mb-10">
      <h2 class="heading-3 mb-4 pb-2 border-b">Combining Fluid & Responsive Typography</h2>
      
      <div class="space-y-6">
        <div class="p-4 bg-secondary/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">
            Combined approach: Fluid base with responsive overrides
          </h3>
          <p class="heading-5 md:heading-3 lg:heading-1">
            This text uses fluid scaling within each breakpoint
          </p>
          <p class="caption-1 mt-2">
            You can still override fluid classes with responsive variants when needed
          </p>
        </div>
        
        <div class="p-4 bg-secondary/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">
            Body text with responsive overrides
          </h3>
          <p class="body-3 md:body-2 lg:body-1">
            Fluid typography creates smooth transitions by default, but you can still
            use breakpoint-specific overrides when needed for more dramatic changes.
          </p>
        </div>
      </div>
    </section>

    <!-- Display Text Examples -->
    <section class="mb-10">
      <h2 class="heading-3 mb-4 pb-2 border-b">Display Text Examples</h2>
      
      <div class="space-y-6">
        <div class="p-4 bg-destructive/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">text-display-1</h3>
          <p class="text-display-1">Display 1</p>
          <p class="caption-1 mt-2">Uses clamp(2.5rem, 1.2rem + 6.5vw, 5rem)</p>
        </div>
        
        <div class="p-4 bg-destructive/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">text-display-2</h3>
          <p class="text-display-2">Display 2</p>
          <p class="caption-1 mt-2">Uses clamp(2rem, 1rem + 5vw, 4rem)</p>
        </div>
      </div>
    </section>

    <!-- Font Weight Examples -->
    <section class="mb-10">
      <h2 class="heading-3 mb-4 pb-2 border-b">Font Weight Examples</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-muted/10 rounded-lg">
          <p class="fluid-type-xl font-light">Light weight</p>
        </div>
        
        <div class="p-4 bg-muted/10 rounded-lg">
          <p class="fluid-type-xl font-normal">Normal weight</p>
        </div>
        
        <div class="p-4 bg-muted/10 rounded-lg">
          <p class="fluid-type-xl font-medium">Medium weight</p>
        </div>
        
        <div class="p-4 bg-muted/10 rounded-lg">
          <p class="fluid-type-xl font-semibold">Semibold weight</p>
        </div>
        
        <div class="p-4 bg-muted/10 rounded-lg">
          <p class="fluid-type-xl font-bold">Bold weight</p>
        </div>
        
        <div class="p-4 bg-muted/10 rounded-lg">
          <p class="fluid-type-xl font-normal md:font-medium lg:font-bold">Responsive weight</p>
        </div>
      </div>
    </section>

    <!-- Line Height Examples -->
    <section class="mb-10">
      <h2 class="heading-3 mb-4 pb-2 border-b">Line Height Examples</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 bg-muted/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">leading-tight (1.2)</h3>
          <p class="fluid-type-lg leading-tight">
            This paragraph uses tight line height. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        
        <div class="p-4 bg-muted/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">leading-normal (1.5)</h3>
          <p class="fluid-type-lg leading-normal">
            This paragraph uses normal line height. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        
        <div class="p-4 bg-muted/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">leading-relaxed (1.625)</h3>
          <p class="fluid-type-lg leading-relaxed">
            This paragraph uses relaxed line height. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        
        <div class="p-4 bg-muted/10 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">leading-fluid (calc(1.2em + 0.2vw))</h3>
          <p class="fluid-type-lg leading-fluid">
            This paragraph uses fluid line height that scales with viewport. Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </section>

    <!-- Body Text Examples -->
    <section class="mb-10">
      <h2 class="heading-3 mb-4 pb-2 border-b">Body Text Examples</h2>
      
      <div class="space-y-6">
        <div class="p-4 bg-muted/20 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">body-1</h3>
          <p class="body-1">This is body text size 1. It's great for primary content and important information that needs to be clearly readable.</p>
          <p class="caption-1 mt-2">Uses clamp(1.125rem, 0.95rem + 0.9vw, 1.5rem)</p>
        </div>
        
        <div class="p-4 bg-muted/20 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">body-2</h3>
          <p class="body-2">This is body text size 2. It's the standard size for most paragraph text in your application.</p>
          <p class="caption-1 mt-2">Uses clamp(1rem, 0.9rem + 0.5vw, 1.125rem)</p>
        </div>
        
        <div class="p-4 bg-muted/20 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">body-3</h3>
          <p class="body-3">This is body text size 3. It's slightly smaller and works well for secondary information or in compact layouts.</p>
          <p class="caption-1 mt-2">Uses clamp(0.875rem, 0.85rem + 0.25vw, 0.9375rem)</p>
        </div>
        
        <div class="p-4 bg-muted/20 rounded-lg">
          <h3 class="heading-5 text-muted-foreground mb-1">body-4</h3>
          <p class="body-4">This is body text size 4. It's the smallest body text and is useful for captions, footnotes, or other tertiary content.</p>
          <p class="caption-1 mt-2">Uses clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem)</p>
        </div>
      </div>
    </section>
  </div>
</template> 