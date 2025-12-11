// Patch to suppress specific THREE.js deprecation warnings
export function patchThreeDeprecation() {
  if (typeof window === 'undefined') return;
  
  const originalWarn = console.warn;
  
  console.warn = function(message, ...args) {
    // Skip the specific THREE.BufferAttribute deprecation warning
    if (typeof message === 'string' && message.includes('THREE.BufferAttribute: .length has been deprecated')) {
      return;
    }
    
    // Call the original console.warn for all other messages
    originalWarn.apply(console, [message, ...args]);
  };
  
  // Return a cleanup function to restore the original console.warn
  return () => {
    console.warn = originalWarn;
  };
}

// Apply the patch when this module is imported
patchThreeDeprecation();
