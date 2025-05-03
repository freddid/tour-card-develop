"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseXhrClaimMainApiService = void 0;
var tslib_1 = require("tslib");
var BaseXhrClaimApiService_1 = require("../BaseXhrClaimApiService");
var BaseXhrClaimMainApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseXhrClaimMainApiService, _super);
    function BaseXhrClaimMainApiService() {
        var _this = _super.call(this) || this;
        _this.handlerName = 'Main.svc';
        return _this;
    }
    return BaseXhrClaimMainApiService;
}(BaseXhrClaimApiService_1.BaseXhrClaimApiService));
exports.BaseXhrClaimMainApiService = BaseXhrClaimMainApiService;
