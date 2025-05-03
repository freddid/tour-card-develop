"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClaimApiService = void 0;
var tslib_1 = require("tslib");
var sletat_api_services_consts_1 = require("sletat-api-services-consts");
var BaseApiService_1 = require("../BaseApiService");
/**
 * @deprecated
 * лучше использовать BaseXhrClaimApiService.ts
 * подробности в src/BaseXhrApiService.ts
 */
var BaseClaimApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseClaimApiService, _super);
    function BaseClaimApiService() {
        var _this = _super.call(this) || this;
        _this.serviceName = sletat_api_services_consts_1.CLAIMS_HOST_NAME;
        _this.protocol = sletat_api_services_consts_1.CLAIMS_PROTOCOL && sletat_api_services_consts_1.CLAIMS_PROTOCOL === 'http' ? BaseApiService_1.Protocols.HTTP : BaseApiService_1.Protocols.HTTPS;
        _this.isJSONPAvailable = true;
        _this.getResultName = function () {
            return "".concat(_this.methodName, "Result");
        };
        return _this;
    }
    return BaseClaimApiService;
}(BaseApiService_1.BaseApiService));
exports.BaseClaimApiService = BaseClaimApiService;
