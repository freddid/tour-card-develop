import React, { memo } from 'react';
import { FlightsParsedData } from 'sletat-api-services/lib/module/flights/models';
import classNames from 'classnames';
import { DateTime } from './DateTime';
import { Route } from './Route';
import { Baggage } from './Baggage';
import { BorderPass } from './BorderPass';
import { IconQuestion } from '../../../../icons/IconQuestion';
import c from './index.module.scss';

export interface FlightsCardParams {
  isTourHasFlightsWithConcretization: boolean;
  pack: FlightsParsedData;
  originalPrice: number;
  surchargeAmount: number;
  operatorId?: number;
  onFlightItemSelect: () => void;
  isSelected: boolean;
}

export const FlightCard = memo(
  function FlightCard({
    pack,
    isSelected,
    operatorId,
    isTourHasFlightsWithConcretization,
    originalPrice,
    surchargeAmount,
    onFlightItemSelect,
  }: FlightsCardParams) {
    const { to, from, isChecked } = pack;
    const isNoConcrete = !!(
      isChecked &&
      operatorId &&
      isTourHasFlightsWithConcretization
    );
    const arrFrom = from[0];
    const arrTo = to[0];
    const arrFromReturnWay = from[from.length - 1];
    const arrToReturnWay = to[to.length - 1];

    return (
      <li
        className={classNames(c.container, {
          [c.selected]: isSelected,
        })}
      >
        {isNoConcrete && (
          <div className={c.noteNoConcreteFlight}>
            <span>Время и аэропорт вылета вам сообщат за 1–5 дней</span>
            <IconQuestion className={c.icon} />
          </div>
        )}
        <div className={c.ticketBody}>
          <DateTime
            start
            top
            className={c.dateTimeTopFrom}
            flightFrom={arrFrom}
            flightTo={arrTo}
            isNoConcrete={isNoConcrete}
          />
          <Route
            className={c.routeTo}
            flights={to}
            isNoConcrete={isNoConcrete}
          />
          <DateTime
            top
            className={c.dateTimeTopTo}
            flightFrom={arrFromReturnWay}
            flightTo={arrToReturnWay}
            isNoConcrete={isNoConcrete}
            start={false}
          />
          <Baggage
            className={c.baggageTo}
            isNoConcrete={isNoConcrete}
            pack={to}
          />
          <DateTime
            bottom
            start
            className={c.dateTimeBottomFrom}
            flightFrom={arrFrom}
            flightTo={arrTo}
            isNoConcrete={isNoConcrete}
          />
          <Route
            returnWay
            className={c.routeFrom}
            flights={from}
            isNoConcrete={isNoConcrete}
          />
          <DateTime
            bottom
            className={c.dateTimeBottomTo}
            flightFrom={arrFromReturnWay}
            flightTo={arrToReturnWay}
            isNoConcrete={isNoConcrete}
            start={false}
          />
          <Baggage
            className={c.baggageFrom}
            isNoConcrete={isNoConcrete}
            pack={from}
          />
        </div>

        <div className={c.divider} />
        <BorderPass
          isSelected={isSelected}
          originalPrice={originalPrice}
          surchargeAmount={surchargeAmount}
          onFlightItemSelect={onFlightItemSelect}
        />
      </li>
    );
  },
  (prev, next) => {
    return prev.isSelected === next.isSelected;
  },
);
