"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTownFromByIp = exports.GetTownFromByIp = void 0;
var tslib_1 = require("tslib");
var BaseUISletatLandingToursApiService_1 = require("../BaseUISletatLandingToursApiService");
var GetTownFromByIpResponse_1 = require("./GetTownFromByIpResponse");
/**
 * Сервис для получения идентификатора города вылета по IP-адресу.
 */
var GetTownFromByIp = /** @class */ (function (_super) {
    tslib_1.__extends(GetTownFromByIp, _super);
    function GetTownFromByIp() {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetTownFromByIp';
        _this.ResponseWrapper = GetTownFromByIpResponse_1.getGetTownFromByIpResponseData;
        return _this;
    }
    return GetTownFromByIp;
}(BaseUISletatLandingToursApiService_1.BaseUISletatLandingToursApiService));
exports.GetTownFromByIp = GetTownFromByIp;
function getTownFromByIp(params) {
    return new GetTownFromByIp().call(params);
}
exports.getTownFromByIp = getTownFromByIp;
