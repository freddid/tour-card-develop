"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClaimsSettings = void 0;
var tslib_1 = require("tslib");
var BaseXhrClaimMainApiService_1 = require("../BaseXhrClaimMainApiService");
var HttpClient_1 = require("../../../http/HttpClient");
var PrepaymentSchema_1 = require("./PrepaymentSchema");
/**
 * @deprecated
 * SLT-2674 используется в приложении tour-card модулей
 */
var GetSettings = /** @class */ (function (_super) {
    tslib_1.__extends(GetSettings, _super);
    function GetSettings(options) {
        var _this = _super.call(this) || this;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        _this.httpMethod = HttpClient_1.HttpMethods.POST;
        _this.methodName = 'GetSettings';
        _this.RequestWrapper = requestParamsWrapper;
        _this.ResponseWrapper = responseWrapper;
        return _this;
    }
    return GetSettings;
}(BaseXhrClaimMainApiService_1.BaseXhrClaimMainApiService));
function getClaimsSettings(params, options) {
    return new GetSettings(options).call(params);
}
exports.getClaimsSettings = getClaimsSettings;
function requestParamsWrapper(params) {
    var target = params.target;
    return {
        Host: params.host,
        OfferId: params.offerId,
        RequestId: params.requestId,
        SourceId: params.sourceId,
        target: target
    };
}
function responseWrapper(response) {
    return {
        currency: response.BillingCurrency,
        operationStatus: response.OperationStatus,
        prepaymentSchemas: (response.PrepaymentSchemas || []).map(function (scheme) { return (0, PrepaymentSchema_1.prepaymentSchemaConverter)(scheme); }),
        serviceMessage: response.ServiceMessage,
        twoStepsHolding: response.TwoStepsHolding
    };
}
