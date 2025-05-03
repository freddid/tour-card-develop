"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostNameFromURL = exports.BaseXhrApiService = void 0;
var tslib_1 = require("tslib");
var canUseDOM_1 = require("sletat-common-utils/lib/canUseDOM");
var HttpClient_1 = require("./http/HttpClient");
var HttpUtils_1 = require("./http/HttpUtils");
var Cache = tslib_1.__importStar(require("./Cache"));
/**
 * Предыстория: в новой КТ используется пачка сервисов, которые работают по JSONP.
 * JSONP - это legacy, который раньше нужен был для того, чтобы была кроссдоменка
 * для IE7, когда ещё не было CORS. Из-за этого был акктуален и http-lite, который использовал
 * JSONP или XHR в зависимости от ситуации. В 2017 году использовать JSONP - моветон.
 * Для того чтобы отказаться от использования http-lite и забыть про JSONP и был сделан данный класс
 *
 * Вместо http-lite этот класс использует ./http/HttpClient, который делает небольшую
 * обёртку над XHR. В идеале есть смысл сделать fetch подобный интерфейс,
 * а ещё лучше - взять полифильный fetch, тогда вообще не будет никаких пакетов-зависимостей.
 * Но это чуть позже...
 */
var BaseXhrApiService = /** @class */ (function () {
    function BaseXhrApiService() {
        this.useCache = false;
        this.useStorageCache = false;
        this.cacheTime = 1000 * 60 * 5;
        this.withCredentials = false;
        this.isSearchWithRobot = false;
    }
    BaseXhrApiService.prototype.call = function (params) {
        if (!canUseDOM_1.canUseDOM) {
            return Promise.reject('Error: you cannot call api-service from server side');
        }
        if (this.useCache &&
            params &&
            Cache.has(this.getCacheKey(params), this.cacheTime, this.shouldUseStorageCache())) {
            return Cache.get(this.getCacheKey(params), this.shouldUseStorageCache());
        }
        params = params || {};
        var requestParams = this.RequestWrapper ? this.RequestWrapper(params) : params;
        return this.sendRequest(requestParams);
    };
    BaseXhrApiService.prototype.getResultName = function () {
        return "".concat(this.methodName, "Result");
    };
    BaseXhrApiService.prototype.getUrl = function (params) {
        var urlParams = (0, HttpUtils_1.serializeUrlParams)(params);
        var crawlingPath = this.isSearchWithRobot ? 'slt/' : '';
        /**
         * Пример полной ссылки сервиса:
         * https://claims.sletat.ru/Main.svc/GetClaimInfo
         * protocol://serviceName/handlerName/methodName
         */
        return ("".concat((0, HttpUtils_1.getProtocol)(this.protocol), "//").concat(this.getServiceName(), "/").concat(crawlingPath).concat(this.handlerName, "/").concat(this.methodName) + "".concat(urlParams ? "?".concat(urlParams) : ''));
    };
    BaseXhrApiService.prototype.getServiceName = function () {
        return this.serviceName ? this.serviceName : window.location.hostname;
    };
    BaseXhrApiService.prototype.getCacheKey = function (params) {
        if (params === void 0) { params = {}; }
        return this.getUrl() + JSON.stringify(params);
    };
    BaseXhrApiService.prototype.shouldUseStorageCache = function () {
        return this.useCache && this.useStorageCache;
    };
    Object.defineProperty(BaseXhrApiService.prototype, "isGET", {
        get: function () {
            return this.httpMethod === HttpClient_1.HttpMethods.GET;
        },
        enumerable: false,
        configurable: true
    });
    BaseXhrApiService.prototype.sendRequest = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.getUrl(_this.isGET ? params : null);
            var httpRequest = new HttpClient_1.HttpRequest(url, _this.httpMethod, params);
            httpRequest.updateHeaders(_this.headers);
            var httpClient = new HttpClient_1.HttpClient();
            httpClient.onResponse(function (response) {
                _this.responseHandler(response)
                    .then(function (wrappedData) {
                    if (_this.useCache) {
                        Cache.add(_this.getCacheKey(params), wrappedData, _this.cacheTime, _this.shouldUseStorageCache());
                    }
                    resolve(wrappedData);
                })
                    .catch(function (err) { return reject(err); });
            });
            httpClient.onError(function (error) { return reject(error); });
            httpClient.send(httpRequest);
        });
    };
    BaseXhrApiService.prototype.responseHandler = function (response) {
        var _this = this;
        if (response.isSuccess) {
            var data = response.responseData;
            var resultName = this.getResultName();
            var isErrorResultFieldName = this.isErrorResultFieldName || 'IsError';
            var errorMessageResultFieldName = this.errorMessageResultFieldName || 'ErrorMessage';
            var dataResultFieldName = this.dataResultFieldName || 'Data';
            var result = resultName ? data[resultName] : data;
            var resultData_1 = result[dataResultFieldName];
            var isError_1 = !!result[isErrorResultFieldName];
            var errorMessage_1 = result[errorMessageResultFieldName];
            return new Promise(function (resolve, reject) {
                if (isError_1) {
                    reject(errorMessage_1);
                }
                else {
                    resolve(_this.ResponseWrapper ? _this.ResponseWrapper(resultData_1) : resultData_1);
                }
            });
        }
        return Promise.reject(response.responseStatus);
    };
    return BaseXhrApiService;
}());
exports.BaseXhrApiService = BaseXhrApiService;
function getHostNameFromURL(url) {
    var anchor = document.createElement('a');
    anchor.href = url;
    return anchor.hostname;
}
exports.getHostNameFromURL = getHostNameFromURL;
