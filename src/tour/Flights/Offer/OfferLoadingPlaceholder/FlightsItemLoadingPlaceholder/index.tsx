import React from 'react';
import { LoadingPlaceholder } from '../../../../../components/shared/LoadingPlaceholder';
import { IconBaggage, IconLuggage } from '../../../../../icons/IconBaggage';

import c from './index.module.scss';

export const FlightsItemLoadingPlaceholder = () => {
  return (
    <div className={c.flightsItem}>
      <div className={c.directionsContainer}>
        <div>
          <div className={c.time}>--:--</div>
          <LoadingPlaceholder placeholderSizeClass={c.placeholderTime} />
        </div>
        <div className={c.route}>
          <div className={c.point} />
          <div className={c.line} />
          <div className={c.point} />
        </div>
        <div>
          <div className={c.time}>--:--</div>
          <LoadingPlaceholder placeholderSizeClass={c.placeholderTime} />
        </div>
      </div>
      <div className={c.baggageIconsContainer}>
        <div className={c.baggageIconsContainerItem}>
          <IconBaggage color='currentColor' />
        </div>
        <div className={c.baggageIconsContainerItem}>
          <IconLuggage color='currentColor' />
        </div>
      </div>
    </div>
  );
};
