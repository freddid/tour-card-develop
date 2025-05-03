"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseXhrModuleApiService = void 0;
var tslib_1 = require("tslib");
var sletat_api_services_consts_1 = require("sletat-api-services-consts");
var HttpClient_1 = require("../http/HttpClient");
var BaseXhrApiService_1 = require("../BaseXhrApiService");
/**
 * @deprecated
 * лучше использовать src/module
 */
var BaseXhrModuleApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseXhrModuleApiService, _super);
    function BaseXhrModuleApiService() {
        var _this = _super.call(this) || this;
        _this.serviceName = sletat_api_services_consts_1.MODULE_HOST_NAME;
        _this.httpMethod = HttpClient_1.HttpMethods.GET;
        return _this;
    }
    BaseXhrModuleApiService.prototype.getResultName = function () {
        return "".concat(this.methodName, "Result");
    };
    return BaseXhrModuleApiService;
}(BaseXhrApiService_1.BaseXhrApiService));
exports.BaseXhrModuleApiService = BaseXhrModuleApiService;
