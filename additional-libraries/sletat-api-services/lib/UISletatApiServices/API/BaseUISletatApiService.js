"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUISletatApiService = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseUISletatApiService_1 = require("../BaseUISletatApiService");
var BaseUISletatApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseUISletatApiService, _super);
    function BaseUISletatApiService() {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.GET;
        _this.handlerName = 'api';
        return _this;
    }
    return BaseUISletatApiService;
}(BaseUISletatApiService_1.BaseUISletatApiService));
exports.BaseUISletatApiService = BaseUISletatApiService;
