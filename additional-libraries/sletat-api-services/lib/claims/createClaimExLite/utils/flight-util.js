"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareFlightsToClaimRequest = exports.wrapFlights = void 0;
var flight_1 = require("../models/flight");
/**
 * Преобразует массив объектов ClaimFlight в массив объектов ClaimFlightServer.
 *
 * @param flights - Массив объектов ClaimFlight, которые необходимо преобразовать.
 * @returns Массив объектов ClaimFlightServer, представляющих собой преобразованные данные.
 */
var wrapFlights = function (flights) {
    return flights.map(function (f) {
        var _a, _b, _c;
        return ({
            FlightType: f.flightType,
            DepartureCity: f.departureCity,
            ArrivalCity: f.arrivalCity,
            AviaCompany: f.aviaCompany,
            Flight: f.flight,
            DepartureDate: f.departureDate,
            ArrivalDate: f.arrivalDate,
            DepartureTime: f.departureTime,
            ArrivalTime: f.arrivalTime,
            DepartureAirport: f.departureAirport,
            ArrivalAirport: f.arrivalAirport,
            DepartureAirportIataCode: f.departureAirportIataCode,
            ArrivalAirportIataCode: f.arrivalAirportIataCode,
            AviaCompanyIataCode: f.aviaCompanyIataCode,
            AviaFlightKind: f.aviaFlightKind,
            Board: (_a = f.board) !== null && _a !== void 0 ? _a : null,
            TicketNumber: (_b = f.ticketNumber) !== null && _b !== void 0 ? _b : null,
            Duration: (_c = f.duration) !== null && _c !== void 0 ? _c : null,
            ResourceId: f.resourceId,
            IsConcrete: f.isConcrete,
            IsBaggageIncluded: f.baggageIncluded,
            BaggagePlaces: f.baggagePlaces,
            BaggageWeight: f.baggageWeight,
            BaggageSize: f.baggageSize,
            IsLuggageIncluded: f.luggageIncluded,
            LuggagePlaces: f.luggagePlaces,
            LuggageWeight: f.luggageWeight,
            LuggageSize: f.luggageSize
        });
    });
};
exports.wrapFlights = wrapFlights;
/**
 * Подготавливает данные о перелетах для запроса.
 *
 * Эта функция принимает массив элементов перелетов и организует их в массив
 * объектов ClaimFlight для исходящих и обратных перелетов.
 *
 * @param flights - Массив элементов перелетов, где первый элемент содержит перелеты туда,
 * а второй элемент содержит обратные перелеты.
 * @returns Массив объектов ClaimFlight, которые могут быть использованы в запросе.
 */
var prepareFlightsToClaimRequest = function (flights) {
    var packTo = flights[0], packFrom = flights[1];
    var helper = function (type, pack) {
        return pack.map(function (f) { return ({
            flightType: type,
            departureCity: f.airportFromCityName,
            arrivalCity: f.airportToCityName,
            aviaCompany: f.airlineName,
            flight: f.flight,
            departureDate: f.startDate,
            arrivalDate: f.endDate,
            departureTime: f.startTime,
            arrivalTime: f.endTime,
            departureAirport: f.airportFromName,
            arrivalAirport: f.airportToName,
            departureAirportIataCode: f.airportFromCode,
            arrivalAirportIataCode: f.airportToCode,
            aviaCompanyIataCode: f.airlineIATACode,
            resourceId: f.resourceId,
            isConcrete: f.isConcrete,
            ticketNumber: f.ticketNumber,
            baggageIncluded: f.baggageIncluded,
            baggagePlaces: f.baggagePlaces,
            baggageWeight: f.baggageWeight,
            baggageSize: f.baggageSize,
            luggageIncluded: f.luggageIncluded,
            luggagePlaces: f.luggagePlaces,
            luggageWeight: f.luggageWeight,
            luggageSize: f.luggageSize
        }); });
    };
    var to = helper(flight_1.FlightType.To, packTo);
    var from = helper(flight_1.FlightType.From, packFrom);
    return to.concat(from);
};
exports.prepareFlightsToClaimRequest = prepareFlightsToClaimRequest;
