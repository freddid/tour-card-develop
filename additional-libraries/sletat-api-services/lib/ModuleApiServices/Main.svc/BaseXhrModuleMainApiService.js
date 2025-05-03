"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseXhrModuleMainApiService = void 0;
var tslib_1 = require("tslib");
var BaseXhrModuleApiService_1 = require("../BaseXhrModuleApiService");
var BaseXhrModuleMainApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseXhrModuleMainApiService, _super);
    function BaseXhrModuleMainApiService() {
        var _this = _super.call(this) || this;
        _this.handlerName = 'Main.svc';
        return _this;
    }
    return BaseXhrModuleMainApiService;
}(BaseXhrModuleApiService_1.BaseXhrModuleApiService));
exports.BaseXhrModuleMainApiService = BaseXhrModuleMainApiService;
