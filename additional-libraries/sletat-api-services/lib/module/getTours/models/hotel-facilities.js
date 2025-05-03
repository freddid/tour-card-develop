"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapHotelFacilitiesData = void 0;
function wrapHotelFacilitiesData(data) {
    if (!data) {
        return {
            facilities: [],
            groups: [],
            hotelFacilities: []
        };
    }
    return {
        facilities: data.facilities || [],
        groups: data.groups || [],
        hotelFacilities: (data.hotelFacilities || []).map(function (hf) {
            return {
                hotelId: hf.hotelId,
                facilities: hf.facilities || []
            };
        })
    };
}
exports.wrapHotelFacilitiesData = wrapHotelFacilitiesData;
