import React from 'react';
import { STATIC_HOST_NAME } from '../../../../../consts/hosts';
import c from './index.module.scss';

interface TooltipContentProps {
  airportName: string;
  cityName: string;
  airlineName?: string;
  airlineId?: number | string | null;
  flightNumber?: number | string;
  flightClass?: string | null;
}

export const TooltipContent = ({
  airportName,
  cityName,
  airlineName,
  airlineId,
  flightNumber,
  flightClass,
}: TooltipContentProps) => {
  return (
    <div className={c.tooltipContainer}>
      {airlineId && (
        <div className={c.logo}>
          <img
            alt='логотип авиакомпании'
            className={c.logoImage}
            src={`//${STATIC_HOST_NAME}/images/avia/${airlineId}_2x.png`}
          />
        </div>
      )}
      <div>
        <span>{airportName},&ensp;</span>
        <span>{cityName}</span>
      </div>
      {airlineName && <span className={c.airlineName}>{airlineName}</span>}
      <div>
        {flightNumber && <span>рейс {flightNumber},&ensp;</span>}
        {flightClass && <span>{flightClass}</span>}
      </div>
    </div>
  );
};
