"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterToursForTransportTypeMapping = void 0;
var tours_1 = require("../models/tours");
/**
 * Допустимые типы транспорта для тура
 * @param tourFilters
 * @returns Набор битовых флагов
 */
function filterToursForTransportTypeMapping(tourFilters) {
    var allFlags = 0;
    if (tourFilters) {
        if (tourFilters.withRailway) {
            allFlags += tours_1.TransportFlags.Railway;
        }
    }
    return allFlags;
}
exports.filterToursForTransportTypeMapping = filterToursForTransportTypeMapping;
