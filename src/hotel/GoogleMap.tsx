import * as React from 'react';
import { GOOGLE_MAPS_API_KEY } from '../consts';

export interface GoogleMapProps {
  lat: number;
  lng: number;
  width?: number | string;
  height?: number | string;
  zoom?: number;
  title?: string;
}

export const GoogleMap = ({
  lat,
  lng,
  width,
  height,
  zoom,
  title = '',
}: GoogleMapProps) => {
  const locationPartial = `&q=${lat},${lng}`;
  const zoomPartial = zoom ? `&zoom=${zoom}` : '';
  const languagePartial = '&language=ru';
  const regionPartial = '&region=RU';
  const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}${locationPartial}${zoomPartial}${languagePartial}${regionPartial}`;
  return (
    <iframe
      allowFullScreen
      className='google-map'
      frameBorder='0'
      src={url}
      style={{ width, height }}
      title={title}
    />
  );
};
