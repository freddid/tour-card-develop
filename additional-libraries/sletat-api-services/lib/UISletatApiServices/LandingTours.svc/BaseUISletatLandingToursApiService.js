"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUISletatLandingToursApiService = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseUISletatApiService_1 = require("../BaseUISletatApiService");
var BaseUISletatLandingToursApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseUISletatLandingToursApiService, _super);
    function BaseUISletatLandingToursApiService() {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.GET;
        _this.handlerName = 'Landing/LandingTours.svc';
        _this.serviceName += '/Services';
        return _this;
    }
    return BaseUISletatLandingToursApiService;
}(BaseUISletatApiService_1.BaseUISletatApiService));
exports.BaseUISletatLandingToursApiService = BaseUISletatLandingToursApiService;
