import { useCallback, useEffect } from 'react';
import { useIframeWindow } from './useIframeWindow';

/**
 * блокировка скролла у body c расчетом ширины скролла
 */
export const useHideScrollBody = () => {
  const window = useIframeWindow();

  useEffect(() => {
    if (window) {
      const { body } = window.document;
      body.style.setProperty(
        '--scroll-width',
        `${window.innerWidth - body.getBoundingClientRect().width}px`,
      );
    }
  }, [window]);

  const hideScroll = useCallback(() => {
    if (window) window.document.body.classList.add('disableScroll');
  }, [window]);

  const resetScroll = useCallback(() => {
    if (window) window.document.body.classList.remove('disableScroll');
  }, [window]);

  return [hideScroll, resetScroll];
};
