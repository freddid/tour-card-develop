import React from 'react';
import { SliderItemLazy } from '../SliderItemLazy';
import { RoomPhoto } from '../../../services/getRooms';
import c from './index.module.scss';

interface SlideItemAdaptiveProps {
  photo: [number, RoomPhoto];
  width: number | null;
  isDesktop: boolean;
  adaptiveHeight: (height: number) => void;
  activePhotoIdx: number;
}

export const SlideItemAdaptive = ({
  photo,
  width,
  isDesktop,
  adaptiveHeight,
  activePhotoIdx,
}: SlideItemAdaptiveProps) => {
  const aspectRatio = isDesktop ? 0.565 : 0.595;

  if (!width) return <div />;

  const slideHeight = Math.floor(width * aspectRatio);
  adaptiveHeight(slideHeight);

  return (
    <div
      key={photo[0]}
      className={c.sliderSlide}
      id={photo[0].toString()}
      style={{
        width,
        height: slideHeight,
      }}
    >
      <SliderItemLazy
        activePhotoIdx={activePhotoIdx}
        photo={photo}
        slideHeight={slideHeight}
        width={width}
      />
    </div>
  );
};
