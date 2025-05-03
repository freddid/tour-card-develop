"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModuleCommentsApiService = void 0;
var tslib_1 = require("tslib");
var BaseModuleApiService_1 = require("../BaseModuleApiService");
var BaseModuleCommentsApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseModuleCommentsApiService, _super);
    function BaseModuleCommentsApiService() {
        var _this = _super.call(this) || this;
        _this.handlerName = 'Comments.svc';
        return _this;
    }
    return BaseModuleCommentsApiService;
}(BaseModuleApiService_1.BaseModuleApiService));
exports.BaseModuleCommentsApiService = BaseModuleCommentsApiService;
