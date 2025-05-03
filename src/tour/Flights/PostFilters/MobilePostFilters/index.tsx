import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { SlidePanel } from '../../../../components/shared/SlidePanel';
import { useMainStore } from '../../../../stores';
import { ConnectionFilterGroup } from '../ConnectionFilterGroup';
import { BaggageFilterGroup } from '../BaggageFilterGroup';
import { FlightCategoryGroup } from '../FlightCategoryGroup';
import { AirlinesFilterGroup } from '../AirlinesFilterGroup';

import c from './index.module.scss';

export const MobilePostFilters = observer(function MobilePostFilters() {
  const S = useMainStore().flightOfferStore;

  const onApplyHandle = useCallback(() => {
    S.ui.setIsMobileFiltersOpen(false);
  }, []);

  return (
    <SlidePanel
      scrollContent
      isOpen={S.ui.isMobileFiltersOpen}
      title='Фильтры'
      onApply={onApplyHandle}
      onClose={onApplyHandle}
    >
      <div className={c.filtersWrapper}>
        <ConnectionFilterGroup isMobile />
        <BaggageFilterGroup isMobile />
        <FlightCategoryGroup isMobile />
        <AirlinesFilterGroup isMobile />
      </div>
    </SlidePanel>
  );
});
