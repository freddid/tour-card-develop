import React, {
  ComponentPropsWithRef,
  HTMLProps,
  ReactNode,
  forwardRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { useScrollDisable } from '../../../hooks/useScrollDisable';
import { Portal } from '../Portal';
import { IconBackArrow } from '../../../icons/IconBackArrow';

import c from './index.module.scss';

type SliderProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  additionalControl?: ReactNode;
  applyCaption?: string;
  closeAnimationOff?: boolean;
  animationDelay?: number;
  scrollContent?: boolean;
  onClose?: () => void;
  onApply?: () => void;
};

export type Props = HTMLProps<HTMLDivElement> & SliderProps;

export const SlidePanel = forwardRef(
  (
    {
      className = '',
      isOpen,
      children,
      applyCaption = 'Применить',
      title = '',
      additionalControl,
      closeAnimationOff = false,
      animationDelay = 300,
      scrollContent = false,
      onClose,
      onApply,
    }: Props,
    ref: ComponentPropsWithRef<'aside'>['ref'],
  ) => {
    const [isStartClose, setStartClose] = useState(false);

    useScrollDisable(isOpen);

    const shouldShowBackBtn = !!onClose;
    const shouldShowApplyButton = !!onApply;
    const shouldShowFooter = shouldShowApplyButton || additionalControl;

    const onCloseHandler = (): void => {
      if (!onClose) return;
      setStartClose(true);
      const id = setTimeout(() => {
        setStartClose(false);
        onClose();
        clearTimeout(id);
      }, animationDelay);
    };

    const onApplyHandler = (): void => {
      if (!onApply) return;
      setStartClose(true);
      if (closeAnimationOff) {
        onApply();
        setStartClose(false);
      } else {
        const id = setTimeout(() => {
          setStartClose(false);
          onApply();
          clearTimeout(id);
        }, animationDelay);
      }
    };

    if (!isOpen) {
      return null;
    }

    return (
      <Portal>
        <aside
          ref={ref}
          className={classNames(c.container, className, {
            [c.isStartClose]: isStartClose,
          })}
        >
          <header className={c.header}>
            {shouldShowBackBtn && (
              <button
                className={c.backBtn}
                name='Скрыть меню'
                type='button'
                onClick={onCloseHandler}
              >
                <IconBackArrow />
              </button>
            )}
            <h3 className={c.title}>{title}</h3>
          </header>
          <div
            className={classNames(c.content, { [c.scrollable]: scrollContent })}
          >
            {children}
          </div>
          {shouldShowFooter && (
            <footer className={c.footer}>
              {additionalControl}
              {shouldShowApplyButton && (
                <button
                  className={c.applyBtn}
                  type='button'
                  onClick={onApplyHandler}
                >
                  {applyCaption}
                </button>
              )}
            </footer>
          )}
        </aside>
      </Portal>
    );
  },
);
