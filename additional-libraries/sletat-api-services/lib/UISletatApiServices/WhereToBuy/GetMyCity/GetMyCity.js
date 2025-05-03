"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyCity = exports.GetMyCity = void 0;
var tslib_1 = require("tslib");
var BaseUISletatWhereToBuyApiService_1 = require("../BaseUISletatWhereToBuyApiService");
var GetMyCityResponse_1 = require("./GetMyCityResponse");
/**
 * Сервис для получения списка городов и станций метро
 */
var GetMyCity = /** @class */ (function (_super) {
    tslib_1.__extends(GetMyCity, _super);
    function GetMyCity(host) {
        var _this = _super.call(this) || this;
        _this.useCache = true;
        _this.useStorageCache = true;
        _this.methodName = 'geocity';
        _this.ResponseWrapper = GetMyCityResponse_1.getGetMyCityResponseData;
        // SLT-1869
        if (host) {
            _this.serviceName = "".concat(host, "/api");
        }
        return _this;
    }
    return GetMyCity;
}(BaseUISletatWhereToBuyApiService_1.BaseUISletatWhereToBuyApiService));
exports.GetMyCity = GetMyCity;
function getMyCity(params, host) {
    return new GetMyCity(host).call(params);
}
exports.getMyCity = getMyCity;
