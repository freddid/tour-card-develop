"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs = __importStar(require("qs"));
var lodash_1 = require("lodash");
var SletatMainPageSearchParamsUrlKeys;
(function (SletatMainPageSearchParamsUrlKeys) {
    SletatMainPageSearchParamsUrlKeys["CityFromId"] = "city";
    SletatMainPageSearchParamsUrlKeys["CountryToId"] = "country";
    SletatMainPageSearchParamsUrlKeys["SelectedResortsIds"] = "resort";
    SletatMainPageSearchParamsUrlKeys["SelectedHotelsIds"] = "hotels";
    SletatMainPageSearchParamsUrlKeys["SelectedMealTypesIds"] = "meal";
    SletatMainPageSearchParamsUrlKeys["SelectedHotelCategoriesIds"] = "stars";
    SletatMainPageSearchParamsUrlKeys["SelectedOperatorsIds"] = "operators";
    SletatMainPageSearchParamsUrlKeys["MinPrice"] = "pricesmin";
    SletatMainPageSearchParamsUrlKeys["MaxPrice"] = "pricesmax";
    SletatMainPageSearchParamsUrlKeys["MinDepartureDate"] = "datefrom";
    SletatMainPageSearchParamsUrlKeys["MaxDepartureDate"] = "dateto";
    SletatMainPageSearchParamsUrlKeys["MinNightsCount"] = "nightsmin";
    SletatMainPageSearchParamsUrlKeys["MaxNightsCount"] = "nightsmax";
    SletatMainPageSearchParamsUrlKeys["Currency"] = "currency";
    SletatMainPageSearchParamsUrlKeys["MinHotelRating"] = "minhotelrating";
    SletatMainPageSearchParamsUrlKeys["AdultsCount"] = "adults";
    SletatMainPageSearchParamsUrlKeys["KidsCount"] = "kids";
    SletatMainPageSearchParamsUrlKeys["Kid1Age"] = "kid1";
    SletatMainPageSearchParamsUrlKeys["Kid2Age"] = "kid2";
    SletatMainPageSearchParamsUrlKeys["Kid3Age"] = "kid3";
    SletatMainPageSearchParamsUrlKeys["IsTicketsIncluded"] = "ticketsincluded";
    SletatMainPageSearchParamsUrlKeys["HasTickets"] = "hastickets";
    SletatMainPageSearchParamsUrlKeys["OnlyCharter"] = "onlycharter";
    SletatMainPageSearchParamsUrlKeys["OnlyInstant"] = "onlyinstant";
    SletatMainPageSearchParamsUrlKeys["IsHotelNotInStop"] = "places";
    SletatMainPageSearchParamsUrlKeys["SelectedBeachLines"] = "beachlines";
    SletatMainPageSearchParamsUrlKeys["CacheMode"] = "cachemode";
    SletatMainPageSearchParamsUrlKeys["UtmSource"] = "utm_source";
    SletatMainPageSearchParamsUrlKeys["UtmMedium"] = "utm_medium";
    SletatMainPageSearchParamsUrlKeys["UtmCampaign"] = "utm_campaign";
    SletatMainPageSearchParamsUrlKeys["UtmContent"] = "utm_content";
    SletatMainPageSearchParamsUrlKeys["UtmTerm"] = "utm_term";
    SletatMainPageSearchParamsUrlKeys["UtmGoogleExperimentId"] = "utm_expid";
    SletatMainPageSearchParamsUrlKeys["Callback"] = "callback";
    SletatMainPageSearchParamsUrlKeys["SearchFormType"] = "sf";
    SletatMainPageSearchParamsUrlKeys["SourceType"] = "source";
    SletatMainPageSearchParamsUrlKeys["FrontVersionId"] = "__version_id__";
    SletatMainPageSearchParamsUrlKeys["OldSearchResultsEnabled"] = "__osr__";
    SletatMainPageSearchParamsUrlKeys["AllHotelsInSearchEnabled"] = "__hall__";
})(SletatMainPageSearchParamsUrlKeys = exports.SletatMainPageSearchParamsUrlKeys || (exports.SletatMainPageSearchParamsUrlKeys = {}));
// SLT-2264 включает в переданный URL указанные параметры из текущего query
function includeQueryParamsForUrl(url, queryParams) {
    var query = qs.parse(location.search, { ignoreQueryPrefix: true });
    var necessaryKeys = lodash_1.intersection(Object.keys(query), queryParams);
    var queryForUrlIsEmpty = url.lastIndexOf('&') === -1 && url.indexOf('?') === -1;
    var _a = url.split('#'), baseUrl = _a[0], hash = _a[1];
    url = baseUrl;
    for (var i = 0; i < necessaryKeys.length; i++) {
        var delimiter = queryForUrlIsEmpty && i === 0
            ? '?'
            : '&';
        url += "" + delimiter + necessaryKeys[i] + "=" + query[necessaryKeys[i]];
    }
    if (hash && url.indexOf(hash) === -1) {
        url += "#" + hash;
    }
    return url;
}
exports.includeQueryParamsForUrl = includeQueryParamsForUrl;
function getSletatSearchUrl(searchParams) {
    var cityFromId = searchParams.cityFromId, countryToId = searchParams.countryToId, resortsIds = searchParams.resortsIds, hotelsIds = searchParams.hotelsIds, operatorsIds = searchParams.operatorsIds, hotelsCategoriesIds = searchParams.hotelsCategoriesIds, mealsIds = searchParams.mealsIds, adultsCount = searchParams.adultsCount, kidsCount = searchParams.kidsCount, kidsAges = searchParams.kidsAges, minPrice = searchParams.minPrice, maxPrice = searchParams.maxPrice, minDepartureDate = searchParams.minDepartureDate, maxDepartureDate = searchParams.maxDepartureDate, currency = searchParams.currency, minHotelRating = searchParams.minHotelRating, minNightsCount = searchParams.minNightsCount, maxNightsCount = searchParams.maxNightsCount, isTicketsIncluded = searchParams.isTicketsIncluded, hasTickets = searchParams.hasTickets, onlyCharter = searchParams.onlyCharter, onlyInstant = searchParams.onlyInstant, hotelIsNotInStop = searchParams.hotelIsNotInStop, beachLines = searchParams.beachLines, cacheMode = searchParams.cacheMode, utmSource = searchParams.utmSource, utmMedium = searchParams.utmMedium, utmCampaign = searchParams.utmCampaign, utmContent = searchParams.utmContent, utmTerm = searchParams.utmTerm, callback = searchParams.callback, searchFormType = searchParams.searchFormType, sourceType = searchParams.sourceType, frontVersionId = searchParams.frontVersionId, utmGoogleExperimentId = searchParams.utmGoogleExperimentId, oldSearchResultsEnabled = searchParams.oldSearchResultsEnabled, allHotelsInSearchEnabled = searchParams.allHotelsInSearchEnabled;
    return (("/search?") +
        (callback ? SletatMainPageSearchParamsUrlKeys.Callback + "=" + callback + "&" : '') +
        (SletatMainPageSearchParamsUrlKeys.CountryToId + "=" + countryToId) +
        (cityFromId ? "&" + SletatMainPageSearchParamsUrlKeys.CityFromId + "=" + cityFromId : '') +
        (resortsIds && resortsIds.length > 0 ? "&" + SletatMainPageSearchParamsUrlKeys.SelectedResortsIds + "=" + resortsIds.join(',') : '') +
        (hotelsIds && hotelsIds.length > 0 ? "&" + SletatMainPageSearchParamsUrlKeys.SelectedHotelsIds + "=" + hotelsIds.join(',') : '') +
        (operatorsIds && operatorsIds.length > 0 ? "&" + SletatMainPageSearchParamsUrlKeys.SelectedOperatorsIds + "=" + operatorsIds.join(',') : '') +
        (hotelsCategoriesIds && hotelsCategoriesIds.length > 0 ? "&" + SletatMainPageSearchParamsUrlKeys.SelectedHotelCategoriesIds + "=" + hotelsCategoriesIds.join(',') : '') +
        (mealsIds && mealsIds.length > 0 ? "&" + SletatMainPageSearchParamsUrlKeys.SelectedMealTypesIds + "=" + mealsIds.join(',') : '') +
        (adultsCount ? "&" + SletatMainPageSearchParamsUrlKeys.AdultsCount + "=" + adultsCount : '') +
        (kidsCount ? "&" + SletatMainPageSearchParamsUrlKeys.KidsCount + "=" + kidsCount : '') +
        ((kidsCount > 0) ? "&" + SletatMainPageSearchParamsUrlKeys.Kid1Age + "=" + kidsAges[0] : '') +
        ((kidsCount > 1) ? "&" + SletatMainPageSearchParamsUrlKeys.Kid2Age + "=" + kidsAges[1] : '') +
        ((kidsCount > 2) ? "&" + SletatMainPageSearchParamsUrlKeys.Kid3Age + "=" + kidsAges[2] : '') +
        (minPrice ? "&" + SletatMainPageSearchParamsUrlKeys.MinPrice + "=" + minPrice : '') +
        (maxPrice ? "&" + SletatMainPageSearchParamsUrlKeys.MaxPrice + "=" + maxPrice : '') +
        (minDepartureDate ? "&" + SletatMainPageSearchParamsUrlKeys.MinDepartureDate + "=" + minDepartureDate : '') +
        (maxDepartureDate ? "&" + SletatMainPageSearchParamsUrlKeys.MaxDepartureDate + "=" + maxDepartureDate : '') +
        (currency ? "&" + SletatMainPageSearchParamsUrlKeys.Currency + "=" + currency : '') +
        (minHotelRating ? "&" + SletatMainPageSearchParamsUrlKeys.MinHotelRating + "=" + minHotelRating : '') +
        (minNightsCount ? "&" + SletatMainPageSearchParamsUrlKeys.MinNightsCount + "=" + minNightsCount : '') +
        (maxNightsCount ? "&" + SletatMainPageSearchParamsUrlKeys.MaxNightsCount + "=" + maxNightsCount : '') +
        (typeof isTicketsIncluded === 'boolean' ? "&" + SletatMainPageSearchParamsUrlKeys.IsTicketsIncluded + "=" + isTicketsIncluded : '') +
        (typeof hasTickets === 'boolean' ? "&" + SletatMainPageSearchParamsUrlKeys.HasTickets + "=" + hasTickets : '') +
        (typeof onlyCharter === 'boolean' ? "&" + SletatMainPageSearchParamsUrlKeys.OnlyCharter + "=" + onlyCharter : '') +
        (typeof onlyInstant === 'boolean' ? "&" + SletatMainPageSearchParamsUrlKeys.OnlyInstant + "=" + onlyInstant : '') +
        (typeof hotelIsNotInStop === 'boolean' ? "&" + SletatMainPageSearchParamsUrlKeys.IsHotelNotInStop + "=" + hotelIsNotInStop : '') +
        (typeof cacheMode === 'number' ? "&" + SletatMainPageSearchParamsUrlKeys.CacheMode + "=" + cacheMode : '') +
        (beachLines && beachLines.length > 0 ? "&" + SletatMainPageSearchParamsUrlKeys.SelectedBeachLines + "=" + beachLines.join(',') : '') +
        (utmSource ? "&" + SletatMainPageSearchParamsUrlKeys.UtmSource + "=" + utmSource : '') +
        (utmMedium ? "&" + SletatMainPageSearchParamsUrlKeys.UtmMedium + "=" + utmMedium : '') +
        (utmCampaign ? "&" + SletatMainPageSearchParamsUrlKeys.UtmCampaign + "=" + utmCampaign : '') +
        (utmContent ? "&" + SletatMainPageSearchParamsUrlKeys.UtmContent + "=" + utmContent : '') +
        (utmTerm ? "&" + SletatMainPageSearchParamsUrlKeys.UtmTerm + "=" + utmTerm : '') +
        (utmGoogleExperimentId ? "&" + SletatMainPageSearchParamsUrlKeys.UtmGoogleExperimentId + "=" + utmGoogleExperimentId : '') +
        (searchFormType ? "&" + SletatMainPageSearchParamsUrlKeys.SearchFormType + "=" + searchFormType : '') +
        (sourceType ? "&" + SletatMainPageSearchParamsUrlKeys.SourceType + "=" + sourceType : '') +
        (frontVersionId ? "&" + SletatMainPageSearchParamsUrlKeys.FrontVersionId + "=" + frontVersionId : '') +
        (typeof oldSearchResultsEnabled === 'boolean' ? "&" + SletatMainPageSearchParamsUrlKeys.OldSearchResultsEnabled + "=" + oldSearchResultsEnabled : '') +
        (typeof allHotelsInSearchEnabled === 'boolean' ? "&" + SletatMainPageSearchParamsUrlKeys.AllHotelsInSearchEnabled + "=" + allHotelsInSearchEnabled : ''));
}
exports.getSletatSearchUrl = getSletatSearchUrl;
/**
 * SLT-2011: Используется т.к. упёрлись в лимиты по GA Events
 */
var SourceTypes;
(function (SourceTypes) {
    /**
     * поиск открыт по seo роуту вида /tours-moscow-greece/
     */
    SourceTypes["SeoRoute"] = "route";
    /**
     * поиск открыт по кнопку 'Похожие туры' из КТ
     */
    SourceTypes["TourCard"] = "tourcard";
    /**
     * поиск открыт со страницы страны (страноведение)
     */
    SourceTypes["CountryPage"] = "country";
    /**
     * поиск открыт со страницы курорта (страноведение)
     */
    SourceTypes["ResortPage"] = "resort";
    /**
     * поиск открыт со страницы отеля (страноведение)
     */
    SourceTypes["HotelPage"] = "hotel";
})(SourceTypes = exports.SourceTypes || (exports.SourceTypes = {}));
var BeachLines;
(function (BeachLines) {
    /**
    * Первая пляжная линия
    */
    BeachLines[BeachLines["First"] = 1] = "First";
    /**
    * Вторая пляжная линия
    */
    BeachLines[BeachLines["Second"] = 2] = "Second";
    /**
    * Третья пляжная линия
    */
    BeachLines[BeachLines["Third"] = 3] = "Third";
})(BeachLines = exports.BeachLines || (exports.BeachLines = {}));
