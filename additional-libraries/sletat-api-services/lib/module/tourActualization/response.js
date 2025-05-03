"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapResponse = void 0;
var utils_1 = require("./utils");
function wrapResponse(data) {
    var tour = data.data ? (0, utils_1.getActualizationTour)(data.data, data.randomNumber) : null;
    return {
        sessionId: data.actualizationSessionId,
        buyOnlineAvailabilityStatus: data.buyOnlineAvailabilityStatus,
        tour: tour,
        errorMessage: data.errorMessage,
        isBuyOnlineAvailability: data.isBuyOnlineAvailability,
        isCompleted: data.isCompleted,
        isDetailedExists: data.isDetailedExists,
        isError: data.isError,
        isFound: data.isFound,
        sletatTourId: data.randomNumber,
        resourceData: data.resourceData,
        resources: data.resources,
        services: (0, utils_1.getServices)(data.resources),
        specialPromoOffers: data.specialPromoOffers,
        getVisaFees: function (kidsAges) { return (0, utils_1.getVisaFees)(data.visaExtendedInfo, kidsAges); },
        getOilTaxes: function (kidsAges) { return (0, utils_1.getOilTaxes)(data.oilTaxes, kidsAges); }
    };
}
exports.wrapResponse = wrapResponse;
