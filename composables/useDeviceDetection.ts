import { ref, computed, onMounted, onUnmounted } from 'vue';

/**
 * Tailwind CSS breakpoints
 * xs: 0px
 * sm: 640px
 * md: 768px
 * lg: 1024px
 * xl: 1280px
 * 2xl: 1536px
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Composable to detect device size based on Tailwind CSS breakpoints
 */
export function useDeviceDetection() {
  // Initialize with server-safe value
  const width = ref(0);
  const height = ref(0);

  // Current breakpoint
  const currentBreakpoint = computed((): Breakpoint => {
    if (width.value === 0) return 'xs'; // Default on server-side
    if (width.value < BREAKPOINTS.sm) return 'xs';
    if (width.value < BREAKPOINTS.md) return 'sm';
    if (width.value < BREAKPOINTS.lg) return 'md';
    if (width.value < BREAKPOINTS.xl) return 'lg';
    if (width.value < BREAKPOINTS['2xl']) return 'xl';
    return '2xl';
  });

  // Device type
  const isMobile = computed(() => currentBreakpoint.value === 'xs' || currentBreakpoint.value === 'sm');
  const isTablet = computed(() => currentBreakpoint.value === 'md' || currentBreakpoint.value === 'lg');
  const isDesktop = computed(() => currentBreakpoint.value === 'xl' || currentBreakpoint.value === '2xl');

  // Specific breakpoint checks
  const isXs = computed(() => currentBreakpoint.value === 'xs');
  const isSm = computed(() => currentBreakpoint.value === 'sm');
  const isMd = computed(() => currentBreakpoint.value === 'md');
  const isLg = computed(() => currentBreakpoint.value === 'lg');
  const isXl = computed(() => currentBreakpoint.value === 'xl');
  const is2Xl = computed(() => currentBreakpoint.value === '2xl');

  // Min width checks (at least this breakpoint)
  const atLeastSm = computed(() => width.value >= BREAKPOINTS.sm);
  const atLeastMd = computed(() => width.value >= BREAKPOINTS.md);
  const atLeastLg = computed(() => width.value >= BREAKPOINTS.lg);
  const atLeastXl = computed(() => width.value >= BREAKPOINTS.xl);
  const atLeast2Xl = computed(() => width.value >= BREAKPOINTS['2xl']);

  // Update dimensions
  const updateDimensions = () => {
    if (typeof window !== 'undefined') {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    }
  };

  // Set up listeners with SSR check
  onMounted(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  });

  // Clean up
  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateDimensions);
    }
  });

  return {
    width,
    height,
    currentBreakpoint,
    
    // Device type
    isMobile,
    isTablet,
    isDesktop,
    
    // Specific breakpoint checks
    isXs,
    isSm,
    isMd,
    isLg, 
    isXl,
    is2Xl,
    
    // Min width checks
    atLeastSm,
    atLeastMd,
    atLeastLg,
    atLeastXl,
    atLeast2Xl,
    
    // Breakpoint constants for reference
    BREAKPOINTS,
  };
}

export default useDeviceDetection; 