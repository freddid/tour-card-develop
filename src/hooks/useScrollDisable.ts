import { useEffect } from 'react';
import { getModule6IframeWindow } from '../utils';

export const useScrollDisable = (status: boolean) => {
  const frame = getModule6IframeWindow();
  const body = frame?.querySelector('body');
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (body) {
      if (status) {
        body.style.overflow = 'hidden';
      }

      return () => {
        body.style.overflow = 'visible';
      };
    }
  }, [status]);
};
