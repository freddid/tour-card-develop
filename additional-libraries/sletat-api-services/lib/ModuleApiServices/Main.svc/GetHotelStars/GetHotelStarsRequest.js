"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGetHotelStarsRequestData = void 0;
function getGetHotelStarsRequestData(data) {
    return {
        countryId: data.countryId,
        towns: data.townIds ? data.townIds.join(',') : undefined,
        useTree: undefined
    };
}
exports.getGetHotelStarsRequestData = getGetHotelStarsRequestData;
