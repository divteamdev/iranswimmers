# Modern Fluid Typography for Tailwind CSS 4

This project implements a modern fluid typography system that works with Tailwind CSS 4, using CSS `clamp()` for smooth scaling across all viewport sizes without relying on breakpoint-specific adjustments.

## How It Works

The fluid typography system is defined in `assets/css/responsive-typography.css`. It leverages:

1. CSS variables to define fluid type scales using `clamp()`
2. Tailwind CSS 4's utilities layer to make typography classes available with responsive prefixes when needed

### The Power of clamp()

The CSS `clamp()` function is used to create truly fluid typography:

```css
clamp(MIN, PREFERRED, MAX)
```

- **MIN**: Smallest font size (for mobile screens)
- **PREFERRED**: The fluid part that scales with viewport width
- **MAX**: Largest font size (for desktop screens)

For example, our heading-1 class uses:

```css
--fluid-h1: clamp(2.25rem, 1.35rem + 4.5vw, 4rem);
```

This creates a font size that:
- Never gets smaller than 2.25rem (36px)
- Never gets larger than 4rem (64px)
- Smoothly scales between these sizes based on viewport width

## Key Features

1. **Truly Fluid Typography** - Font sizes scale smoothly between minimum and maximum values, eliminating sudden jumps between breakpoints.

2. **Still Compatible with Tailwind Responsive Prefixes** - You can still use responsive prefixes like `md:` and `lg:` when you need different styles at specific breakpoints.

3. **Consistent Type Scale** - Typography follows a consistent scale with good visual hierarchy:
   - Headings: `heading-1` through `heading-5`
   - Body text: `body-1` through `body-4`
   - Display text: `text-display-1` and `text-display-2`

4. **Fluid Type Scale Utilities** - Additional utilities with descriptive names: `fluid-type-xs` through `fluid-type-6xl`

5. **Fluid Line Heights** - The `leading-fluid` class provides line height that scales with viewport for enhanced readability.

## Usage Examples

### Basic Fluid Typography (Automatically Scales)

```html
<h1 class="heading-1">This heading scales smoothly with viewport</h1>
<p class="body-2">This body text also scales fluidly</p>
```

### Combined Approach (Fluid Base with Responsive Overrides)

```html
<!-- Uses fluid scaling within each breakpoint -->
<h1 class="heading-5 md:heading-3 lg:heading-1">
  Fluid + Responsive Typography
</h1>

<!-- Fluid text with responsive font weight -->
<p class="fluid-type-xl font-normal md:font-medium lg:font-bold">
  Text with responsive weight
</p>
```

## Available Classes

### Fluid Headings

- `heading-1` - Largest heading: clamp(2.25rem, 1.35rem + 4.5vw, 4rem)
- `heading-2` - Second level: clamp(1.875rem, 1.2rem + 3.4vw, 3.5rem)
- `heading-3` - Third level: clamp(1.5rem, 1rem + 2.5vw, 3rem)
- `heading-4` - Fourth level: clamp(1.25rem, 0.9rem + 1.8vw, 2.25rem)
- `heading-5` - Fifth level: clamp(1.125rem, 0.85rem + 1.4vw, 1.75rem)

### Fluid Body Text

- `body-1` - Large body text: clamp(1.125rem, 0.95rem + 0.9vw, 1.5rem)
- `body-2` - Regular body text: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)
- `body-3` - Small body text: clamp(0.875rem, 0.85rem + 0.25vw, 0.9375rem)
- `body-4` - Extra small: clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem)

### Fluid Display Text

- `text-display-1` - Very large: clamp(2.5rem, 1.2rem + 6.5vw, 5rem)
- `text-display-2` - Large: clamp(2rem, 1rem + 5vw, 4rem)

### Fluid Type Utilities

- `fluid-type-xs` through `fluid-type-6xl` - A comprehensive scale of fluid type sizes

### Font Weights

- `font-light` (300)
- `font-normal` (400)
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)

### Line Heights

- `leading-tight` (1.2)
- `leading-normal` (1.5)
- `leading-relaxed` (1.625)
- `leading-loose` (1.75)
- `leading-fluid` - Scales with viewport: calc(1.2em + 0.2vw)

## Demo Page

You can view all of these typography styles in action on the `/typography-demo` page. 