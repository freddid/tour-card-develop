"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountries = exports.GetCountries = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetCountriesResponse_1 = require("./GetCountriesResponse");
/**
 * @deprecated нужно использовать module/getCountries
 * Возвращает список стран по городу вылета.
 */
var GetCountries = /** @class */ (function (_super) {
    tslib_1.__extends(GetCountries, _super);
    function GetCountries() {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetCountries';
        _this.ResponseWrapper = GetCountriesResponse_1.getGetCountriesResponseData;
        return _this;
    }
    return GetCountries;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetCountries = GetCountries;
function getCountries(params) {
    return new GetCountries().call(params);
}
exports.getCountries = getCountries;
