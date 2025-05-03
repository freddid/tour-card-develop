"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCities = exports.GetCities = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetCitiesResponse_1 = require("./GetCitiesResponse");
/**
 * @deprecated Нужно использовать modules/getCities
 * Возвращает список курортов для выбранного направления.
 */
var GetCities = /** @class */ (function (_super) {
    tslib_1.__extends(GetCities, _super);
    function GetCities() {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetCities';
        _this.ResponseWrapper = GetCitiesResponse_1.getGetCitiesResponseData;
        return _this;
    }
    return GetCities;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetCities = GetCities;
function getCities(params) {
    return new GetCities().call(params);
}
exports.getCities = getCities;
