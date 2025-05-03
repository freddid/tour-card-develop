import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { useMainStore } from '../../../../stores';
import {
  getVerbalCharterFlights,
  getVerbalRegularFlights,
} from '../../../../utils/format';
import { useAdaptiveStore } from '../../../../stores/adaptive';
import { IconFilter } from '../../../../icons/IconFilter';

import c from './index.module.scss';

export const OfferHeader = observer(function OfferHeader() {
  const S = useMainStore().flightOfferStore;
  const { isMobile, device } = useAdaptiveStore();
  const flightsAmount = S.availablePackages.length;
  const allFlags = S.actualizedInfo.getAllFlags;
  const flightType = allFlags.FlightRegular
    ? getVerbalRegularFlights(flightsAmount)
    : getVerbalCharterFlights(flightsAmount);

  const shouldShowFiltersButton = isMobile || device.isTabletSmall;
  return (
    <div
      className={classNames(c.container, {
        [c.containerMobile]: shouldShowFiltersButton,
      })}
    >
      <span className={c.listTitle}>
        Нашли&nbsp;{flightsAmount}&nbsp;{flightType}
      </span>
      {shouldShowFiltersButton && (
        <button
          className={c.filterButton}
          type='button'
          onClick={() => S.ui.setIsMobileFiltersOpen(true)}
        >
          <IconFilter />
          <span>Фильтры</span>
        </button>
      )}
    </div>
  );
});
