import React from 'react';
import { SlideItem } from '../SlideItem';
import { RoomPhoto } from '../../../services/getRooms';

interface SliderItemLazyProps {
  activePhotoIdx: number;
  photo: [number, RoomPhoto];
  width: number;
  slideHeight: number;
}

export const SliderItemLazy = ({
  activePhotoIdx,
  photo,
  width,
  slideHeight,
}: SliderItemLazyProps): JSX.Element | null => {
  if (Math.abs(activePhotoIdx - photo[0]) > 2) {
    return null;
  }

  const { name, url } = photo[1];

  return (
    <SlideItem alt={name} height={slideHeight} imgSrc={url} width={width} />
  );
};
