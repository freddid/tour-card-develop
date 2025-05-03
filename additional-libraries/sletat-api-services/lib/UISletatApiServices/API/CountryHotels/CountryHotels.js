"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagedHotelsByQueryAndCountry = exports.getHotelsByQueryAndCountry = exports.CountryHotelsCount = exports.CountryHotels = void 0;
var tslib_1 = require("tslib");
var BaseUISletatApiService_1 = require("../BaseUISletatApiService");
var CountryHotelsQueryBuilder_1 = require("./CountryHotelsQueryBuilder");
/**
 * Возвращает список Отелей с лучшими предложениями для выбранного направления.
 * @deprecated в пользу src/ui/find-hotels/getHotelsByQuery/
 */
var CountryHotels = /** @class */ (function (_super) {
    tslib_1.__extends(CountryHotels, _super);
    function CountryHotels(countryID, cityID) {
        var _this = _super.call(this) || this;
        _this.methodName = "countries/".concat(countryID, "/hotels/fromcity/").concat(cityID);
        _this.isErrorResultFieldName = 'isError';
        _this.errorMessageResultFieldName = 'errorMessage';
        _this.dataResultFieldName = 'data';
        _this.headers = {
            Accept: '*/*'
        };
        return _this;
    }
    CountryHotels.prototype.getResultName = function () {
        return null;
    };
    return CountryHotels;
}(BaseUISletatApiService_1.BaseUISletatApiService));
exports.CountryHotels = CountryHotels;
/**
 * Возвращает кол-во результатов по запросу
 * @deprecated в пользу src/ui/find-hotels/getCountHotelsByQuery/
 */
var CountryHotelsCount = /** @class */ (function (_super) {
    tslib_1.__extends(CountryHotelsCount, _super);
    function CountryHotelsCount(countryID, cityID) {
        var _this = _super.call(this) || this;
        _this.methodName = "countries/".concat(countryID, "/hotels/fromcity/").concat(cityID, "/count");
        _this.isErrorResultFieldName = 'isError';
        _this.errorMessageResultFieldName = 'errorMessage';
        _this.dataResultFieldName = 'data';
        _this.headers = {
            Accept: '*/*'
        };
        return _this;
    }
    CountryHotelsCount.prototype.getResultName = function () {
        return null;
    };
    return CountryHotelsCount;
}(BaseUISletatApiService_1.BaseUISletatApiService));
exports.CountryHotelsCount = CountryHotelsCount;
function getHotelsByQueryAndCountry(request) {
    var filter = (0, CountryHotelsQueryBuilder_1.CountryHotelsQueryBuilder)(request.resortID, request.hotelCategoryID, request.query);
    return new CountryHotels(request.countryID, request.cityID).call(filter
        ? {
            $filter: filter
        }
        : {});
}
exports.getHotelsByQueryAndCountry = getHotelsByQueryAndCountry;
/**
 * @deprecated в пользу src/ui/find-hotels/getPagedHotelsByQuery/
 */
function getPagedHotelsByQueryAndCountry(_a) {
    var resortID = _a.resortID, query = _a.query, hotelCategoryID = _a.hotelCategoryID, itemsPerPage = _a.itemsPerPage, countryID = _a.countryID, cityID = _a.cityID, page = _a.page, orderby = _a.orderby;
    var filter = (0, CountryHotelsQueryBuilder_1.CountryHotelsQueryBuilder)(resortID, hotelCategoryID, query);
    return new Promise(function (resolve) {
        var getResultsService = new CountryHotels(countryID, cityID);
        var getResultsCountService = new CountryHotelsCount(countryID, cityID);
        var getResultsServiceParams = {
            $skip: (page - 1) * itemsPerPage,
            $top: itemsPerPage,
            $orderby: orderby || 'Alias'
        };
        if (filter) {
            getResultsServiceParams.$filter = filter;
        }
        Promise.all([
            getResultsService.call(getResultsServiceParams),
            getResultsCountService.call(filter ? { $filter: filter } : {})
        ]).then(function (response) {
            var hotels = response[0], totalCount = response[1];
            resolve({ hotels: hotels, totalCount: totalCount });
        });
    });
}
exports.getPagedHotelsByQueryAndCountry = getPagedHotelsByQueryAndCountry;
