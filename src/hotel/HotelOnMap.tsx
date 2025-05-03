import * as React from 'react';

import { SorryWeDontHaveHotelInfo } from './SorryWeDontHaveHotelInfo';
import { GoogleMap } from './GoogleMap';
import { isPointInsideArea } from '../utils/isPointInsideArea';

export interface HotelOnMapProps {
  hotelId: number | null;
  isMGTModule: boolean;
  hotelLatitude?: number | null;
  hotelLongitude?: number | null;
}

const CRIMEA_AREA = {
  topLeft: {
    latitude: 46.19029862919321,
    longitude: 32.41031930694013,
  },
  bottomRight: {
    latitude: 44.30202074101832,
    longitude: 36.66136220433559,
  },
};

export function HotelOnMap({
  hotelId,
  hotelLatitude,
  hotelLongitude,
  isMGTModule,
}: HotelOnMapProps) {
  const couldWeShowHotelOnMap = (): boolean => {
    const hasID = !!hotelId;
    const hasCoords =
      typeof hotelLatitude === 'number' && typeof hotelLongitude === 'number';
    let insideCrimea = false;

    if (isMGTModule) {
      insideCrimea = isPointInsideArea(
        CRIMEA_AREA.topLeft,
        CRIMEA_AREA.bottomRight,
        {
          latitude: hotelLatitude!,
          longitude: hotelLongitude!,
        },
      );
    }

    return hasID && hasCoords && !insideCrimea;
  };

  if (couldWeShowHotelOnMap()) {
    return (
      <GoogleMap
        height={340}
        lat={hotelLatitude!}
        lng={hotelLongitude!}
        title='Отель на карте'
        width='100%'
        zoom={16}
      />
    );
  }
  return <SorryWeDontHaveHotelInfo />;
}
