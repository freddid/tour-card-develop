/* eslint-disable */
/* eslint-disable prettier/prettier */
import { FlightsData } from "sletat-api-services/lib/module/flights/models";

export enum TourOperatorsWithConcretization {
    BiblioGlobus = 7,
    Intourist = 9,
}

export const getTourHasFlightsWithConcretization = (
    sourceId: number,
    flight: FlightsData
) =>
    [
        TourOperatorsWithConcretization.BiblioGlobus,
        TourOperatorsWithConcretization.Intourist,
    ].includes(sourceId) &&
    (flight.from.some((fl) => fl.isConcrete) ||
        flight.to.some((fl) => fl.isConcrete));
