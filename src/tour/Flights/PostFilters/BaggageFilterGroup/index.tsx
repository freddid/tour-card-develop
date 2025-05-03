import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { Checkbox } from '../../../../components/shared/Checkbox';
import { Radio } from '../../../../components/shared/Radio';
import { useMainStore } from '../../../../stores';
import { FilterParams } from '../types';

import c from '../filter-group.module.scss';

export const BaggageFilterGroup = observer(function BaggageFilterGroup({
  isMobile,
}: FilterParams) {
  const F = useMainStore().flightOfferStore.filtersStore;
  const S = useMainStore().flightOfferStore;

  const onBaggageIncludedHandle = () => {
    F.setIsBaggageIncludedFilter();
  };

  const onOnlyHandBaggageHandle = () => {
    F.setOnlyHandBaggageFilter();
  };

  const onWithoutBaggageHandle = () => {
    F.setWithoutBaggageFilter();
  };

  const resetFiltersHandle = () => {
    F.resetBaggageFilters();
  };

  return (
    <div className={classNames(c.container, { [c.mobileWrapper]: isMobile })}>
      <h4 className={classNames(c.title, { [c.mobileTitle]: isMobile })}>
        Багаж
      </h4>
      <div className={classNames(c.controls, { [c.mobileControls]: isMobile })}>
        {!isMobile && (
          <Radio
            checked={!F.isBaggageGroupChecked}
            id='anyBaggage'
            label='Любой багаж'
            wrapperClass={classNames(c.control, c.withBottom)}
            onChange={resetFiltersHandle}
          />
        )}
        <Checkbox
          checked={F.isBaggageIncludedFilter}
          disabled={S.withBaggageIncludedMinPrice === null}
          id='baggageIncluded'
          label='Включён'
          wrapperClass={classNames(c.control, { [c.mobileControl]: isMobile })}
          onChange={onBaggageIncludedHandle}
        />
        <Checkbox
          checked={F.isOnlyHandBaggageFilter}
          disabled={S.withOnlyHandBaggageMinPrice === null}
          id='onlyHandBaggage'
          label='Только ручная кладь'
          wrapperClass={classNames(c.control, { [c.mobileControl]: isMobile })}
          onChange={onOnlyHandBaggageHandle}
        />
        <Checkbox
          checked={F.isWithoutBaggageFilter}
          disabled={S.withoutBaggageMinPrice === null}
          id='withoutBaggage'
          label='Без багажа'
          wrapperClass={classNames(c.control, { [c.mobileControl]: isMobile })}
          onChange={onWithoutBaggageHandle}
        />
      </div>
    </div>
  );
});
