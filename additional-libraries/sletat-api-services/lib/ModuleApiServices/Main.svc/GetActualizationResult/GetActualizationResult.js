"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActualizationResult = void 0;
var tslib_1 = require("tslib");
var BaseXhrModuleMainApiService_1 = require("../BaseXhrModuleMainApiService");
var ActualizePriceResponse_1 = require("../ActualizePrice/ActualizePriceResponse");
var GetActualizationResult = /** @class */ (function (_super) {
    tslib_1.__extends(GetActualizationResult, _super);
    function GetActualizationResult(options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetActualizationResult';
        if (options && options.host) {
            _this.serviceName = options.host;
        }
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    GetActualizationResult.prototype.setResponseWrapper = function (func) {
        this.ResponseWrapper = func;
    };
    return GetActualizationResult;
}(BaseXhrModuleMainApiService_1.BaseXhrModuleMainApiService));
/**
 * Сервис детальной актуализации тура.
 */
function getActualizationResult(params, actualizationParams, options) {
    var service = new GetActualizationResult(options);
    if (actualizationParams.target) {
        params.target = actualizationParams.target;
    }
    service.setResponseWrapper((0, ActualizePriceResponse_1.getActualizePriceResponseData)(actualizationParams, true));
    return service.call(params);
}
exports.getActualizationResult = getActualizationResult;
