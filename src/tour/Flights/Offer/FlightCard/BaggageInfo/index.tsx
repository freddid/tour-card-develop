import React, { HTMLProps } from 'react';
import { FlightCardModal } from '../FlightCardModal';
import {
  BaggageLabel,
  BaggageInfo as _BaggageInfo,
} from '../../../types/flightType';
import { IconBaggage, IconLuggage } from '../../../../../icons/IconBaggage';
import { TooltipContent } from '../TooltipContent';
import { Tooltip } from '../../../../../components/shared/Tooltip';
import { AirportItem } from '../AirportItem';
import { getVerbalCharterPlaces } from '../../../../../utils/format';
import { ConnectingFlight } from '../../../../../icons/IconConnectingFlight';

import c from './index.module.scss';

interface BaggageInfoParams extends HTMLProps<HTMLDivElement> {
  baggageData: _BaggageInfo[];
  onClose: () => void;
}

export const BaggageInfo = ({ baggageData, onClose }: BaggageInfoParams) => {
  return (
    <FlightCardModal className={c.container} onClose={onClose}>
      <div className={c.title}>
        <IconBaggage className={c.baggageIcon} height={20} width={11} />
        <IconLuggage height={11} width={11} />
        <span className={c.caption}>Багаж и ручная кладь</span>
      </div>
      {baggageData.map((it, idx) => {
        return (
          <div key={`${idx + 1}_baggageDetail`} className={c.detailItem}>
            <div className={c.detailTitle}>
              <div className={c.detailTitleIcons}>
                <Tooltip
                  content={
                    <TooltipContent
                      airportName={it.airportFromName}
                      cityName={it.airportFromCityName}
                    />
                  }
                >
                  <AirportItem airportCode={it.flight[0]} />
                </Tooltip>
                -
                <Tooltip
                  content={
                    <TooltipContent
                      airportName={it.airportToName}
                      cityName={it.airportToCityName}
                    />
                  }
                >
                  <AirportItem airportCode={it.flight[1]} />
                </Tooltip>
              </div>
              <span className={c.airlineName}>{it.airlineName}</span>
            </div>
            {it.baggagePlaces ? (
              <div className={c.baggageDescription}>
                <div className={c.baggageDescriptionTitle}>
                  <IconBaggage height={20} width={11} />
                  <span className={c.caption}>Багаж</span>
                </div>
                <p className={c.baggageDescriptionText}>
                  {it.baggagePlaces} {getVerbalCharterPlaces(it.baggagePlaces)}
                  &nbsp; багажа на человека.
                </p>
                {!!it.baggageWeight && (
                  <p className={c.baggageDescriptionText}>
                    До {it.baggageWeight}&nbsp;кг на человека.
                  </p>
                )}
                {!!it.baggageSize && (
                  <p className={c.baggageDescriptionText}>
                    Размер:&nbsp;{it.baggageSize}.
                  </p>
                )}
              </div>
            ) : (
              <div className={c.baggageDescriptionTitle}>
                <IconBaggage height={20} width={11} />
                <span className={c.caption}>
                  {BaggageLabel.BaggageNotIncluded}
                </span>
              </div>
            )}
            {it.handBaggagePlaces ? (
              <div className={c.baggageDescription}>
                <div className={c.baggageDescriptionTitle}>
                  <IconLuggage height={11} width={11} />
                  <span className={c.caption}>Ручная кладь</span>
                </div>
                <p className={c.baggageDescriptionText}>
                  {it.handBaggagePlaces}{' '}
                  {getVerbalCharterPlaces(it.handBaggagePlaces)} багажа на
                  человека.
                </p>
                {!!it.handBaggageWeight && (
                  <p className={c.baggageDescriptionText}>
                    До {it.handBaggageWeight}&nbsp;кг на человека.
                  </p>
                )}
                {!!it.handBaggageSize && (
                  <p className={c.baggageDescriptionText}>
                    Размер: {it.handBaggageSize}
                  </p>
                )}
              </div>
            ) : (
              <div className={c.baggageDescriptionTitle}>
                <IconBaggage height={20} width={11} />
                <span className={c.caption}>
                  {BaggageLabel.HandBaggageNotIncluded}
                </span>
              </div>
            )}
            {idx !== baggageData.length - 1 && (
              <div className={c.divider}>
                <ConnectingFlight color='currentColor' />{' '}
                <span className={c.caption}>Пересадка</span>
              </div>
            )}
          </div>
        );
      })}
    </FlightCardModal>
  );
};
