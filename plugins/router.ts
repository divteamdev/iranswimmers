import { useRouter } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', (vueApp) => {
    // Get the router instance
    const router = useRouter();
    
    // Override the default scrollBehavior
    router.options.scrollBehavior = (to, from, savedPosition) => {
      // If the hash is #search, don't try to scroll to an element
      if (to.hash === '#search') {
        return false; // Prevents scrolling behavior for #search
      }
      
      // For other hashes, use the default scrolling behavior
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth'
        }
      }
      
      // Return to saved position if navigating back/forward
      if (savedPosition) {
        return savedPosition;
      }
      
      // Default: scroll to top
      return { top: 0 }
    };
  });
}); 