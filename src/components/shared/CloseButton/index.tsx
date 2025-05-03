import React from 'react';
import classNames from 'classnames';

import c from './index.module.scss';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

export const CloseButton = ({ onClick, className = '' }: CloseButtonProps) => (
  <button
    className={classNames(c.closeBtn, className)}
    name='Закрыть'
    type='button'
    onClick={onClick}
  >
    Закрыть
  </button>
);
