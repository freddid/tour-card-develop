import * as React from 'react';
import { ReCarouselWidgetProps } from 're-carousel';
import c from './index.module.scss';

type SlideCounterProps = ReCarouselWidgetProps;

export const SlideCounter = ({ index, total }: SlideCounterProps) => {
  return (
    <div className={c.container}>
      <div className={c.counter}>
        {index + 1}/{total}
      </div>
    </div>
  );
};
