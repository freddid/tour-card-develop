/* eslint-disable no-param-reassign */
import _ from 'lodash';
import {
  FlightItem,
  FlightsParsedData,
} from 'sletat-api-services/lib/module/flights/models';
import { getDiffTime } from '../../../utils/getDiffTime';
import { formatDateStringToIsoString } from '../../../utils/format';
import {
  BaggageInfo,
  BaggageLabel,
  GenerateBaggageLabelArg,
  TransfersInfo,
} from '../types/flightType';

export class FlightHelper {
  static getIsSameAirlines(pack: FlightItem[]): boolean {
    const { airlineName } = pack[0];
    return pack.every((it) => it.airlineName === airlineName);
  }

  static getFirstFlightPack(pack: FlightsParsedData): FlightItem[] {
    return [pack.from[0], pack.to[0]];
  }

  static getFlightDuration(pack: FlightItem[]): string {
    if (pack.some((it) => it === undefined)) return '';

    const times = pack.map((f) => Number(f.flightDuration));
    if (times.some((t) => t <= 0)) return '';

    const flightTime = times.reduce((a, b) => a + b);

    let transferTime = 0;
    if (pack.length > 1) {
      for (let i = 0; i < pack.length - 1; i += 1) {
        const { hours, minutes } = getDiffTime(
          formatDateStringToIsoString(pack[i].endDate, pack[i].endTime),
          formatDateStringToIsoString(
            pack[i + 1].startDate,
            pack[i + 1].startTime,
          ),
        );

        transferTime += hours * 60 + minutes;
      }
    }

    const totalTime = transferTime + flightTime;

    if (totalTime <= 0) return '';

    const hours = totalTime / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);

    return `${rhours} ч ${rminutes} м`;
  }

  static getTransfersInfo(flightsItems: Array<FlightItem>): TransfersInfo[] {
    const transfers = flightsItems.reduce(
      (transfers, flight, idx) => {
        transfers[flight.airportToCityName!] = {
          id: idx,
          airportToCode: flight.airportToCode,
          airportToCityName: flight.airportToCityName,
          airportToName: flight.airportToName,
          arrivalTime: flight.endTime,
          arrivalDate: flight.endDate,
          departureTime: null,
          departureDate: null,
          changeCode: null,
          changeName: null,
        };

        if (transfers[flight.airportFromCityName!]) {
          transfers[flight.airportFromCityName!].departureTime =
            flight.startTime;
          transfers[flight.airportFromCityName!].departureDate =
            flight.startDate;
          if (
            transfers[flight.airportFromCityName!].airportToCode !==
            flight.airportFromCode
          ) {
            transfers[flight.airportFromCityName!].changeCode =
              flight.airportFromCode;
            transfers[flight.airportFromCityName!].changeName =
              flight.airportToName;
          }
        }

        return transfers;
      },
      {} as Record<string, TransfersInfo>,
    );

    return _.sortBy(_.values(transfers), 'id').slice(
      0,
      Object.keys(transfers).length - 1,
    );
  }

  // Тулзы для багажа

  static getIsSameBaggageParams(pack: FlightItem[]): boolean {
    const res: Partial<BaggageInfo>[] = pack.map((it) => ({
      baggageIncluded: it.baggageIncluded,
      baggageWeight: it.baggageWeight,
      baggagePlaces: it?.baggagePlaces,
      baggageSize: it?.baggageSize,
      handBaggageWeight: it?.luggageWeight,
      handBaggagePlaces: it?.luggagePlaces,
    }));
    const tmp: Partial<BaggageInfo> = res[0];

    return res.every((it) => _.isEqual(it, tmp));
  }

  static generateBaggageLabel({
    baggageParams,
    isSameParams,
    isNoConcrete,
  }: GenerateBaggageLabelArg): string {
    if (!baggageParams) return '';

    if (isNoConcrete) {
      return BaggageLabel.NoConcrete;
    }

    const { baggageIncluded, baggagePlaces, handBaggagePlaces } = baggageParams;
    if (!baggageIncluded) {
      return BaggageLabel.Unknown;
    }

    if (!isSameParams) {
      return BaggageLabel.Diff;
    }

    if (!baggagePlaces && !handBaggagePlaces) {
      return BaggageLabel.BaggageNotIncluded;
    }

    if (baggagePlaces && handBaggagePlaces) {
      return BaggageLabel.All;
    }

    if (handBaggagePlaces && !baggagePlaces) {
      return BaggageLabel.OnlyHandBaggage;
    }

    if (!handBaggagePlaces && baggagePlaces) {
      return BaggageLabel.OnlyBaggage;
    }

    return '';
  }

  static formattedBaggageData(pack: FlightItem[]): BaggageInfo[] {
    return pack.map((it) => ({
      airportToCityName: it.airportToCityName ?? '',
      airportToName: it.airportToName ?? '',
      airportFromCityName: it.airportFromCityName ?? '',
      airportFromName: it.airportFromName ?? '',
      airlineName: it.airlineName ?? '',
      flight:
        !!it.airportFromCode && !!it.airportToCode
          ? [it.airportFromCode, it.airportToCode]
          : [],
      baggageIncluded: it.baggageIncluded ?? false,
      baggageWeight: it.baggageWeight ?? 0,
      baggagePlaces: it.baggagePlaces ?? 0,
      baggageSize: it.baggageSize ?? '',
      handBaggageWeight: it.luggageWeight ?? 0,
      handBaggagePlaces: it.luggagePlaces ?? 0,
      handBaggageSize: it.luggageSize ?? '',
    }));
  }

  static pushFlightToUrl(flightId: number): void {
    if (Number.isNaN(flightId)) return;

    const helper = (): string => {
      const parts = window.location.href.split('#');
      const [baseUrl, fragment] = parts;
      const params = fragment.split('&');
      const paramObj: { [key: string]: string } = {};

      params.forEach((param) => {
        const [key, value] = param.split('=');
        paramObj[key] = value;
      });

      paramObj.flightId = String(flightId);

      const updatedParams: string = Object.keys(paramObj)
        .map((key) => `${key}=${paramObj[key]}`)
        .join('&');

      const updatedURL = baseUrl + (updatedParams ? `#${updatedParams}` : '');

      return updatedURL;
    };

    window.history.replaceState('', document.title, helper());
  }
}
