"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightsStatus = exports.FlightSeatsIndicator = exports.DirectionType = void 0;
var DirectionType;
(function (DirectionType) {
    DirectionType["To"] = "To";
    DirectionType["From"] = "From";
})(DirectionType = exports.DirectionType || (exports.DirectionType = {}));
var FlightSeatsIndicator;
(function (FlightSeatsIndicator) {
    FlightSeatsIndicator["Enough"] = "Enough";
    FlightSeatsIndicator["Few"] = "Few";
    FlightSeatsIndicator["None"] = "None";
})(FlightSeatsIndicator = exports.FlightSeatsIndicator || (exports.FlightSeatsIndicator = {}));
var FlightsStatus;
(function (FlightsStatus) {
    FlightsStatus[FlightsStatus["Loading"] = 2] = "Loading";
    FlightsStatus[FlightsStatus["NoTickets"] = 3] = "NoTickets";
    FlightsStatus[FlightsStatus["NoData"] = 4] = "NoData";
    FlightsStatus[FlightsStatus["NotConcrete"] = 5] = "NotConcrete";
    FlightsStatus[FlightsStatus["Ok"] = 6] = "Ok";
    FlightsStatus[FlightsStatus["FlightsNotIncluded"] = 7] = "FlightsNotIncluded";
    // SLT-1799 валидные статусы, когда хотя бьы один перелет доступен
    FlightsStatus[FlightsStatus["OnlyFlightTo"] = 8] = "OnlyFlightTo";
    FlightsStatus[FlightsStatus["OnlyFlightFrom"] = 9] = "OnlyFlightFrom";
})(FlightsStatus = exports.FlightsStatus || (exports.FlightsStatus = {}));
