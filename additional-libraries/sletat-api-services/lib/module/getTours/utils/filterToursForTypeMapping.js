"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterToursForTypeMapping = void 0;
var tours_1 = require("../models/tours");
/**
 * SLT-5371 / SLT-5372 Собираем набор битовых флагов с перечислением типов туров.
* В поисковой выдаче должны быть только туры удовлетворяющие хотя бы одному из флагов
 * @param tourFilters Перечисления допустимых типов тура
 * @returns Набор битовых флагов
 */
function filterToursForTypeMapping(tourFilters) {
    var allFlags = 0;
    if (tourFilters) {
        if (tourFilters.charter) {
            allFlags += tours_1.TourFlags.FlightCharter;
        }
        if (tourFilters.regular) {
            allFlags += tours_1.TourFlags.FlightRegular;
        }
        if (tourFilters.instant) {
            allFlags += tours_1.TourFlags.Instant;
        }
        if (tourFilters.promoTours) {
            allFlags += tours_1.TourFlags.PROMO;
        }
    }
    return allFlags;
}
exports.filterToursForTypeMapping = filterToursForTypeMapping;
