"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOfficesListByCoords = exports.getOfficesListByCity = exports.getOfficesList = exports.GetOfficesList = void 0;
var tslib_1 = require("tslib");
var BaseUISletatWhereToBuyApiService_1 = require("../BaseUISletatWhereToBuyApiService");
var GetOfficesListResponse_1 = require("./GetOfficesListResponse");
/**
 * Сервис для получения списка городов и станций метро
 */
var GetOfficesList = /** @class */ (function (_super) {
    tslib_1.__extends(GetOfficesList, _super);
    function GetOfficesList(host) {
        var _this = _super.call(this) || this;
        _this.useCache = true;
        _this.useStorageCache = true;
        _this.methodName = 'offices';
        _this.ResponseWrapper = GetOfficesListResponse_1.getGetOfficesListResponseData;
        // SLT-1869
        if (host) {
            _this.serviceName = "".concat(host, "/api");
        }
        return _this;
    }
    return GetOfficesList;
}(BaseUISletatWhereToBuyApiService_1.BaseUISletatWhereToBuyApiService));
exports.GetOfficesList = GetOfficesList;
function getOfficesList(params, host) {
    return new GetOfficesList(host).call(params);
}
exports.getOfficesList = getOfficesList;
function getOfficesListByCity(cityId, isFranchise, isHirePurchase) {
    var params = {
        $filter: 'IsPaid eq true'
    };
    if (cityId !== undefined && cityId > 0) {
        params.$filter += " and (ParentCityId eq ".concat(cityId, " or CityId eq ").concat(cityId, ")");
    }
    if (isFranchise) {
        params.$filter += " and IsFranchise eq ".concat(isFranchise);
    }
    if (isHirePurchase) {
        params.$filter += " and IsHirePurchaseAvailable eq ".concat(isHirePurchase);
    }
    return getOfficesList(params);
}
exports.getOfficesListByCity = getOfficesListByCity;
/**
 * Получаем офисы по координатам, но если передаём cityID, то ИСКЛЮЧАЕМ офисы этого города из результата
 */
function getOfficesListByCoords(coords, cityId, isFranchise, isHirePurchase) {
    var params = {
        $filter: 'IsPaid eq true'
    };
    if (coords !== undefined && coords !== null) {
        params.$filter += " and Latitude lt ".concat(coords.leftLat.toFixed(6));
        params.$filter += " and Longitude gt ".concat(coords.leftLon.toFixed(6));
        params.$filter += " and Latitude gt ".concat(coords.rightLat.toFixed(6));
        params.$filter += " and Longitude lt ".concat(coords.rightLon.toFixed(6));
    }
    if (cityId !== undefined && cityId > 0) {
        params.$filter += " and (ParentCityId ne ".concat(cityId, " and CityId ne ").concat(cityId, ")");
    }
    if (isFranchise) {
        params.$filter += " and IsFranchise eq ".concat(isFranchise);
    }
    if (isHirePurchase) {
        params.$filter += " and IsHirePurchaseAvailable eq ".concat(isHirePurchase);
    }
    return getOfficesList(params);
}
exports.getOfficesListByCoords = getOfficesListByCoords;
