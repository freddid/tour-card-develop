import React from 'react';
import { TransparentButton } from '../../../../components/shared/TransparentButton';
import { useMainStore } from '../../../../stores';
import { ElevatedContainer } from '../../../../components/shared/ElevatedContainer';

import c from './index.module.scss';

export const NoFlightCase = () => {
  const onResetHandle = (): void =>
    useMainStore().flightOfferStore.filtersStore.resetAllFilters();

  return (
    <ElevatedContainer className={c.container}>
      <h3 className={c.title}>
        Мы не нашли ни одного перелёта под ваши фильтры
      </h3>
      <p className={c.message}>Начните новый поиск, сбросив все фильтры</p>
      <TransparentButton
        className={c.resetButton}
        caption={
          <span className={c.resetButtonCaption}>Сбросить все фильтры</span>
        }
        onClick={onResetHandle}
      />
    </ElevatedContainer>
  );
};
