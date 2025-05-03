/* eslint-disable no-unused-vars */
export interface BaggageInfo {
  airportToCityName: string;
  airportToName: string;
  airportFromCityName: string;
  airportFromName: string;
  airlineName: string;
  flight: string[];
  baggageIncluded: boolean;
  baggagePlaces: number;
  baggageWeight: number;
  baggageSize: string;
  handBaggagePlaces: number;
  handBaggageWeight: number;
  handBaggageSize: string;
}

export interface TransfersInfo {
  id: number;
  airportToCode: string | null;
  airportToCityName: string | null;
  arrivalTime: string | null;
  arrivalDate: string | null;
  departureTime: string | null;
  departureDate: string | null;
  changeCode: string | null;
  airportToName: string | null;
  changeName: string | null;
}

export type GenerateBaggageLabelArg = {
  baggageParams: BaggageInfo;
  isSameParams: boolean;
  isNoConcrete: boolean;
};

export enum BaggageLabel {
  NoConcrete = 'Нет информации о багаже',
  Unknown = 'Не удалось узнать параметры багажа',
  Diff = 'Параметры багажа могут отличаться',
  All = 'Включены багаж и ручная кладь',
  OnlyBaggage = 'Включён багаж',
  OnlyHandBaggage = 'Включена ручная кладь',
  BaggageNotIncluded = 'Багаж не включён',
  HandBaggageNotIncluded = 'Ручная кладь не включена',
}
