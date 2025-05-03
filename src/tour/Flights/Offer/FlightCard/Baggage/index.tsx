import React, { useState } from 'react';
import { FlightItem } from 'sletat-api-services/lib/module/flights/models';
import classNames from 'classnames';
import { BaggagePlace } from './BaggagePlace';
import { FlightHelper } from '../../../helper/Flights';
import { BaggageInfo } from '../BaggageInfo';
import c from './index.module.scss';

interface BaggageParams {
  pack: FlightItem[];
  isNoConcrete: boolean;
  className?: string;
}

export const Baggage = ({
  pack,
  isNoConcrete,
  className = '',
}: BaggageParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const baggageData = FlightHelper.formattedBaggageData(pack);
  const isSameParams = FlightHelper.getIsSameBaggageParams(pack);
  const baggageParams = baggageData[0];
  const baggageLabel = FlightHelper.generateBaggageLabel({
    baggageParams,
    isSameParams,
    isNoConcrete,
  });

  const onCaptionBtnHandle = () => {
    if (isNoConcrete) return;
    setIsOpen(true);
  };

  return (
    <div className={classNames(c.container, className)}>
      <button
        type='button'
        className={classNames(c.captionBtn, {
          [c.captionBtnNoConcrete]: isNoConcrete,
        })}
        onClick={onCaptionBtnHandle}
      >
        <span className={c.baggagePlaces}>
          <BaggagePlace
            isNoConcrete={isNoConcrete}
            isSame={isSameParams}
            params={baggageParams}
          />
          <BaggagePlace
            isHandBaggage
            isNoConcrete={isNoConcrete}
            isSame={isSameParams}
            params={baggageParams}
          />
        </span>
        {baggageLabel}
      </button>
      {isOpen && (
        <BaggageInfo
          baggageData={baggageData}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
