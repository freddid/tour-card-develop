"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGetToursResponseData = void 0;
var GetLoadStateResponse_1 = require("../GetLoadState/GetLoadStateResponse");
var Tour_1 = require("./Tour");
var OilTax_1 = require("./OilTax");
var VisaFee_1 = require("./VisaFee");
function getGetToursResponseData(data) {
    var result = {};
    var hotelsPopularity = {};
    var hotelPopularityData = data.hotelPopularityData;
    if (hotelPopularityData instanceof Array) {
        hotelPopularityData.forEach(function (item) {
            hotelsPopularity[item.HotelId] = {
                searchesPerMonth: item.SearchCount,
                popularityLevel: item.Level
            };
        });
    }
    if (data.aaData instanceof Array) {
        result.tours = data.aaData.map(function (tourInfo) {
            var tour = new Tour_1.Tour(tourInfo, data.requestId);
            var hotelPopularity = hotelsPopularity[tour.hotel.id];
            tour.hotel.searchesPerMonth = hotelPopularity ? hotelPopularity.searchesPerMonth : 0;
            tour.hotel.popularityLevel = hotelPopularity ? hotelPopularity.popularityLevel : 0;
            return tour;
        });
    }
    if (data.oilTaxes instanceof Array) {
        result.oilTaxes = data.oilTaxes.map(function (value) { return new OilTax_1.OilTax(value); });
    }
    if (data.visaRange instanceof Array && data.visaRange[1] instanceof Array) {
        result.visaRange = data.visaRange[1].map(function (value) { return new VisaFee_1.VisaFee(value, data.visaRange[0]); });
    }
    if (data.loadState instanceof Array) {
        result.loadState = (0, GetLoadStateResponse_1.getGetLoadStateResponseData)(data.loadState);
    }
    result.currentRequestId = data.requestId;
    result.totalRecords = data.iTotalRecords;
    result.hotelsCount = data.hotelsCount;
    var hotelFacilitiesData = data.hotelFacilitiesData;
    result.hotelFacilitiesData = hotelFacilitiesData
        ? {
            facilities: hotelFacilitiesData.facilities || [],
            groups: hotelFacilitiesData.groups || [],
            hotelFacilities: (hotelFacilitiesData.hotelFacilities || []).map(function (hf) { return ({
                hotelId: hf.hotelId,
                facilities: hf.facilities || []
            }); })
        }
        : {
            facilities: [],
            groups: [],
            hotelFacilities: []
        };
    result.totalToursCount = getTotalToursCount(result.loadState || {});
    result.sendRtb = data.sendRtb;
    result.hotelDistance = data.hotelDistance;
    result.specialPromoOffers = data.specialPromoOffer;
    return result;
}
exports.getGetToursResponseData = getGetToursResponseData;
function getTotalToursCount(loadState) {
    return loadState.operatorsList.reduce(function (acc, operator) { return acc + operator.rowsCount; }, 0);
}
