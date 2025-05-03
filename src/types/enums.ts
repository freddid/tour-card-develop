/* eslint-disable */
/* eslint-disable prettier/prettier */
import { TourFlags } from 'sletat-api-services/lib/module/getTours/models/tours';

export const FlightCategories = {
  economy: 'ECONOM',
  business: 'BUSINESS',
} as const;

export type FlightCategory = ValueOf<typeof FlightCategories>;

export type TourFlagKeys = { [key in keyof typeof TourFlags]: boolean };

const getTourFlagDictionary = (): {[key: string]: number;} => {
  const res = {} as { [key: string]: number };
  Object.keys(TourFlags).forEach((key) => {
    if (isNaN(+key)) {
      // @ts-ignore
      res[key] = TourFlags[key];
    }
  });

  return res;
};

export const TourFlagDictionary = getTourFlagDictionary();
