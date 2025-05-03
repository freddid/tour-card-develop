import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { PostFilters } from './PostFilters/DesktopPostFilters';
import { ProgressBar } from './ProgressBar';
import { Offer } from './Offer';
import { useAdaptiveStore } from '../../stores/adaptive';
import { MobilePostFilters } from './PostFilters/MobilePostFilters';
import { useMainStore } from '../../stores';
import { NoDataCase } from './NoDataCase';
import { Target } from '../../types-and-consts';

import c from './index.module.scss';

export const Flights = observer(function Flights({
  target,
}: {
  target: Target;
}) {
  const { isMobile, device } = useAdaptiveStore();
  const { isActualizationFailed } = useMainStore().flightOfferStore;

  const content = isActualizationFailed ? (
    <NoDataCase />
  ) : (
    <>
      <ProgressBar />
      <div className={c.container}>
        {isMobile || device.isTabletSmall ? (
          <MobilePostFilters />
        ) : (
          <PostFilters />
        )}
        <Offer target={target} />
      </div>
    </>
  );

  useEffect(() => {
    useMainStore().flightOfferStore.setTarget(target);
    return () => useMainStore().flightOfferStore.disposer();
  }, []);

  return (
    <>
      <h3 className={c.title}>Перелёт: </h3>
      <div className={c.flightsWrapper}>{content}</div>
    </>
  );
});
