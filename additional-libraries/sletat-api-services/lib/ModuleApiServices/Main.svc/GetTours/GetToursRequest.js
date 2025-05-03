"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGetToursRequestData = exports.GroupBy = exports.CacheMode = exports.BeachLines = void 0;
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
/**
 * SITES-3109: Параметры кэша
 * Аналогичный enum и на бэке
 */
var CacheMode;
(function (CacheMode) {
    CacheMode[CacheMode["NoCache"] = 0] = "NoCache";
    CacheMode[CacheMode["UseCacheOnError"] = 1] = "UseCacheOnError";
    CacheMode[CacheMode["SmartCache"] = 2] = "SmartCache";
    CacheMode[CacheMode["UseCacheOnly"] = 3] = "UseCacheOnly";
    CacheMode[CacheMode["SmartCacheWoOnline"] = 4] = "SmartCacheWoOnline";
    CacheMode[CacheMode["UseAerospike"] = 5] = "UseAerospike";
})(CacheMode = exports.CacheMode || (exports.CacheMode = {}));
/**
 * Группировка туров
 */
var GroupBy;
(function (GroupBy) {
    /**
     * По отелю
     */
    GroupBy[GroupBy["Hotel"] = 'hotel'] = "Hotel";
    /**
     * По дате заезда и цене
     */
    GroupBy[GroupBy["CheckInAndPrice"] = 'so_checkin_price'] = "CheckInAndPrice";
    /**
     * Рекламные туры
     */
    GroupBy[GroupBy["SpecialHotels"] = 'special_hotels'] = "SpecialHotels";
    /**
     * Минимальная стоимость тура в отеле
     */
    GroupBy[GroupBy["MinHotelPrice"] = 'ht_minhotelprices'] = "MinHotelPrice";
    /**
     * Отсортировано по минимальной стоимости в отеле
     */
    GroupBy[GroupBy["SortedHotels"] = 'sortedHotels'] = "SortedHotels";
    /**
     * Сортировка по цене. Используется в горячке
     */
    GroupBy[GroupBy["SortByPrice"] = 'so_price'] = "SortByPrice";
    /**
     *  Работает идентично методу 'sortedHotels' (в комменте к этой задачке), но для ВСЕХ отелей, включая неслинкованые.
     *  Предполагается использовать этот метод при группировке по отелю
     */
    GroupBy[GroupBy["AllSortedHotels"] = 'all_sortedHotels'] = "AllSortedHotels";
    /**
     * Сортировка по популярности отеля. От наиболее популярных к менее популярным
     */
    GroupBy[GroupBy["HotelPopularity"] = 'hotelsPopularity'] = "HotelPopularity";
})(GroupBy = exports.GroupBy || (exports.GroupBy = {}));
/**
 * Преобразует параметры, с которыми работаем на клиенте в серверный вид (превращает числа в строки, массивы в числа и тд)
 */
function getGetToursRequestData(searchFormParams) {
    // дефОЛТные
    var result = {
        userId: '',
        pageSize: 20,
        pageNumber: 1,
        countryId: 0,
        cityFromId: 0,
        cities: '',
        meals: '',
        stars: '',
        hotels: '',
        s_adults: '0',
        s_kids: '0',
        s_kids_ages: '',
        s_nightsMin: '0',
        s_nightsMax: '0',
        currencyAlias: '',
        s_departFrom: '',
        s_departTo: '',
        visibleOperators: '',
        s_hotelIsNotInStop: 'true',
        s_hasTickets: 'true',
        s_ticketsIncluded: 'true',
        siteSessionId: '',
        updateResult: '1',
        filter: 0,
        f_to_id: '',
        groupBy: '',
        includeDescriptions: 1,
        includeOilTaxesAndVisa: 1,
        jskey: 1,
        minHotelRating: '',
        beachLines: '',
        rtb: false
    };
    result.requestId = searchFormParams.requestId;
    result.cityFromId = searchFormParams.cityFromId;
    result.countryId = searchFormParams.countryToId;
    result.cities = searchFormParams.resortsIds.join(',');
    result.hotels = searchFormParams.hotelsIds.join(',');
    result.meals = searchFormParams.mealsIds.join(',');
    result.stars = searchFormParams.hotelsCategoriesIds.join(',');
    result.s_adults = String(searchFormParams.adultsCount);
    result.s_kids = String(searchFormParams.kidsCount);
    result.s_kids_ages = searchFormParams.kidsAges.slice(0, searchFormParams.kidsCount).join(','); // отсылать возраста детей только для переданного количества
    result.s_nightsMin = String(searchFormParams.minNightsCount);
    result.s_nightsMax = String(searchFormParams.maxNightsCount);
    if (searchFormParams.minPrice) {
        result.s_priceMin = String(searchFormParams.minPrice);
    }
    if (searchFormParams.maxPrice) {
        result.s_priceMax = String(searchFormParams.maxPrice);
    }
    result.currencyAlias = searchFormParams.currency;
    result.s_departFrom = searchFormParams.minDepartureDate;
    result.s_departTo = searchFormParams.maxDepartureDate;
    result.s_hotelIsNotInStop = searchFormParams.hotelIsNotInStop ? 'true' : 'false';
    result.s_hasTickets = searchFormParams.hasTickets ? 'true' : 'false';
    result.s_ticketsIncluded = searchFormParams.isTicketsIncluded ? 'true' : 'false';
    result.includeDescriptions = searchFormParams.includeDescriptions ? 1 : 0;
    result.includeOilTaxesAndVisa = searchFormParams.includeOilTaxesAndVisa ? 1 : 0;
    result.visibleOperators = searchFormParams.operatorsIds.join(',');
    result.userId = searchFormParams.userId;
    result.siteSessionId = searchFormParams.siteSessionId;
    result.pageNumber = searchFormParams.pageNumber || result.pageNumber;
    result.pageSize = searchFormParams.pageSize || result.pageSize;
    result.groupBy = searchFormParams.groupBy;
    result.updateResult = (searchFormParams.updateResult ? '1' : '0') || result.updateResult;
    result.filter = searchFormParams.filter ? 1 : 0;
    result.f_to_id = searchFormParams.idsToFilter.join(',');
    if (searchFormParams.minHotelRating) {
        result.minHotelRating = String(searchFormParams.minHotelRating);
    }
    result.beachLines = searchFormParams.beachLines.join(',');
    result.requestTimeout = searchFormParams.requestTimeout || 0;
    result.s_showcase = String(!!searchFormParams.isShowcase);
    result.templateName = searchFormParams.templateName || '';
    result.rtb = !!searchFormParams.useRtb;
    if (searchFormParams.calculateFullPrice) {
        result.calcFullPrice = 1;
    }
    if (searchFormParams.showHotelFacilities) {
        result.showHotelFacilities = 1;
    }
    if (searchFormParams.isHotTourWidget) {
        result.isHotTourWidget = 1;
    }
    if (searchFormParams.target) {
        result.target = searchFormParams.target;
    }
    if (typeof searchFormParams.cacheMode === 'number') {
        result.cacheMode = searchFormParams.cacheMode;
    }
    return result;
}
exports.getGetToursRequestData = getGetToursRequestData;
