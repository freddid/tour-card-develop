import React, { memo } from 'react';
import { FlightItem } from 'sletat-api-services/lib/module/flights/models';
import classNames from 'classnames';
import { getVerbalDate } from '../../../../../utils/format';

import c from './index.module.scss';

interface DateTimeParams {
  flightTo: FlightItem;
  flightFrom: FlightItem;
  start: boolean;
  isNoConcrete: boolean;
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export const DateTime = memo(function DateTime({
  flightTo,
  flightFrom,
  start,
  isNoConcrete,
  top = false,
  bottom = false,
  className = '',
}: DateTimeParams) {
  const getProperty = (
    start: boolean,
    flight: FlightItem,
    propStart: keyof FlightItem,
    propEnd: keyof FlightItem,
  ): string => {
    return start ? (flight[propStart] as string) : (flight[propEnd] as string);
  };

  const data = {
    timeTop: getProperty(start, flightTo, 'startTime', 'endTime'),
    cityTop: getProperty(
      start,
      flightTo,
      'airportFromCityName',
      'airportToCityName',
    ),
    dateTop: getProperty(start, flightTo, 'startDate', 'endDate'),
    timeBottom: getProperty(start, flightFrom, 'startTime', 'endTime'),
    cityBottom: getProperty(
      start,
      flightFrom,
      'airportFromCityName',
      'airportToCityName',
    ),
    dateBottom: getProperty(start, flightFrom, 'startDate', 'endDate'),
  };

  return (
    <div className={classNames(c.container, className)}>
      {top && (
        <div className={c.containerItem}>
          <span
            className={classNames(c.time, {
              [c.timeNoConcrete]: isNoConcrete,
            })}
          >
            {isNoConcrete ? '--:--' : data.timeTop}
          </span>
          <span>{data.cityTop}</span>
          <span className={c.date}>
            {getVerbalDate(data.dateTop!, 'D MMM’ YYYY, dd')}
          </span>
        </div>
      )}
      {bottom && (
        <div className={c.containerItem}>
          <span
            className={classNames(c.time, {
              [c.timeNoConcrete]: isNoConcrete,
            })}
          >
            {isNoConcrete ? '--:--' : data.timeBottom}
          </span>
          <span>{data.cityBottom}</span>
          <span className={c.date}>
            {getVerbalDate(data.dateBottom!, 'D MMM’ YYYY, dd')}
          </span>
        </div>
      )}
    </div>
  );
});
