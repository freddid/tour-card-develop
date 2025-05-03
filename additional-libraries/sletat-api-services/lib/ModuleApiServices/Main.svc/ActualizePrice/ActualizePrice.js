"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizePrice = void 0;
var tslib_1 = require("tslib");
var isUndefined_1 = require("../../../utils/isUndefined");
var BaseXhrModuleMainApiService_1 = require("../BaseXhrModuleMainApiService");
var ActualizePriceRequest_1 = require("./ActualizePriceRequest");
var ActualizePriceResponse_1 = require("./ActualizePriceResponse");
/**
 * @deprecated
 * используем module/tourActualization/actualizePrice
 */
var ActualizePrice = /** @class */ (function (_super) {
    tslib_1.__extends(ActualizePrice, _super);
    function ActualizePrice(requestParams, isDetailedActualization, options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'ActualizePrice';
        _this.isSearchWithRobot = !!options && !!options.isSearchWithRobot;
        _this.RequestWrapper = ActualizePriceRequest_1.ActualizePriceRequestWrapper;
        if (options && options.host) {
            _this.serviceName = options.host;
        }
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        if (!(0, isUndefined_1.isUndefined)(requestParams) && !(0, isUndefined_1.isUndefined)(isDetailedActualization)) {
            _this.ResponseWrapper = (0, ActualizePriceResponse_1.getActualizePriceResponseData)(requestParams, isDetailedActualization);
        }
        return _this;
    }
    return ActualizePrice;
}(BaseXhrModuleMainApiService_1.BaseXhrModuleMainApiService));
/**
 * Сервис актуализации тура.
 * @deprecated
 * используем module/tourActualization/actualizePrice
 */
function actualizePrice(params, options) {
    var service = new ActualizePrice(params, false, options);
    return service.call(params);
}
exports.actualizePrice = actualizePrice;
