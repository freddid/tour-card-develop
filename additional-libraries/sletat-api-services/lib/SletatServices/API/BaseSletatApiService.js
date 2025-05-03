"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSletatApiService = void 0;
var tslib_1 = require("tslib");
var BaseSletatService_1 = require("../BaseSletatService");
var BaseSletatApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseSletatApiService, _super);
    function BaseSletatApiService() {
        var _this = _super.call(this) || this;
        _this.handlerName = 'api';
        return _this;
    }
    return BaseSletatApiService;
}(BaseSletatService_1.BaseSletatService));
exports.BaseSletatApiService = BaseSletatApiService;
