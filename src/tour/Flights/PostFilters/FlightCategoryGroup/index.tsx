import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { Checkbox } from '../../../../components/shared/Checkbox';
import { Radio } from '../../../../components/shared/Radio';
import { useMainStore } from '../../../../stores';
import { FilterParams } from '../types';

import c from '../filter-group.module.scss';

export const FlightCategoryGroup = observer(function FlightCategoryGroup({
  isMobile,
}: FilterParams) {
  const F = useMainStore().flightOfferStore.filtersStore;
  const S = useMainStore().flightOfferStore;

  const onEconomyHandle = () => {
    F.toggleEconomy();
  };

  const onBusinessHandle = () => {
    F.toggleBusiness();
  };

  const resetFiltersHandle = () => {
    F.resetFlightCategoryFilters();
  };

  return (
    <div className={classNames(c.container, { [c.mobileWrapper]: isMobile })}>
      <h4 className={classNames(c.title, { [c.mobileTitle]: isMobile })}>
        Класс перелёта
      </h4>
      <div className={classNames(c.controls, { [c.mobileControls]: isMobile })}>
        {!isMobile && (
          <Radio
            checked={!F.isFlightCategoryGroupChecked}
            id='anyCategory'
            label='Любой класс'
            wrapperClass={classNames(c.control, c.withBottom)}
            onChange={resetFiltersHandle}
          />
        )}
        <Checkbox
          checked={F.isEconomyFilter}
          disabled={S.withEconomyMinPrice === null}
          id='Economy'
          label='Эконом'
          wrapperClass={classNames(c.control, { [c.mobileControl]: isMobile })}
          onChange={onEconomyHandle}
        />
        <Checkbox
          checked={F.isBusinessFilter}
          disabled={S.withBusinessMinPrice === null}
          id='business'
          label='Бизнес'
          wrapperClass={classNames(c.control, { [c.mobileControl]: isMobile })}
          onChange={onBusinessHandle}
        />
      </div>
    </div>
  );
});
