"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartCities = exports.GetDepartCities = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetDepartCitiesResponse_1 = require("./GetDepartCitiesResponse");
/**
 * @deprecated нужно использовать module/getDepartCities
 * Возвращает список городов вылета.
 */
var GetDepartCities = /** @class */ (function (_super) {
    tslib_1.__extends(GetDepartCities, _super);
    function GetDepartCities(options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetDepartCities';
        _this.ResponseWrapper = GetDepartCitiesResponse_1.getGetDepartCitiesResponseData;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    return GetDepartCities;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetDepartCities = GetDepartCities;
function getDepartCities(params, options) {
    return new GetDepartCities(options).call(params);
}
exports.getDepartCities = getDepartCities;
