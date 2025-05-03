"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountriesList = exports.GetCountriesList = void 0;
var tslib_1 = require("tslib");
var BaseModuleTourmometrApiService_1 = require("../BaseModuleTourmometrApiService");
var GetCountriesListResponse_1 = require("./GetCountriesListResponse");
var GetCountriesList = /** @class */ (function (_super) {
    tslib_1.__extends(GetCountriesList, _super);
    function GetCountriesList(options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetCountriesList';
        _this.ResponseWrapper = GetCountriesListResponse_1.getGetCountriesListResponseData;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    return GetCountriesList;
}(BaseModuleTourmometrApiService_1.BaseModuleTourmometrApiService));
exports.GetCountriesList = GetCountriesList;
function getCountriesList(params, options) {
    return new GetCountriesList(options).call(params);
}
exports.getCountriesList = getCountriesList;
