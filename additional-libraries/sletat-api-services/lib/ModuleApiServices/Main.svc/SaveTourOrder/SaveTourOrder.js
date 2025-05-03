"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTourOrder = exports.saveTourOrderWithFlight = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var SaveTourOrderRequest_1 = require("./SaveTourOrderRequest");
var http_lite_1 = require("http-lite");
/**
 * Метод отправки заявки на поиск/покупку тура.
 */
var SaveTourOrder = /** @class */ (function (_super) {
    tslib_1.__extends(SaveTourOrder, _super);
    function SaveTourOrder(options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'SaveTourOrder';
        _this.RequestWrapper = SaveTourOrderRequest_1.getSaveTourOrderRequestWrapper;
        _this.httpMethod = http_lite_1.HTTPMethods.GET;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    return SaveTourOrder;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
var SaveTourOrderWithFlight = /** @class */ (function (_super) {
    tslib_1.__extends(SaveTourOrderWithFlight, _super);
    function SaveTourOrderWithFlight(options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'SaveTourOrderWithFlight';
        _this.RequestWrapper = SaveTourOrderRequest_1.getSaveTourOrderRequestWrapper;
        _this.httpMethod = http_lite_1.HTTPMethods.POST;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    return SaveTourOrderWithFlight;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
function saveTourOrderWithFlight(params, options) {
    return new SaveTourOrderWithFlight(options).call(params);
}
exports.saveTourOrderWithFlight = saveTourOrderWithFlight;
function saveTourOrder(params, options) {
    return new SaveTourOrder(options).call(params);
}
exports.saveTourOrder = saveTourOrder;
