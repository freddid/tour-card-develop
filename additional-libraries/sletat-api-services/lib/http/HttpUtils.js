"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeUrlParams = exports.getProtocol = void 0;
var isUndefined_1 = require("../utils/isUndefined");
var isNull_1 = require("../utils/isNull");
var ieVersionChecker_1 = require("sletat-common-utils/lib/environment/browser/ieVersionChecker");
var HttpClient_1 = require("./HttpClient");
var getProtocol = function (protocol) {
    if ((0, ieVersionChecker_1.isIEWithVersionLessThan)(10) || protocol === undefined || protocol === null) {
        return window.location.protocol;
    }
    return protocol === HttpClient_1.Protocols.HTTP ? 'http:' : 'https:';
};
exports.getProtocol = getProtocol;
var serializeUrlParams = function (params) {
    if (!!params && typeof params === 'object') {
        return Object.getOwnPropertyNames(params)
            .reduce(function (data, currentKey) {
            var val = params[currentKey];
            if (!(0, isUndefined_1.isUndefined)(val) && !(0, isNull_1.isNull)(val)) {
                data.push("".concat(encodeURIComponent(currentKey), "=").concat(encodeURIComponent(params[currentKey])));
            }
            return data;
        }, [])
            .join('&');
    }
    return null;
};
exports.serializeUrlParams = serializeUrlParams;
