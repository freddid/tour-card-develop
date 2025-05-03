import { useEffect } from 'react';
import { useAdaptiveStore } from '../stores/adaptive';

/**
 * Hook for monitoring the viewport width and updating it in a state store when the window is resized.
 *
 * @returns {void}
 *
 * @example
 * ```tsx
 * import { useViewportListener } from './useViewportListener'; // Import the hook
 *
 * function MyComponent() {
 *   useViewportListener(); // Use the hook to update viewport width in your state store
 *
 *   return (
 *     // Your component JSX here
 *   );
 * }
 * ```
 */
export const useViewportListener = () => {
  const S = useAdaptiveStore();
  useEffect(() => {
    S.setViewportWidth(window.innerWidth);
    window.addEventListener('resize', () =>
      S.setViewportWidth(window.innerWidth),
    );

    return () => {
      S.dispose();
      window.removeEventListener('resize', () =>
        S.setViewportWidth(window.innerWidth),
      );
    };
  }, []);
};
