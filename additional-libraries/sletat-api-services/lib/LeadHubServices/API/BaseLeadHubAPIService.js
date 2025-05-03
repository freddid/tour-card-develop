"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLeadHubAPIService = void 0;
var tslib_1 = require("tslib");
var BaseLeadHubService_1 = require("../BaseLeadHubService");
var BaseLeadHubAPIService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseLeadHubAPIService, _super);
    function BaseLeadHubAPIService(sourceToken) {
        var _this = _super.call(this) || this;
        _this.headers['Source-Token'] = sourceToken;
        _this.handlerName = 'api/v2';
        return _this;
    }
    return BaseLeadHubAPIService;
}(BaseLeadHubService_1.BaseLeadHubService));
exports.BaseLeadHubAPIService = BaseLeadHubAPIService;
