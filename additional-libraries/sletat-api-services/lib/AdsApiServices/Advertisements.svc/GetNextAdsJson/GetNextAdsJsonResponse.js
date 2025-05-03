"use strict";
// import { Sletat, ads } from '../../../../auto-generated-server-models-and-request-handlers';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGetNextAdsJsonResponseData = exports.CustomAdvertisement = exports.ExcursionAdvertisement = void 0;
/**
 * Экскурсионное объявление
 */
var ExcursionAdvertisement = /** @class */ (function () {
    function ExcursionAdvertisement(data) {
        this.price = data.Price;
        this.currency = data.Currency;
        this.isMinPrice = data.IsMinPrice;
        this.duration = data.Duration;
        this.arrivalDates = data.ArrivalDates;
        this.sourceId = data.SourceId;
        this.towns = data.Towns;
        this.types = data.Types;
        this.url = data.Url;
    }
    return ExcursionAdvertisement;
}());
exports.ExcursionAdvertisement = ExcursionAdvertisement;
/**
 * Обычное объявление
 */
var CustomAdvertisement = /** @class */ (function () {
    function CustomAdvertisement(data /* ads.sletat.ru.Engine.AdJsonItem*/) {
        this.date = data.Date;
        this.price = data.Price;
        this.currency = data.Currency;
        this.isMinPrice = data.IsMinPrice;
        this.description = data.Description;
        this.resorts = data.Resorts;
        this.countries = data.Countries;
        this.townFromName = data.TownFromName;
        this.url = data.Url;
        var countriesString = data.Countries ? data.Countries.join(' - ') : '';
        var airportsString = data.Resorts ? data.Resorts.join(' - ') : '';
        this.way = this.townFromName;
        if (countriesString) {
            this.way = countriesString;
        }
        else if (airportsString) {
            this.way = airportsString;
        }
    }
    return CustomAdvertisement;
}());
exports.CustomAdvertisement = CustomAdvertisement;
/**
 * @deprecated
 * используем функции из ads/getNextAdsJson/response
 */
function getGetNextAdsJsonResponseData(_a /* Sletat.ApiServices.IGetNextAdsJsonResponse*/) {
    var TownFromName = _a.TownFromName, CountryName = _a.CountryName, RouteSearchCount = _a.RouteSearchCount, _b = _a.CustomItems, CustomItems = _b === void 0 ? [] : _b, _c = _a.ExcursionItems, ExcursionItems = _c === void 0 ? [] : _c;
    return {
        townFromName: TownFromName,
        countryToName: CountryName,
        routeSearchCount: RouteSearchCount,
        customItems: CustomItems.map(function (advertisementTour) { return new CustomAdvertisement(advertisementTour); }),
        excursionItems: ExcursionItems.map(function (excursionItem) { return new ExcursionAdvertisement(excursionItem); })
    };
}
exports.getGetNextAdsJsonResponseData = getGetNextAdsJsonResponseData;
