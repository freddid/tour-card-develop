"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseXhrClaimApiService = void 0;
var tslib_1 = require("tslib");
var sletat_api_services_consts_1 = require("sletat-api-services-consts");
var BaseXhrApiService_1 = require("../BaseXhrApiService");
var HttpClient_1 = require("../http/HttpClient");
/**
 * @deprecated
 * используем claims
 */
var BaseXhrClaimApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseXhrClaimApiService, _super);
    function BaseXhrClaimApiService() {
        var _this = _super.call(this) || this;
        _this.serviceName = sletat_api_services_consts_1.CLAIMS_HOST_NAME;
        _this.protocol = sletat_api_services_consts_1.CLAIMS_PROTOCOL && sletat_api_services_consts_1.CLAIMS_PROTOCOL === 'http' ? HttpClient_1.Protocols.HTTP : HttpClient_1.Protocols.HTTPS;
        _this.getResultName = function () {
            return "".concat(_this.methodName, "Result");
        };
        return _this;
    }
    return BaseXhrClaimApiService;
}(BaseXhrApiService_1.BaseXhrApiService));
exports.BaseXhrClaimApiService = BaseXhrClaimApiService;
