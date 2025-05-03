import React, { HTMLProps, ReactNode, useRef } from 'react';
import classNames from 'classnames';
import { CloseButton } from '../../../../../components/shared/CloseButton';
import { useClickOutside } from '../../../../../hooks/useClickOutside.hook';

import c from './index.module.scss';

interface FlightCardPopupParams {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

type Props = FlightCardPopupParams &
  Omit<HTMLProps<HTMLDivElement>, keyof FlightCardPopupParams>;

export const FlightCardModal = ({
  children,
  onClose,
  className = '',
  ...props
}: Props) => {
  const ref = useRef(null);

  useClickOutside(ref, onClose);

  return (
    <div ref={ref} className={classNames(c.container, className)} {...props}>
      <CloseButton onClick={onClose} />
      {children}
    </div>
  );
};
