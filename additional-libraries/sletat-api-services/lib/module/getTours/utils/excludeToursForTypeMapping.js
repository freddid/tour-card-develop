"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeToursForTypeMapping = void 0;
var tours_1 = require("../models/tours");
/**
* Собираем набор битовых флагов с перечислением типов туров, которые должны быть исключены из поисковой выдачи
*/
function excludeToursForTypeMapping(tourFilters) {
    var flags = 0;
    if (tourFilters) {
        if (tourFilters.charter) {
            flags += tours_1.TourFlags.FlightCharter;
        }
        if (tourFilters.regular) {
            flags += tours_1.TourFlags.FlightRegular;
        }
        if (tourFilters.instant) {
            flags += tours_1.TourFlags.Instant;
        }
        if (tourFilters.promoTours) {
            flags += tours_1.TourFlags.PROMO;
        }
    }
    return flags;
}
exports.excludeToursForTypeMapping = excludeToursForTypeMapping;
