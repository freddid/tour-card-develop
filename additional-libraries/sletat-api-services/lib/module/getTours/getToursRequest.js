"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRequestParams = exports.RequestSource = void 0;
var filterToursForTypeMapping_1 = require("./utils/filterToursForTypeMapping");
var filterToursForTransportTypeMapping_1 = require("./utils/filterToursForTransportTypeMapping");
var excludeToursForTypeMapping_1 = require("./utils/excludeToursForTypeMapping");
var RequestSource;
(function (RequestSource) {
    RequestSource[RequestSource["NotSpecified"] = 0] = "NotSpecified";
    RequestSource[RequestSource["HomePage"] = 1] = "HomePage";
    RequestSource[RequestSource["HotPage"] = 2] = "HotPage";
    RequestSource[RequestSource["HotelCard"] = 3] = "HotelCard";
    RequestSource[RequestSource["Promoter"] = 4] = "Promoter";
    RequestSource[RequestSource["MobileRest"] = 5] = "MobileRest";
    RequestSource[RequestSource["MobileJsonRPC"] = 6] = "MobileJsonRPC";
    RequestSource[RequestSource["External"] = 7] = "External";
    RequestSource[RequestSource["RepeatedSearch"] = 8] = "RepeatedSearch";
})(RequestSource = exports.RequestSource || (exports.RequestSource = {}));
/**
 * Преобразует параметры, с которыми работаем на клиенте в серверный вид (превращает числа в строки, массивы в числа и тд)
 */
function transformRequestParams(params) {
    var result = {
        requestId: params.requestId || 0,
        pageSize: params.pageSize || 20,
        pageNumber: params.pageNumber || 1,
        countryId: params.countryToId,
        cityFromId: params.cityFromId,
        cities: (params.resortsIds || []).join(','),
        meals: (params.mealsIds || []).join(','),
        stars: (params.hotelsCategoriesIds || []).join(','),
        features: (params.features || []).join(','),
        s_nightsMin: params.minNightsCount,
        s_nightsMax: params.maxNightsCount,
        currencyAlias: params.currency,
        groupBy: params.groupBy || '',
        includeDescriptions: typeof params.includeDescriptions === 'boolean' ? Number(params.includeDescriptions) : 1,
        includeOilTaxesAndVisa: typeof params.includeOilTaxesAndVisa === 'boolean' ? Number(params.includeOilTaxesAndVisa) : 1,
        minHotelRating: typeof params.minHotelRating === 'number' ? String(params.minHotelRating) : '',
        s_showcase: String(!!params.isShowcase),
        templateName: params.templateName || '',
        filterToursForType: (0, filterToursForTypeMapping_1.filterToursForTypeMapping)(params.filterToursForType),
        excludeToursForType: (0, excludeToursForTypeMapping_1.excludeToursForTypeMapping)(params.excludeToursForType),
        filterToursForTransportType: (0, filterToursForTransportTypeMapping_1.filterToursForTransportTypeMapping)(params.filterToursForTransportType),
    };
    if (params.beachLines) {
        result.beachLines = (params.beachLines || []).join(',');
    }
    if (typeof params.filter === 'boolean') {
        result.filter = Number(params.filter);
    }
    if (params.idsToFilter) {
        result.f_to_id = (params.idsToFilter || []).join(',');
    }
    if (typeof params.requestTimeout === 'number') {
        result.requestTimeout = params.requestTimeout;
    }
    if (typeof params.hotelIsNotInStop === 'boolean') {
        result.s_hotelIsNotInStop = params.hotelIsNotInStop;
    }
    if (typeof params.hasTickets === 'boolean') {
        result.s_hasTickets = params.hasTickets;
    }
    if (typeof params.isTicketsIncluded === 'boolean') {
        result.s_ticketsIncluded = params.isTicketsIncluded;
    }
    if (typeof params.updateResult === 'boolean') {
        result.updateResult = Number(params.updateResult);
    }
    if (params.siteSessionId) {
        result.siteSessionId = params.siteSessionId || '';
    }
    if (params.operatorsIds) {
        result.visibleOperators = (params.operatorsIds || []).join(',');
    }
    if (params.hotelsIds) {
        result.hotels = (params.hotelsIds || []).join(',');
    }
    if (params.jskey) {
        result.jskey = Number(params.jskey) || 1;
    }
    if (params.userId) {
        result.userId = params.userId;
    }
    if (typeof params.adultsCount === 'number') {
        result.s_adults = params.adultsCount;
    }
    if (typeof params.kidsCount === 'number') {
        result.s_kids = params.kidsCount;
    }
    if (params.kidsAges) {
        result.s_kids_ages = (params.kidsAges || []).slice(0, params.kidsCount || 0).join(',');
    }
    if (params.minDepartureDate) {
        result.s_departFrom = params.minDepartureDate;
    }
    if (params.maxDepartureDate) {
        result.s_departTo = params.maxDepartureDate;
    }
    if (typeof params.minPrice === 'number') {
        result.s_priceMin = params.minPrice;
    }
    if (typeof params.maxPrice === 'number') {
        result.s_priceMax = params.maxPrice;
    }
    if (typeof params.calculateFullPrice === 'boolean') {
        result.calcFullPrice = Number(params.calculateFullPrice);
    }
    if (typeof params.showHotelFacilities === 'boolean') {
        result.showHotelFacilities = Number(params.showHotelFacilities);
    }
    if (typeof params.isHotTourWidget === 'boolean') {
        result.isHotTourWidget = Number(params.isHotTourWidget);
    }
    if (params.target) {
        result.target = params.target;
    }
    if (typeof params.cacheMode === 'number') {
        result.cacheMode = params.cacheMode;
    }
    if (params.requestSource) {
        result.requestSource = params.requestSource;
    }
    return result;
}
exports.transformRequestParams = transformRequestParams;
