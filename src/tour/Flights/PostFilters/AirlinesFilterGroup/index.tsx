import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { Checkbox } from '../../../../components/shared/Checkbox';
import { Radio } from '../../../../components/shared/Radio';
import { useMainStore } from '../../../../stores';
import { FilterParams } from '../types';

import c from '../filter-group.module.scss';

export const AirlinesFilterGroup = observer(function AirlinesFilterGroup({
  isMobile,
}: FilterParams) {
  const F = useMainStore().flightOfferStore.filtersStore;
  const S = useMainStore().flightOfferStore;

  const resetFiltersHandle = () => {
    F.resetAirlineFilters();
  };

  const onChangeAirlinesHandle = (airlineName: string) => {
    F.changeAirlines(airlineName);
  };

  if (!S.airlines.length) return null;

  return (
    <div className={classNames(c.container, { [c.mobileWrapper]: isMobile })}>
      <h4 className={classNames(c.title, { [c.mobileTitle]: isMobile })}>
        Авиаперевозчик
      </h4>
      <div className={classNames(c.controls, { [c.mobileControls]: isMobile })}>
        {!isMobile && (
          <Radio
            checked={!F.selectedAirlines.length}
            id='anyCompany'
            label='Любой'
            wrapperClass={classNames(c.control, c.withBottom)}
            onChange={resetFiltersHandle}
          />
        )}
        {S.airlines?.map((a) => (
          <Checkbox
            key={a}
            checked={F.selectedAirlines.includes(a!)}
            id={a!}
            label={a!}
            wrapperClass={classNames(c.control, {
              [c.mobileControl]: isMobile,
            })}
            onChange={() => onChangeAirlinesHandle(a!)}
          />
        ))}
      </div>
    </div>
  );
});
