import * as React from 'react';
import Carousel, { CarouselOnTransitionEndState } from 're-carousel';
import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { RoomPhoto } from '../../services/getRooms';
import { SliderControls } from './SliderControls';
import { SlideCounter } from './SlideCounter';
import { SlideItemAdaptive } from './SlideItemAdaptive';
import c from './index.module.scss';

interface PhotoSliderProps {
  isDesktop: boolean;
  photos: RoomPhoto[];
  adaptiveHeight: (height: number) => void;
}

export const PhotoSlider = ({
  photos,
  isDesktop,
  adaptiveHeight,
}: PhotoSliderProps) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const adaptiveClassName = useCallback(
    (className: string): string => {
      return classNames(className, {
        [c.desktopView]: isDesktop,
      });
    },
    [isDesktop],
  );

  useEffect(() => {
    if (sliderRef.current) {
      setWidth(sliderRef.current.clientWidth);
    }
  }, [sliderRef]);

  return (
    <div ref={sliderRef} className={adaptiveClassName(c.container)}>
      <Carousel
        className={c.sliderContainer}
        loop={false}
        widgets={[SliderControls, SlideCounter]}
        frames={photos.map((photo, i) => (
          <SlideItemAdaptive
            activePhotoIdx={activePhotoIdx}
            adaptiveHeight={adaptiveHeight}
            isDesktop={isDesktop}
            photo={[i, photo]}
            width={width}
          />
        ))}
        onTransitionEnd={(state: CarouselOnTransitionEndState) => {
          setActivePhotoIdx(+(state.current.firstChild as HTMLElement).id);
        }}
      />
    </div>
  );
};
