import React from 'react';
import { IconProps } from '../types/iconProps';

export const IconAirplane = ({
  color = '#0078BE',
  width = 14,
  height = 11,
  className = '',
}: IconProps) => (
  <svg
    className={className}
    fill='none'
    height={height}
    viewBox='0 0 14 11'
    width={width}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M8.88477 4.57462C8.25125 3.79051 5.78329 0.447782 5.44975 0.00488845L4.24192 0L5.70237 4.57462L3.04198 4.57168L1.3141 2.74731L0.617428 2.75024L1.45521 5.49853L0.5 8.26149L1.18483 8.26735L2.99757 6.43223L5.65796 6.43418L3.98732 11L5.20601 10.9951C5.55731 10.5591 8.17724 7.19776 8.84037 6.43418L12.4747 6.41854C13.0066 6.42636 13.4586 6.01573 13.5 5.49169C13.4803 4.96471 13.051 4.56679 12.5191 4.55799L8.88477 4.57462Z'
      fill={color}
    />
  </svg>
);
