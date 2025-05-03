"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUISletatApiService = void 0;
var tslib_1 = require("tslib");
var sletat_api_services_consts_1 = require("sletat-api-services-consts");
var BaseApiService_1 = require("../BaseApiService");
var BaseUISletatApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseUISletatApiService, _super);
    function BaseUISletatApiService() {
        var _this = _super.call(this) || this;
        _this.serviceName = sletat_api_services_consts_1.UI_SLETAT_API_HOST_NAME;
        return _this;
    }
    return BaseUISletatApiService;
}(BaseApiService_1.BaseApiService));
exports.BaseUISletatApiService = BaseUISletatApiService;
