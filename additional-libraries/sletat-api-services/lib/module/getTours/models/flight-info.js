"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightInfo = void 0;
var tours_1 = require("./tours");
var FlightInfo = /** @class */ (function () {
    function FlightInfo(tour) {
        this.economyTicketsTo = parseInt(String(tour[tours_1.TourIndexes.economyTicketsTo] || ''), 10) || 0;
        this.economyTicketsBack = parseInt(String(tour[tours_1.TourIndexes.economyTicketsBack] || ''), 10) || 0;
        this.ticketBusinessTo = parseInt(String(tour[tours_1.TourIndexes.ticketBusinessTo] || ''), 10) || 0;
        this.ticketBusinessBack = parseInt(String(tour[tours_1.TourIndexes.ticketBusinessBack] || ''), 10) || 0;
        // Если билетов много(много или мало проверяется на сервере) то в ответе -1 или число, иначе в ответе пустая строка
        this.economySeatsTo = parseInt(String(tour[tours_1.TourIndexes.economySeatsTo] || '-2'), 10);
        this.economySeatsBack = parseInt(String(tour[tours_1.TourIndexes.economySeatsBack] || '-2'), 10);
        this.businessSeatsTo = parseInt(String(tour[tours_1.TourIndexes.businessSeatsTo] || '-2'), 10);
        this.businessSeatsBack = parseInt(String(tour[tours_1.TourIndexes.businessSeatsBack] || '-2'), 10);
        this.ticketsInPrice = parseInt(String(tour[tours_1.TourIndexes.ticketInPrice]), 10) !== 0;
    }
    return FlightInfo;
}());
exports.FlightInfo = FlightInfo;
