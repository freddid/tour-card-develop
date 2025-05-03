/* eslint-disable */
/* eslint-disable prettier/prettier */
import { numberFormat } from 'sletat-common-utils/lib/format/number';

function isInt(n: number): boolean {
  return n % 1 === 0;
}

export const formatPriceDisplay = (price: string | number): string => {
  if (typeof price === 'number') {
    return numberFormat(isInt(price) ? price : Math.ceil(price));
  }
  return price;
};
