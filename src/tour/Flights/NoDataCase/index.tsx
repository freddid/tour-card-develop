import React from 'react';
import { ElevatedContainer } from '../../../components/shared/ElevatedContainer';

import c from './index.module.scss';

export const NoDataCase = () => {
  return (
    <ElevatedContainer className={c.container}>
      <h3 className={c.title}>
        Не удалось получить подробную информацию о рейсах
      </h3>
      <p className={c.message}>
        Попробуйте найти туры на соседние даты или с вылетом из соседнего
        города.
      </p>
    </ElevatedContainer>
  );
};
