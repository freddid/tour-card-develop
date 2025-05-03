import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { Checkbox } from '../../../../components/shared/Checkbox';
import { Radio } from '../../../../components/shared/Radio';
import { useMainStore } from '../../../../stores';
import { FilterParams } from '../types';

import c from '../filter-group.module.scss';

export const ConnectionFilterGroup = observer(function ConnectionFilterGroup({
  isMobile,
}: FilterParams) {
  const F = useMainStore().flightOfferStore.filtersStore;
  const S = useMainStore().flightOfferStore;

  const withoutConnectionHandle = () => {
    F.setWithoutConnection();
  };

  const oneConnectionHandle = () => {
    F.setIsOneConnection();
  };

  const moreThanTwoConnectionHandle = () => {
    F.setMoreThanTwoConnections();
  };

  const resetFiltersHandle = () => {
    F.resetConnectionFilters();
  };

  return (
    <div className={classNames(c.container, { [c.mobileWrapper]: isMobile })}>
      <h4 className={classNames(c.title, { [c.mobileTitle]: isMobile })}>
        Пересадки
      </h4>
      <div className={classNames(c.controls, { [c.mobileControls]: isMobile })}>
        {!isMobile && (
          <Radio
            checked={!F.isConnectionGroupChecked}
            id='anyAmount'
            label='Любое количество'
            wrapperClass={classNames(c.control, c.withBottom)}
            onChange={resetFiltersHandle}
          />
        )}
        <Checkbox
          checked={F.isWithoutConnectionFilter}
          disabled={S.withoutConnectionMinPrice === null}
          id='withoutConnection'
          label='Без пересадок'
          wrapperClass={classNames(c.control, { [c.mobileControl]: isMobile })}
          onChange={withoutConnectionHandle}
        />
        <Checkbox
          checked={F.isOneConnectionFilter}
          disabled={S.withOneConnectionMinPrice === null}
          id='oneConnection'
          label='1 пересадка'
          wrapperClass={classNames(c.control, { [c.mobileControl]: isMobile })}
          onChange={oneConnectionHandle}
        />
        <Checkbox
          checked={F.isMoreThanTwoConnectionFilter}
          disabled={S.withMoreThanTwoConnectionMinPrice === null}
          id='moreConnection'
          label='2 и более пересадок'
          wrapperClass={classNames(c.control, { [c.mobileControl]: isMobile })}
          onChange={moreThanTwoConnectionHandle}
        />
      </div>
    </div>
  );
});
