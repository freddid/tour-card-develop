import { useViewportListener } from '../hooks/useViewportListener';

export const AdaptiveInitializer = (): null => {
  useViewportListener();
  return null;
};
