import React from 'react';
import { observer } from 'mobx-react-lite';
import { ConnectionFilterGroup } from '../ConnectionFilterGroup';
import { BaggageFilterGroup } from '../BaggageFilterGroup';
import { AirlinesFilterGroup } from '../AirlinesFilterGroup';
import { useMainStore } from '../../../../stores';
import { FlightCategoryGroup } from '../FlightCategoryGroup';
import { FiltersLoadingPlaceholder } from '../FiltersLoadingPlaceholder';

import c from '../index.module.scss';

export const PostFilters = observer(function PostFilters() {
  const S = useMainStore().flightOfferStore;

  if (S.actualizationStatus.isActualizationInProgress) {
    return <FiltersLoadingPlaceholder />;
  }

  return (
    <div className={c.container}>
      <div className={c.stickyWrapper}>
        <ConnectionFilterGroup />
        <BaggageFilterGroup />
        <FlightCategoryGroup />
        <AirlinesFilterGroup />
      </div>
    </div>
  );
});
