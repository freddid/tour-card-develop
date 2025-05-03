"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapResponse = void 0;
var getLoadStateResponse_1 = require("../getLoadState/getLoadStateResponse");
var hotel_facilities_1 = require("./models/hotel-facilities");
var hotel_popularity_1 = require("./models/hotel-popularity");
var oil_tax_1 = require("./models/oil-tax");
var visa_fee_1 = require("./models/visa-fee");
var tours_1 = require("./models/tours");
var hotels_1 = require("./models/hotels");
function wrapResponse(data) {
    var result = {
        currentRequestId: data.requestId,
        sendRtb: data.sendRtb,
        totalRecords: data.iTotalRecords,
        oilTaxes: [],
        loadState: { operatorsList: [] },
        tours: [],
        visa: data.visa,
        hotelsCount: data.hotelsCount,
        hotelDistance: data.hotelDistance,
        specialPromoOffers: data.specialPromoOffers,
        hotelFacilitiesData: (0, hotel_facilities_1.wrapHotelFacilitiesData)(data.hotelFacilitiesData),
        hotelDetailedTypes: data.hotelDetailedTypes
            ? data.hotelDetailedTypes.map(function (item) {
                return {
                    hotelId: item.HotelId,
                    tags: (0, hotels_1.wrapHotelTags)(item.Tags)
                };
            })
            : [],
        totalToursCount: calcTotalToursCount(data.loadState)
    };
    result.hotelPopularityData = (0, hotel_popularity_1.wrapHotelPopularities)(data.hotelPopularityData || []);
    if (data.aaData instanceof Array) {
        result.tours = data.aaData.map(function (tourInfo) {
            var tour = new tours_1.Tour(tourInfo, data.requestId);
            var hotelPopularity = result.hotelPopularityData[tour.hotel.id];
            tour.hotel.searchesPerMonth = hotelPopularity ? hotelPopularity.searchCount : 0;
            tour.hotel.popularityLevel = hotelPopularity ? hotelPopularity.level : 0;
            return tour;
        });
    }
    if (data.oilTaxes instanceof Array) {
        result.oilTaxes = data.oilTaxes.map(function (oilTax) { return new oil_tax_1.OilTax(oilTax); });
    }
    if (data.visaRange instanceof Array && data.visaRange[1] instanceof Array) {
        result.visaRange = data.visaRange[1].map(function (value) { return new visa_fee_1.VisaFee(value, data.visaRange[0]); });
    }
    if (data.loadState instanceof Array) {
        result.loadState = (0, getLoadStateResponse_1.wrapResponse)(data.loadState);
    }
    return result;
}
exports.wrapResponse = wrapResponse;
function calcTotalToursCount(loadStates) {
    return loadStates.reduce(function (acc, operator) { return acc + operator.RowsCount; }, 0);
}
