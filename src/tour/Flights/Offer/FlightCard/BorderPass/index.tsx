import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { formatPriceDisplay } from '../../../../../utils/formatPriceDisplay';
import { IconCheck } from '../../../../../icons/IconCheck';
import { IconRUBText } from '../../../../../icons/IconRUBText';
import { useAdaptiveStore } from '../../../../../stores/adaptive';
import c from './index.module.scss';

interface BorderPassParams {
  originalPrice: number;
  surchargeAmount: number;
  isSelected: boolean;
  onFlightItemSelect: () => void;
}

export const BorderPass = observer(function BorderPass({
  originalPrice = 0,
  surchargeAmount = 0,
  isSelected,
  onFlightItemSelect,
}: BorderPassParams) {
  const { device } = useAdaptiveStore();

  return (
    <div className={c.container}>
      <div className={c.priceInner}>
        <div className={c.price}>
          <span className={c.priceTitle}>Доплата</span>
          <span className={c.priceNumber}>
            {surchargeAmount > 0 && '+'}&nbsp;
            {formatPriceDisplay(surchargeAmount)}&nbsp;
            <IconRUBText />
          </span>
        </div>
        <div className={classNames(c.price, c.priceAddition)}>
          <span className={c.priceTitle}>Цена&nbsp;с&nbsp;доплатой</span>
          <span className={c.priceNumber}>
            {formatPriceDisplay(originalPrice + surchargeAmount)}&nbsp;
            <IconRUBText />
          </span>
        </div>
      </div>

      <button
        className={classNames(c.buyBtn, { [c.btnSelected]: isSelected })}
        type='button'
        onClick={onFlightItemSelect}
      >
        {isSelected ? (
          <span className={c.buyBtnContent}>
            {!device.isSuperMobile && <IconCheck className={c.icon} />}
            <span>Перелёт выбран</span>
          </span>
        ) : (
          <span>Выбрать перелёт</span>
        )}
      </button>
    </div>
  );
});
