import React, { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { BaggageInfo } from '../../../../types/flightType';
import { IconBaggage, IconLuggage } from '../../../../../../icons/IconBaggage';

import c from './index.module.scss';

interface BaggagePlaceParams {
  params: BaggageInfo;
  isSame: boolean;
  isNoConcrete: boolean;
  isHandBaggage?: boolean;
}

export const BaggagePlace = ({
  params,
  isHandBaggage = false,
  isNoConcrete,
  isSame,
}: BaggagePlaceParams) => {
  const [iconColor, setIconColor] = useState('#313140');
  const [content, setContent] = useState<ReactNode>('');

  const {
    baggageIncluded,
    baggageWeight,
    handBaggageWeight,
    handBaggagePlaces,
    baggagePlaces,
  } = params;
  const weight = isHandBaggage ? handBaggageWeight : baggageWeight;
  const place = isHandBaggage ? handBaggagePlaces : baggagePlaces;

  useEffect(() => {
    /* 
      no concrete
    * */

    if (isNoConcrete) {
      setIconColor('#9B9B9B');
      setContent('');
      return;
    }

    /* 
      unknown params
    * */
    if (!baggageIncluded) {
      setIconColor('#9B9B9B');
      setContent('');
      return;
    }

    /*
      different params
    * */
    if (!isSame) {
      setIconColor('#FFBA00');
      setContent('!');
      return;
    }

    /* 
      no baggage
    * */
    if (!place && !weight) {
      setIconColor('#E24A4A');
      setContent(<div className={c.cross} />);
      return;
    }

    /* 
      weight undefined
    * */
    if (!weight && place) {
      setIconColor('#313140');
      setContent('');
      return;
    }

    setIconColor('#313140');
    setContent(weight);
  }, [isSame, baggageIncluded, weight, isNoConcrete]);

  return (
    <div className={c.container}>
      {isHandBaggage ? (
        <IconLuggage color={iconColor} />
      ) : (
        <IconBaggage color={iconColor} />
      )}
      <span
        className={classNames(c.weightLabel, {
          [c.hand]: isHandBaggage,
        })}
      >
        {content}
      </span>
    </div>
  );
};
