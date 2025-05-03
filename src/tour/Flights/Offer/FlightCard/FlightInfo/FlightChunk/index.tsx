import React from 'react';
import { DirectionType } from 'sletat-ui-components/lib/Flights/models';
import { TooltipContent } from '../../TooltipContent';
import { Tooltip } from '../../../../../../components/shared/Tooltip';
import { AirportItem } from '../../AirportItem';
import { getVerbalDate } from '../../../../../../utils/format';
import { TransfersInfo } from '../../../../types/flightType';

import c from './index.module.scss';

interface FlightChunkParams {
  flight: TransfersInfo;
  direction: DirectionType;
}

export const FlightChunk = ({ flight, direction }: FlightChunkParams) => {
  const isDirectionFrom = direction === DirectionType.From;

  const time = isDirectionFrom ? flight.arrivalTime : flight.departureTime;

  const date = isDirectionFrom ? flight.arrivalDate : flight.departureDate;

  const changedNameAirport = flight.changeCode
    ? flight.changeName
    : flight.airportToName;

  const tooltipText = isDirectionFrom ? (
    <TooltipContent
      airportName={flight.airportToName!}
      cityName={flight.airportToCityName!}
    />
  ) : (
    <TooltipContent
      airportName={changedNameAirport!}
      cityName={flight.airportToCityName!}
    />
  );

  const changedAirportCode = flight.changeCode
    ? flight.changeCode
    : flight.airportToCode;

  const airportCode = isDirectionFrom
    ? flight.airportToCode
    : changedAirportCode;

  return (
    <div className={c.flightInfo}>
      <span className={c.time}>{time}</span>
      <span className={c.date}>{getVerbalDate(date!, 'DD.MM.YYYY')}</span>
      <Tooltip content={tooltipText}>
        <AirportItem airportCode={airportCode!} />
      </Tooltip>
    </div>
  );
};
