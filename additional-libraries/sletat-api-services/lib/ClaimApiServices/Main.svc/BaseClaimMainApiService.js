"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClaimMainApiService = void 0;
var tslib_1 = require("tslib");
var BaseClaimApiService_1 = require("../BaseClaimApiService");
var BaseClaimMainApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseClaimMainApiService, _super);
    function BaseClaimMainApiService() {
        var _this = _super.call(this) || this;
        _this.handlerName = 'Main.svc';
        return _this;
    }
    return BaseClaimMainApiService;
}(BaseClaimApiService_1.BaseClaimApiService));
exports.BaseClaimMainApiService = BaseClaimMainApiService;
