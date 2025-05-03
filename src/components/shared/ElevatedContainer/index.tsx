import React, { ReactNode } from 'react';
import cl from 'classnames';

import c from './index.module.scss';

export const ElevatedContainer = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cl(c.container, className)}>{children}</div>;
};
