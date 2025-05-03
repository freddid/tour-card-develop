"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOilTaxes = void 0;
var fromString_1 = require("sletat-common-utils/lib/parse/fromString");
var ActualizePriceResponse_1 = require("./ActualizePriceResponse");
var OilTaxIndexes;
(function (OilTaxIndexes) {
    OilTaxIndexes[OilTaxIndexes["price"] = 0] = "price";
    OilTaxIndexes[OilTaxIndexes["currency"] = 1] = "currency";
    OilTaxIndexes[OilTaxIndexes["airline"] = 2] = "airline";
    OilTaxIndexes[OilTaxIndexes["sourceName"] = 3] = "sourceName";
    OilTaxIndexes[OilTaxIndexes["resortName"] = 4] = "resortName";
    OilTaxIndexes[OilTaxIndexes["periodStartDate"] = 5] = "periodStartDate";
    OilTaxIndexes[OilTaxIndexes["periodEndDate"] = 6] = "periodEndDate";
    OilTaxIndexes[OilTaxIndexes["hostName"] = 7] = "hostName";
    OilTaxIndexes[OilTaxIndexes["resortIATA"] = 8] = "resortIATA";
    OilTaxIndexes[OilTaxIndexes["flightNumber"] = 9] = "flightNumber";
    OilTaxIndexes[OilTaxIndexes["townFromId"] = 10] = "townFromId";
    OilTaxIndexes[OilTaxIndexes["ageFrom"] = 11] = "ageFrom";
    OilTaxIndexes[OilTaxIndexes["ageTo"] = 12] = "ageTo";
})(OilTaxIndexes || (OilTaxIndexes = {}));
function getOilTaxes(rawTaxes, kidsAges) {
    if (!rawTaxes || !rawTaxes.length)
        return [];
    var taxes = rawTaxes.map(function (tax) { return getOilTax(tax); }).filter(function (tax) { return tax.price > 0; });
    return filterOilTaxByKidsAges(taxes, kidsAges);
}
exports.getOilTaxes = getOilTaxes;
function getOilTax(tax) {
    return {
        periodStartDate: tax[OilTaxIndexes.periodStartDate] || '',
        periodEndDate: tax[OilTaxIndexes.periodEndDate] || '',
        price: (0, fromString_1.getIntegerFromString)(tax[OilTaxIndexes.price]),
        currency: tax[OilTaxIndexes.currency] || '',
        airline: tax[OilTaxIndexes.airline] || '',
        hostName: tax[OilTaxIndexes.hostName] || '',
        resortName: tax[OilTaxIndexes.resortName] || '',
        resortIATA: tax[OilTaxIndexes.resortIATA] || '',
        flightNumber: (0, fromString_1.getIntegerFromString)(tax[OilTaxIndexes.flightNumber]),
        townFromId: (0, fromString_1.getIntegerFromString)(tax[OilTaxIndexes.townFromId]),
        sourceName: tax[OilTaxIndexes.sourceName] || '',
        ageFrom: (0, fromString_1.getIntegerFromString)(tax[OilTaxIndexes.ageFrom]),
        ageTo: (0, fromString_1.getIntegerFromString)(tax[OilTaxIndexes.ageTo])
    };
}
function filterOilTaxByKidsAges(taxes, kidsAges) {
    return taxes.filter(function (tax) {
        if (!(0, ActualizePriceResponse_1.isFeeForKid)(tax)) {
            return true;
        }
        return (0, ActualizePriceResponse_1.isFeeValidForInputKidsAges)(tax, kidsAges);
    });
}
