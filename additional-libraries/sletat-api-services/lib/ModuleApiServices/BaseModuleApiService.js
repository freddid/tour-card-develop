"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModuleApiService = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var sletat_api_services_consts_1 = require("sletat-api-services-consts");
var BaseApiService_1 = require("../BaseApiService");
/**
 * @deprecated
 * лучше использовать BaseXhrModuleApiService.ts
 * подробности в src/BaseXhrApiService.ts
 */
var BaseModuleApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseModuleApiService, _super);
    function BaseModuleApiService() {
        var _this = _super.call(this) || this;
        _this.serviceName = sletat_api_services_consts_1.MODULE_HOST_NAME;
        _this.httpMethod = HttpLite.HTTPMethods.GET;
        _this.isJSONPAvailable = true;
        return _this;
    }
    BaseModuleApiService.prototype.getResultName = function () {
        return "".concat(this.methodName, "Result");
    };
    return BaseModuleApiService;
}(BaseApiService_1.BaseApiService));
exports.BaseModuleApiService = BaseModuleApiService;
