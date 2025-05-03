import { RefObject, useEffect } from 'react';
import { getModule6IframeWindow } from '../utils';

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  cb: () => void,
) => {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // Ибо все происходит в iframe
    const frame = getModule6IframeWindow();
    if (frame) {
      const listener = (e: MouseEvent): void => {
        if (!ref.current || ref.current.contains(e.target as Node)) {
          return;
        }
        cb();
      };
      // @ts-ignore
      frame.addEventListener('click', listener);
      return () => {
        // @ts-ignore
        frame.removeEventListener('click', listener);
      };
    }
  }, [ref, cb]);
};
