"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCitiesList = exports.GetCitiesList = void 0;
var tslib_1 = require("tslib");
var BaseUISletatWhereToBuyApiService_1 = require("../BaseUISletatWhereToBuyApiService");
var GetCitiesListResponse_1 = require("./GetCitiesListResponse");
/**
 * Сервис для получения списка городов и станций метро
 */
var GetCitiesList = /** @class */ (function (_super) {
    tslib_1.__extends(GetCitiesList, _super);
    function GetCitiesList(host) {
        var _this = _super.call(this) || this;
        _this.useCache = true;
        _this.useStorageCache = true;
        _this.methodName = 'cities';
        _this.ResponseWrapper = GetCitiesListResponse_1.getGetCitiesListResponseData;
        // SLT-1869
        if (host) {
            _this.serviceName = "".concat(host, "/api");
        }
        return _this;
    }
    return GetCitiesList;
}(BaseUISletatWhereToBuyApiService_1.BaseUISletatWhereToBuyApiService));
exports.GetCitiesList = GetCitiesList;
function getCitiesList(params, host) {
    return new GetCitiesList(host).call(params);
}
exports.getCitiesList = getCitiesList;
