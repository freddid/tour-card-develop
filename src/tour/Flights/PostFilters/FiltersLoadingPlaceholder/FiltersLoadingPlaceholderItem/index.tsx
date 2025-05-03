import React from 'react';
import { LoadingPlaceholder } from '../../../../../components/shared/LoadingPlaceholder';
import c from './index.module.scss';

export const FiltersLoadingPlaceholderItem = () => {
  return (
    <div className={c.container}>
      <div className={c.containerItem}>
        <LoadingPlaceholder placeholderSizeClass={c.placeholderLg} />
        <LoadingPlaceholder placeholderSizeClass={c.placeholderSm} />
      </div>
      <div className={c.containerItem}>
        <LoadingPlaceholder placeholderSizeClass={c.placeholderLg} />
        <LoadingPlaceholder placeholderSizeClass={c.placeholderSm} />
      </div>
    </div>
  );
};
