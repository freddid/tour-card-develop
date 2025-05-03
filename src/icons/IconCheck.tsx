import React from 'react';
import { IconProps } from '../types/iconProps';

export const IconCheck = ({
  color = '#9b9b9b',
  width = 19,
  height = 15,
  className = '',
}: IconProps) => (
  <svg
    className={className}
    fill='none'
    height={height}
    viewBox='0 0 19 15'
    width={width}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1.5 6.48051L8.5 12.7143L17.5 1.28571'
      fill='none'
      stroke={color}
      strokeWidth='3'
    />
  </svg>
);
