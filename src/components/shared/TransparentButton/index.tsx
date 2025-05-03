import React, { ReactNode } from 'react';
import cl from 'classnames';

import c from './index.module.scss';

interface TransparentButtonParams {
  caption: ReactNode;
  className?: string;
  onClick: () => void;
}

export const TransparentButton = ({
  caption,
  className = '',
  onClick,
}: TransparentButtonParams) => {
  return (
    <button
      className={cl(c.container, className)}
      type='button'
      onClick={onClick}
    >
      {caption}
    </button>
  );
};
