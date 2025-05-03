"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSletatService = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var sletat_api_services_consts_1 = require("sletat-api-services-consts");
var BaseApiService_1 = require("../BaseApiService");
var BaseSletatService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseSletatService, _super);
    function BaseSletatService() {
        var _this = _super.call(this) || this;
        // костыль для серверного рендеринга
        // исключение для сервисов слетать
        _this.serviceName = sletat_api_services_consts_1.SLETAT_HOST_NAME || (typeof location === 'undefined' ? 'sletat.ru' : location.host);
        _this.httpMethod = HttpLite.HTTPMethods.GET;
        return _this;
    }
    return BaseSletatService;
}(BaseApiService_1.BaseApiService));
exports.BaseSletatService = BaseSletatService;
