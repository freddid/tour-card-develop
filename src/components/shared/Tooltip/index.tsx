import React, { MutableRefObject, ReactNode, useRef } from 'react';
import cl from 'classnames';
import { useHover } from '../../../hooks/useHover.hook';

import c from './index.module.scss';

interface TooltipProps {
  // Содержание самого Tooltip
  content: ReactNode;

  // Компонент, который будет обернут в Tooltip
  children: ReactNode;
  className?: string;
  shouldShow?: boolean;
  classNameAdditionalContent?: string;
}

const TRIANGLE_HEIGHT = 9;
const OFFSET_VERTICAL = 4;

export const Tooltip = ({
  shouldShow = true,
  children,
  content,
  className = '',
  classNameAdditionalContent = '',
}: TooltipProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const isHovering = useHover(ref as unknown as MutableRefObject<HTMLElement>);

  const height = ref.current?.getBoundingClientRect()?.height ?? 0;

  const position = {
    top: height + OFFSET_VERTICAL + TRIANGLE_HEIGHT,
  };

  return (
    <div ref={ref} className={cl(c.container, className)}>
      {isHovering && shouldShow && (
        <div
          className={cl(c.tooltip, classNameAdditionalContent)}
          style={position}
        >
          {content}
        </div>
      )}
      {children}
    </div>
  );
};
