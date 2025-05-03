"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoadState = exports.GetLoadState = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetLoadStateResponse_1 = require("./GetLoadStateResponse");
var GetLoadState = /** @class */ (function (_super) {
    tslib_1.__extends(GetLoadState, _super);
    function GetLoadState() {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetLoadState';
        _this.ResponseWrapper = GetLoadStateResponse_1.getGetLoadStateResponseData;
        return _this;
    }
    return GetLoadState;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetLoadState = GetLoadState;
/**
 * Получить состояние загрузки
 * @deprecated Используй /src/module/getLoadState
 */
function getLoadState(params) {
    return new GetLoadState().call(params);
}
exports.getLoadState = getLoadState;
