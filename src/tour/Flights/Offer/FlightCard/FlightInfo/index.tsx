import React from 'react';
import { DirectionType } from 'sletat-api-services/lib/module/flights/models';
import classNames from 'classnames';
import { FlightChunk } from './FlightChunk';
import {
  formatDateStringToIsoString,
  getVerbalTransfers,
} from '../../../../../utils/format';
import { TransfersInfo } from '../../../types/flightType';
import { getDiffTime } from '../../../../../utils/getDiffTime';
import { addZeroBeforeNumber } from '../../../../../utils/getMinutes';
import { FlightCardModal } from '../FlightCardModal';
import { IconInfo } from '../../../../../icons/IconInfo';
import { IconAirplane } from '../../../../../icons/IconAirplane';

import c from './index.module.scss';

interface FlightInfoParams {
  transfers: TransfersInfo[];
  onClose: () => void;
  returnWay: boolean;
}

export const FlightInfo = ({
  transfers,
  onClose,
  returnWay,
}: FlightInfoParams) => {
  return (
    <FlightCardModal className={c.flightContainer} onClose={onClose}>
      {transfers.map((f, idx) => {
        const { hours, minutes } = getDiffTime(
          formatDateStringToIsoString(f.arrivalDate, f.arrivalTime),
          formatDateStringToIsoString(f.departureDate, f.departureTime),
        );

        return (
          <div key={f.id} className={c.flightItem}>
            <div className={c.transferBtn}>
              <IconAirplane
                className={classNames(c.iconAirplane, {
                  [c.returnWay]: returnWay,
                })}
              />
              <span className={c.caption}>
                {transfers.length} {getVerbalTransfers(transfers.length)}
              </span>
            </div>
            <div className={c.flightInfoContainer}>
              <FlightChunk direction={DirectionType.From} flight={f} />
              <div className={c.timeDivider}>—</div>
              <FlightChunk direction={DirectionType.To} flight={f} />
              <span className={c.diffTime}>
                {hours}&nbsp;ч {addZeroBeforeNumber(minutes)}&nbsp;м
              </span>
            </div>
            {f.changeCode && (
              <div>
                <div className={c.changeAirportInfo}>
                  <span>Смена аэропорта</span>
                  <IconInfo />
                </div>
                <span className={c.changeAirportName}>
                  {f.airportToName} - {f.changeName}
                </span>
              </div>
            )}
            {transfers.length > 1 && idx !== transfers.length - 1 && (
              <div className={c.divider} />
            )}
          </div>
        );
      })}
    </FlightCardModal>
  );
};
