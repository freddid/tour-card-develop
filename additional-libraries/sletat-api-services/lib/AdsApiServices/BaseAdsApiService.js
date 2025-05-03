"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAdsApiService = void 0;
var tslib_1 = require("tslib");
var sletat_api_services_consts_1 = require("sletat-api-services-consts");
var BaseApiService_1 = require("../BaseApiService");
/**
 * @deprecated
 * используем функции из ads
 */
var BaseAdsApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseAdsApiService, _super);
    function BaseAdsApiService() {
        var _this = _super.call(this) || this;
        _this.serviceName = sletat_api_services_consts_1.ADS_HOST_NAME;
        return _this;
    }
    return BaseAdsApiService;
}(BaseApiService_1.BaseApiService));
exports.BaseAdsApiService = BaseAdsApiService;
