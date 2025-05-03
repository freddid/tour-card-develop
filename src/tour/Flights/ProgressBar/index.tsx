import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useMainStore } from '../../../stores';

import c from './index.module.scss';

export const ProgressBar = observer(function ProgressBar() {
  const S = useMainStore().flightOfferStore;

  if (S.actualizationStatus.isActualizationInProgress) {
    return (
      <div className={c.container}>
        <span className={c.text}>Ищем подходящие рейсы</span>
        <div
          className={c.progressBar}
          style={{
            width: `${S.ui.actualizationProgress}%`,
          }}
        />
      </div>
    );
  }

  return null;
});
