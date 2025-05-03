"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformFlight = void 0;
var format_1 = require("./format");
// TODO selkin: нужно отказать от этой функции трансформации - это должно быть в парсере
function transformFlight(parsedFlight) {
    return {
        airportFromName: parsedFlight.airportNameDeparture || null,
        airportFromCityName: parsedFlight.cityDeparture || null,
        airportToName: parsedFlight.airportNameArrival || null,
        airportToCityName: parsedFlight.cityArrival || null,
        airlineName: parsedFlight.airlaneName || null,
        flight: parsedFlight.flightNumber || null,
        airportFromCode: parsedFlight.airportCodeDeparture || null,
        airportToCode: parsedFlight.airportCodeArrival || null,
        startTime: parsedFlight.timeDeparture || null,
        endTime: parsedFlight.timeArrival || null,
        startDate: parsedFlight.dateDeparture ? (0, format_1.formatDate)(parsedFlight.dateDeparture) : null,
        endDate: parsedFlight.dateArrival ? (0, format_1.formatDate)(parsedFlight.dateArrival) : null,
        ticketsClass: parsedFlight.flightClass || null,
        airlineIATACode: null,
        airlineICAOCode: null,
        airlineId: parsedFlight.airlaneId || null,
        originTOFlightName: parsedFlight.originTOFlightName,
        baggageIncluded: parsedFlight.baggageIncluded,
        baggagePlaces: parsedFlight.baggagePlaces,
        baggageWeight: parsedFlight.baggageWeight,
        baggageSize: parsedFlight.baggageSize,
        luggageIncluded: parsedFlight.luggageIncluded,
        luggagePlaces: parsedFlight.luggagePlaces,
        luggageWeight: parsedFlight.luggageWeight,
        luggageSize: parsedFlight.luggageSize,
        isConcrete: parsedFlight.isConcrete,
        flightDuration: parsedFlight.flightDuration,
        resourceId: parsedFlight.resourceId,
        ticketNumber: parsedFlight.ticketNumber
    };
}
exports.transformFlight = transformFlight;
