/* eslint-disable react/no-unused-prop-types */
import React, { useMemo, useState } from 'react';
import { FlightItem } from 'sletat-api-services/lib/module/flights/models';
import classNames from 'classnames';
import { Tooltip } from '../../../../../components/shared/Tooltip';
import { TooltipContent } from '../TooltipContent';
import { TransferBtn } from './TransferButton';
import { AirportItem } from '../AirportItem';
import { FlightInfo } from '../FlightInfo';
import { FlightHelper } from '../../../helper/Flights';
import { TransfersInfo } from '../../../types/flightType';
import { IconAirplane } from '../../../../../icons/IconAirplane';
import c from './index.module.scss';

interface RouteParams {
  flights: FlightItem[];
  isNoConcrete: boolean;
  className?: string;
  returnWay?: boolean;
}

export const Route = ({
  flights,
  isNoConcrete,
  className = '',
  returnWay = false,
}: RouteParams) => {
  const [isFlightInfoOpen, setIsFlightInfoOpen] = useState(false);
  const {
    airportFromCode,
    airportFromName,
    airportFromCityName,
    airlineName: airlineNameFrom,
    airlineId: airlineIdFrom,
    ticketsClass: ticketsClassFrom,
    flight: flightFrom,
  } = flights[0];
  const {
    airportToCode,
    airportToName,
    airportToCityName,
    airlineName: airlineNameTo,
    airlineId: airlineIdTo,
    ticketsClass: ticketsClassTo,
    flight: flightTo,
  } = flights[flights.length - 1];

  const transfers: TransfersInfo[] = useMemo(
    () => FlightHelper.getTransfersInfo(flights),
    [flights],
  );

  const duration: string = useMemo(
    () => FlightHelper.getFlightDuration(flights),
    [flights],
  );

  const moreThanOneTransfer = transfers.length > 1;

  const onTransferClickHandle = (): void => {
    if (transfers.length === 0) return;
    setIsFlightInfoOpen(true);
  };

  const renderMiddleTransfer = () => {
    const midPoint = flights[1];
    if (moreThanOneTransfer) {
      return (
        <div className={c.routeItemAirportMoreThanOne}>
          <div className={c.point} />
          <AirportItem airportCode='...' className={c.pointAirportName} />
        </div>
      );
    }
    return (
      <Tooltip
        className={c.routeItem}
        shouldShow={!isNoConcrete}
        content={
          <TooltipContent
            airportName={midPoint.airportFromName!}
            cityName={midPoint.airportFromCityName!}
          />
        }
      >
        <div className={c.point} />
        <AirportItem
          airportCode={midPoint.airportFromCode!}
          className={c.pointAirportName}
        />
      </Tooltip>
    );
  };

  return (
    <div className={classNames(c.container, className)}>
      <div className={c.transferAmount}>
        <TransferBtn
          isNoConcrete={isNoConcrete}
          transferAmount={transfers.length}
          icon={
            <IconAirplane
              className={classNames(c.iconAirplane, {
                [c.returnWay]: returnWay,
              })}
            />
          }
          onClick={onTransferClickHandle}
        />
      </div>
      {!isNoConcrete && (
        <span className={c.duration}>Всего&nbsp;{duration}</span>
      )}
      <div className={c.route}>
        <Tooltip
          shouldShow={!isNoConcrete}
          className={classNames(c.routeItem, {
            [c.routeItemNoConcrete]: isNoConcrete,
          })}
          content={
            <TooltipContent
              airlineId={airlineIdFrom!}
              airlineName={airlineNameFrom!}
              airportName={airportFromName!}
              cityName={airportFromCityName!}
              flightClass={ticketsClassFrom!}
              flightNumber={flightFrom!}
            />
          }
        >
          <div className={c.point} />
          {!isNoConcrete && (
            <AirportItem
              airportCode={airportFromCode!}
              className={c.pointAirportName}
            />
          )}
        </Tooltip>
        {!!transfers.length && renderMiddleTransfer()}
        <Tooltip
          shouldShow={!isNoConcrete}
          className={classNames(c.routeItem, {
            [c.routeItemNoConcrete]: isNoConcrete,
          })}
          content={
            <TooltipContent
              airlineId={airlineIdTo!}
              airlineName={airlineNameTo!}
              airportName={airportToName!}
              cityName={airportToCityName!}
              flightClass={ticketsClassTo!}
              flightNumber={flightTo!}
            />
          }
        >
          <div className={c.point} />
          {!isNoConcrete && (
            <AirportItem
              airportCode={airportToCode!}
              className={c.pointAirportName}
            />
          )}
        </Tooltip>
      </div>
      {isFlightInfoOpen && (
        <FlightInfo
          returnWay={returnWay}
          transfers={transfers}
          onClose={() => {
            setIsFlightInfoOpen(false);
          }}
        />
      )}
    </div>
  );
};
