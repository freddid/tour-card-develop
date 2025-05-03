import * as React from 'react';
import * as classNames from 'classnames';

import c from './index.module.scss';

interface LoadingPlaceholderParams {
  placeholderSizeClass?: string;
}

export const LoadingPlaceholder = ({
  placeholderSizeClass = '',
}: LoadingPlaceholderParams) => {
  return <span className={classNames(c.placeholder, placeholderSizeClass)} />;
};
