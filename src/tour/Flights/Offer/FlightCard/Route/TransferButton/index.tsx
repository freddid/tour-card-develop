import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { getVerbalTransfers } from '../../../../../../utils/format';

import c from './index.module.scss';

interface TransferBtnParams {
  transferAmount: number;
  isNoConcrete: boolean;
  icon?: ReactNode;
}

type Props = TransferBtnParams &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof TransferBtnParams>;

export const TransferBtn = ({
  transferAmount,
  icon,
  className = '',
  isNoConcrete,
  ...props
}: Props) => {
  const getCaption = (): string => {
    return transferAmount
      ? `${transferAmount} ${getVerbalTransfers(transferAmount)}`
      : 'Прямой перелёт';
  };

  return (
    <button
      type='button'
      className={classNames(c.transferBtn, className, {
        [c.directFlight]: !transferAmount,
        [c.transferBtnNoConcrete]: isNoConcrete,
      })}
      {...props}
    >
      {icon}
      <span className={c.caption}>
        {isNoConcrete ? 'Нет точных данных' : getCaption()}
      </span>
    </button>
  );
};
