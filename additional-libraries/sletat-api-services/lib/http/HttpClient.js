"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = exports.HttpResponse = exports.HttpRequest = exports.HttpMethods = exports.Protocols = void 0;
var tslib_1 = require("tslib");
var merge_1 = tslib_1.__importDefault(require("lodash/merge"));
/**
 * Класс используется в BaseXhrApiServices.
 * Там же можно прочитать и более подробную информацию
 */
var Protocols;
(function (Protocols) {
    Protocols[Protocols["HTTP"] = 0] = "HTTP";
    Protocols[Protocols["HTTPS"] = 1] = "HTTPS";
})(Protocols = exports.Protocols || (exports.Protocols = {}));
var HttpMethods;
(function (HttpMethods) {
    HttpMethods[HttpMethods["GET"] = 0] = "GET";
    HttpMethods[HttpMethods["POST"] = 1] = "POST";
})(HttpMethods = exports.HttpMethods || (exports.HttpMethods = {}));
var HttpRequest = /** @class */ (function () {
    function HttpRequest(url, method, requestBody) {
        this._url = url;
        this._method = method || HttpMethods.GET;
        this._headers = this.getDefaultHeaders(this._method);
        this._requestBody = this.isPOST ? requestBody : null;
    }
    Object.defineProperty(HttpRequest.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpRequest.prototype, "method", {
        get: function () {
            return this._method;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpRequest.prototype, "isGET", {
        get: function () {
            return this.method === HttpMethods.GET;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpRequest.prototype, "isPOST", {
        get: function () {
            return this.method === HttpMethods.POST;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpRequest.prototype, "requestBody", {
        get: function () {
            return JSON.stringify(this._requestBody);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpRequest.prototype, "headers", {
        set: function (data) {
            this._headers = (0, merge_1.default)({}, data);
        },
        enumerable: false,
        configurable: true
    });
    HttpRequest.prototype.updateHeaders = function (data) {
        this._headers = (0, merge_1.default)({}, this._headers, data);
    };
    HttpRequest.prototype.getDefaultHeaders = function (httpMethod) {
        var headers = { Accept: '*/*' };
        if (this.isGET) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        return headers;
    };
    return HttpRequest;
}());
exports.HttpRequest = HttpRequest;
var HttpResponse = /** @class */ (function () {
    function HttpResponse(origResponse) {
        this.parseOrigResponse(origResponse);
    }
    Object.defineProperty(HttpResponse.prototype, "responseCode", {
        get: function () {
            return this._responseCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpResponse.prototype, "responseStatus", {
        get: function () {
            return this._responseStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpResponse.prototype, "isSuccess", {
        get: function () {
            return this.responseCode < 400;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpResponse.prototype, "responseUrl", {
        get: function () {
            return this._responseUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpResponse.prototype, "responseData", {
        get: function () {
            if (typeof this._responseData === 'string') {
                try {
                    return JSON.parse(this._responseData);
                }
                catch (err) {
                    return this._responseData;
                }
            }
            return this._responseData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpResponse.prototype, "responseDataText", {
        get: function () {
            return this._responseDataText;
        },
        enumerable: false,
        configurable: true
    });
    HttpResponse.prototype.parseOrigResponse = function (origResponse) {
        this._responseCode = origResponse.status;
        this._responseStatus = origResponse.statusText;
        this._responseUrl = origResponse.responseURL;
        this._responseData = origResponse.response;
        this._responseDataText = origResponse.responseText;
    };
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.send = function (request) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open(getMethodString(request.method), request.url, true);
        xhr.onload = function (progressEvent) {
            if (_this.responseCallback) {
                _this.responseCallback(new HttpResponse(progressEvent.currentTarget));
            }
        };
        xhr.onerror = function (err) {
            if (_this.errorCallback) {
                _this.errorCallback(err);
            }
        };
        xhr.send(request.requestBody);
    };
    HttpClient.prototype.onResponse = function (callback) {
        this.responseCallback = callback;
    };
    HttpClient.prototype.onError = function (callback) {
        this.errorCallback = callback;
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
function getMethodString(method) {
    switch (method) {
        case HttpMethods.GET:
            return 'GET';
        case HttpMethods.POST:
            return 'POST';
    }
}
