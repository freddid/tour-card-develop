import React from 'react';
import { FiltersLoadingPlaceholderItem } from './FiltersLoadingPlaceholderItem';
import c from './index.module.scss';

export const FiltersLoadingPlaceholder = () => {
  return (
    <div className={c.filtersPlaceholder}>
      <div className={c.filtersPlaceholderTitle}>Фильтры</div>
      <FiltersLoadingPlaceholderItem />
      <FiltersLoadingPlaceholderItem />
    </div>
  );
};
