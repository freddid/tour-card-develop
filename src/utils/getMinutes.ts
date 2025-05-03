/* eslint-disable */
/* eslint-disable prettier/prettier */
/**
 * Add 0 before value if it is less than 10
 *
 *  @param minutes - The first input number
 */

export const addZeroBeforeNumber = (minutes: number): string => {
  return minutes < 10 ? `0${minutes}` : `${minutes}`;
};
