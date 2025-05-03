"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostNameFromURL = exports.getHttpConfigWithParams = exports.getProtocol = exports.Protocols = exports.BaseApiService = void 0;
var tslib_1 = require("tslib");
var http_lite_1 = require("http-lite");
var ieVersionChecker_1 = require("sletat-common-utils/lib/environment/browser/ieVersionChecker");
var canUseDOM_1 = require("sletat-common-utils/lib/canUseDOM");
var Cache = tslib_1.__importStar(require("./Cache"));
/**
 * deprecated
 * лучше использовать BaseXhrApiService.ts
 * подробности в src/BaseXhrApiService.ts
 */
var BaseApiService = /** @class */ (function () {
    function BaseApiService() {
        this.useCache = false;
        this.useStorageCache = false;
        this.cacheTime = 1000 * 60 * 5;
        this.withCredentials = false;
        this.isJSONPAvailable = false;
        this.isSearchWithRobot = false;
    }
    BaseApiService.prototype.setResponseWrapper = function (func) {
        this.ResponseWrapper = func;
    };
    BaseApiService.prototype.call = function (params) {
        if (canUseDOM_1.canUseDOM) {
            if (this.useCache &&
                params &&
                Cache.has(this.getCacheKey(params), this.cacheTime, this.shouldUseStorageCache())) {
                return Cache.get(this.getCacheKey(params), this.shouldUseStorageCache());
            }
            params = params !== undefined ? params : {};
            var requestParams = this.RequestWrapper ? this.RequestWrapper(params) : params;
            this.updateHTTPMethod(requestParams);
            return this.getFromHttpRequest(requestParams);
        }
        return Promise.reject('Error: you cannot call api-service from server side');
    };
    BaseApiService.prototype.getResultName = function () {
        return "".concat(this.methodName, "Result");
    };
    BaseApiService.prototype.getUrl = function (params) {
        var crawlingPath = this.isSearchWithRobot ? 'slt/' : '';
        /**
         * Пример полной ссылки сервиса:
         * https://claims.sletat.ru/Main.svc/GetClaimInfo
         * protocol://serviceName/handlerName/methodName
         */
        return "".concat(getProtocol(this.protocol), "//").concat(this.getServiceName(), "/").concat(crawlingPath).concat(this.handlerName, "/").concat(this.methodName);
    };
    BaseApiService.prototype.getServiceName = function () {
        return this.serviceName ? this.serviceName : window.location.hostname;
    };
    BaseApiService.prototype.successHandler = function (response) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = response;
            // SLT-397: в try/catch ловим багу, в случае, когда в респонсе прилетает пустой объект.
            try {
                var resultName = _this.getResultName();
                var isErrorResultFieldName = _this.isErrorResultFieldName || 'IsError';
                var errorMessageResultFieldName = _this.errorMessageResultFieldName || 'ErrorMessage';
                var dataResultFieldName = _this.dataResultFieldName || 'Data';
                var result = resultName ? data[resultName] : data;
                var resultData = result[dataResultFieldName];
                var isError = !!result[isErrorResultFieldName];
                var errorMessage = result[errorMessageResultFieldName];
                if (isError) {
                    reject(errorMessage);
                }
                else {
                    resolve(_this.ResponseWrapper ? _this.ResponseWrapper(resultData) : resultData);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    };
    BaseApiService.prototype.getCacheKey = function (params) {
        if (params === void 0) { params = {}; }
        return this.getUrl() + JSON.stringify(params);
    };
    BaseApiService.prototype.shouldUseStorageCache = function () {
        return this.useCache && this.useStorageCache;
    };
    BaseApiService.prototype.getFromHttpRequest = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (0, http_lite_1.request)(_this.httpMethod, _this.getUrl(params), getHttpConfigWithParams(_this.httpMethod, params, _this.headers, _this.withCredentials))
                .success(function (data) {
                _this.successHandler(data).then(function (wrappedData) {
                    if (_this.useCache) {
                        Cache.add(_this.getCacheKey(params), wrappedData, _this.cacheTime, _this.shouldUseStorageCache());
                    }
                    resolve(wrappedData);
                }, function (error) {
                    reject(error);
                });
            })
                .error(function (error) {
                if (window.console && window.console.error) {
                    console.error(error);
                }
            });
        });
    };
    /**
     * В случае если hostname отличается от текущего на страницы мы выполняем jsonp-запрос вместо обычного get.
     *
     * Особенно актуально для приложений, которые будут устанавливаться на разыне сайты.
     * Например: модули поиска туров.
     */
    BaseApiService.prototype.updateHTTPMethod = function (params) {
        if (window.location.hostname !== getHostNameFromURL(this.getUrl(params)) && this.isJSONPAvailable) {
            if (this.httpMethod === http_lite_1.HTTPMethods.GET) {
                this.httpMethod = http_lite_1.HTTPMethods.JSONP;
            }
        }
    };
    return BaseApiService;
}());
exports.BaseApiService = BaseApiService;
var Protocols;
(function (Protocols) {
    Protocols[Protocols["HTTP"] = 0] = "HTTP";
    Protocols[Protocols["HTTPS"] = 1] = "HTTPS";
})(Protocols = exports.Protocols || (exports.Protocols = {}));
function getProtocol(protocol) {
    if ((0, ieVersionChecker_1.isIEWithVersionLessThan)(10) || protocol === undefined || protocol === null) {
        return window.location.protocol;
    }
    return protocol === Protocols.HTTP ? 'http:' : 'https:';
}
exports.getProtocol = getProtocol;
function getDefaultHeadersForHttpMethod(httpMethod) {
    if (httpMethod === http_lite_1.HTTPMethods.POST) {
        return {
            Accept: '*/*'
        };
    }
    return {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
    };
}
function getHttpConfigWithParams(httpMethod, params, headers, credentials) {
    var config = {};
    var defaultHeaders = getDefaultHeadersForHttpMethod(httpMethod);
    if (httpMethod === http_lite_1.HTTPMethods.POST || httpMethod === http_lite_1.HTTPMethods.PUT || httpMethod === http_lite_1.HTTPMethods.PATCH) {
        config.data = params;
    }
    else {
        config.query = params;
    }
    config.headers = tslib_1.__assign(tslib_1.__assign({}, defaultHeaders), headers);
    config.withCredentials = credentials;
    return config;
}
exports.getHttpConfigWithParams = getHttpConfigWithParams;
function getHostNameFromURL(url) {
    var anchor = document.createElement('a');
    anchor.href = url;
    return anchor.hostname;
}
exports.getHostNameFromURL = getHostNameFromURL;
