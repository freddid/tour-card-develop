import React from 'react';
import { LoadingPlaceholder } from '../../../../components/shared/LoadingPlaceholder';
import { FlightsItemLoadingPlaceholder } from './FlightsItemLoadingPlaceholder';
import c from './index.module.scss';

export const OfferLoadingPlaceholder = () => {
  return (
    <div className={c.card}>
      <div className={c.flights}>
        <FlightsItemLoadingPlaceholder />
        <FlightsItemLoadingPlaceholder />
      </div>
      <div className={c.divider} />
      <div className={c.cardFooter}>
        <div className={c.cardFooterItem}>
          <LoadingPlaceholder placeholderSizeClass={c.placeholderPrice} />
          <LoadingPlaceholder placeholderSizeClass={c.placeholderPrice} />
        </div>
        <LoadingPlaceholder placeholderSizeClass={c.placeholderBtn} />
      </div>
    </div>
  );
};
