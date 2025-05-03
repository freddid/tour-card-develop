"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRequestOrder = exports.SaveRequestOrder = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var SaveRequestOrderResponse_1 = require("./SaveRequestOrderResponse");
/**
 * Возвращает список курортов для выбранного направления.
 */
var SaveRequestOrder = /** @class */ (function (_super) {
    tslib_1.__extends(SaveRequestOrder, _super);
    function SaveRequestOrder() {
        var _this = _super.call(this) || this;
        _this.methodName = 'SaveTourOrder';
        _this.ResponseWrapper = SaveRequestOrderResponse_1.getSaveRequestOrderResponseData;
        return _this;
    }
    return SaveRequestOrder;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.SaveRequestOrder = SaveRequestOrder;
function saveRequestOrder(params) {
    return new SaveRequestOrder().call(params);
}
exports.saveRequestOrder = saveRequestOrder;
