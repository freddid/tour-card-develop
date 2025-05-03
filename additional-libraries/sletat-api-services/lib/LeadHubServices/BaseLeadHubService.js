"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLeadHubService = void 0;
var tslib_1 = require("tslib");
var sletat_api_services_consts_1 = require("sletat-api-services-consts");
var BaseApiService_1 = require("../BaseApiService");
/**
 * @deprecated
 * используем функции из leadhub
 */
var BaseLeadHubService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseLeadHubService, _super);
    function BaseLeadHubService() {
        var _this = _super.call(this) || this;
        _this.serviceName = sletat_api_services_consts_1.LEADHUB_HOST_NAME;
        _this.protocol = sletat_api_services_consts_1.LEADHUB_PROTOCOL && sletat_api_services_consts_1.LEADHUB_PROTOCOL === 'http' ? BaseApiService_1.Protocols.HTTP : BaseApiService_1.Protocols.HTTPS;
        _this.withCredentials = true;
        _this.headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': '*/*'
        };
        return _this;
    }
    BaseLeadHubService.prototype.successHandler = function (response) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (response.isError) {
                var errorMessage = response.errorMessage;
                if (Object.prototype.toString.call(response.errorMessages) === '[object Array]') {
                    errorMessage = response.errorMessages[0];
                }
                reject(errorMessage);
            }
            else {
                resolve(_this.ResponseWrapper ? _this.ResponseWrapper(response.data) : response.data);
            }
        });
    };
    return BaseLeadHubService;
}(BaseApiService_1.BaseApiService));
exports.BaseLeadHubService = BaseLeadHubService;
