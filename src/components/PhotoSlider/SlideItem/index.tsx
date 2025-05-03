import * as React from 'react';
import { range } from 'lodash';
import { useState } from 'react';
import { IconBuilding } from './IconBuilding';
import c from './index.module.scss';

export enum SlideItemStatus {
  Loading,
  Succeeded,
  Failed,
}

export interface SlideItemProps {
  imgSrc: string;
  width: number;
  height: number;
  alt: string;
}

export interface SlideItemState {
  status: SlideItemStatus;
}

const renderLoading = () => {
  return (
    <div className={c.loader}>
      <div className={c.loadersWrap}>
        {range(5).map((index) => (
          <div key={index} className={c.loaderItem} />
        ))}
      </div>
    </div>
  );
};

const renderFailed = () => {
  return (
    <div className={c.failed}>
      <IconBuilding height={56} width={56} />
    </div>
  );
};

export const SlideItem = ({ imgSrc, width, height, alt }: SlideItemProps) => {
  const [status, setStatus] = useState<SlideItemStatus>(
    SlideItemStatus.Loading,
  );

  const onLoadHandler = (): void => {
    setStatus(SlideItemStatus.Succeeded);
  };

  const onErrorHandler = (): void => {
    setStatus(SlideItemStatus.Failed);
  };

  return (
    <div
      className={c.container}
      style={{
        width,
        height,
      }}
    >
      <img
        alt={alt}
        className={c.image}
        src={imgSrc}
        onError={() => onErrorHandler()}
        onLoad={() => onLoadHandler()}
      />
      {status === SlideItemStatus.Loading && renderLoading()}
      {status === SlideItemStatus.Failed && renderFailed()}
    </div>
  );
};
