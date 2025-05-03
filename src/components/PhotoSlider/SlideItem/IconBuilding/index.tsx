import * as React from 'react';

export interface IconBuildingProps {
  width: number;
  height: number;
}

export function IconBuilding({ width, height }: IconBuildingProps) {
  return (
    <svg
      height={height}
      viewBox='0 0 60 60'
      width={width}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M46.161 15.5H13.84A4.339 4.339 0 0 0 9.5 19.838V57.5h17v-12h7v12h17V19.838a4.339 4.339 0 0 0-4.339-4.338zM22.5 52.5h-7v-7h7v7zm0-11h-7v-7h7v7zm0-11h-7v-7h7v7zm11 11h-7v-7h7v7zm0-11h-7v-7h7v7zm11 22h-7v-7h7v7zm0-11h-7v-7h7v7zm0-11h-7v-7h7v7zM14.442 8.966L11.737 6.41l3.727-.59L17.12 2.5l1.654 3.32 3.727.59-2.705 2.556.65 3.77-3.326-1.826-3.326 1.826.649-3.77zm13 0L24.737 6.41l3.727-.59L30.12 2.5l1.654 3.32 3.727.59-2.705 2.556.65 3.77-3.326-1.826-3.326 1.826.649-3.77zm13 0L37.737 6.41l3.727-.59L43.12 2.5l1.654 3.32 3.727.59-2.705 2.556.65 3.77-3.326-1.826-3.326 1.826.649-3.77z'
        fill='currentColor'
      />
    </svg>
  );
}
