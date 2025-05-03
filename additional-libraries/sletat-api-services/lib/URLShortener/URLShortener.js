"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortURL = void 0;
var tslib_1 = require("tslib");
var http_lite_1 = require("http-lite");
var sletat_api_services_consts_1 = require("sletat-api-services-consts");
var BaseApiService_1 = require("../BaseApiService");
var URLShortener = /** @class */ (function (_super) {
    tslib_1.__extends(URLShortener, _super);
    function URLShortener(options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'get';
        _this.handlerName = '';
        _this.serviceName = sletat_api_services_consts_1.URL_SHORTENER_API_HOST_NAME;
        _this.httpMethod = http_lite_1.HTTPMethods.GET;
        _this.isJSONPAvailable = true;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    return URLShortener;
}(BaseApiService_1.BaseApiService));
function getShortURL(params, options) {
    return new URLShortener(options).call(params);
}
exports.getShortURL = getShortURL;
