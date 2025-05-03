"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModuleMainApiService = void 0;
var tslib_1 = require("tslib");
var BaseModuleApiService_1 = require("../BaseModuleApiService");
/**
 * deprecated
 * лучше использовать BaseXhrModuleMainApiService.ts
 * подробности в src/BaseXhrApiService.ts
 */
var BaseModuleMainApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseModuleMainApiService, _super);
    function BaseModuleMainApiService() {
        var _this = _super.call(this) || this;
        _this.handlerName = 'Main.svc';
        return _this;
    }
    return BaseModuleMainApiService;
}(BaseModuleApiService_1.BaseModuleApiService));
exports.BaseModuleMainApiService = BaseModuleMainApiService;
