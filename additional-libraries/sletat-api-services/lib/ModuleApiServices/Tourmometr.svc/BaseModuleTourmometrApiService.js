"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModuleTourmometrApiService = void 0;
var tslib_1 = require("tslib");
var BaseModuleApiService_1 = require("../BaseModuleApiService");
var BaseModuleTourmometrApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseModuleTourmometrApiService, _super);
    function BaseModuleTourmometrApiService() {
        var _this = _super.call(this) || this;
        _this.handlerName = 'Tourmometer.svc';
        return _this;
    }
    return BaseModuleTourmometrApiService;
}(BaseModuleApiService_1.BaseModuleApiService));
exports.BaseModuleTourmometrApiService = BaseModuleTourmometrApiService;
