import React from 'react';
import classNames from 'classnames';
import c from './index.module.scss';

export const AirportItem = ({
  airportCode,
  className = '',
}: {
  airportCode: string;
  className?: string;
}) => {
  return (
    <span className={classNames(c.airPortItem, className)}>{airportCode}</span>
  );
};
