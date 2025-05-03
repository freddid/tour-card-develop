import * as React from 'react';
import { MouseEvent } from 'react';
import { ReCarouselWidgetProps } from 're-carousel';
import classNames from 'classnames';
import { IconChevron as IconChevronUI } from 'sletat-ui-components/lib/SVGIcons/IconChevron';
import c from './index.module.scss';

interface SliderControlsProps extends ReCarouselWidgetProps {
  prevHandler: () => void;
  nextHandler: () => void;
}

const IconChevron = () => (
  <IconChevronUI fill='currentColor' height={22} width={22} />
);

export const SliderControls = ({
  index,
  total,
  prevHandler,
  nextHandler,
}: SliderControlsProps) => {
  const isFirstSlide = index === 0;

  const isLastSlide = index + 1 === total;

  const onClickNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!isLastSlide) {
      nextHandler();
    }
  };

  const onClickPrev = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!isFirstSlide) {
      prevHandler();
    }
  };

  return (
    <>
      <button
        type='button'
        className={classNames(c.prevSlideControl, {
          [c.disabled]: isFirstSlide,
        })}
        onClick={onClickPrev}
      >
        <IconChevron />
      </button>
      <button
        type='button'
        className={classNames(c.nextSlideControl, {
          [c.disabled]: isLastSlide,
        })}
        onClick={onClickNext}
      >
        <IconChevron />
      </button>
    </>
  );
};
