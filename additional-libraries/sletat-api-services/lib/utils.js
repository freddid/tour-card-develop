"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotFound = exports.isRedirect = exports.isHttpError = exports.guid = exports.cookies = void 0;
var cookies_1 = require("sletat-common-utils/lib/cookies");
Object.defineProperty(exports, "cookies", { enumerable: true, get: function () { return cookies_1.cookies; } });
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return "".concat(s4() + s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4()).concat(s4()).concat(s4());
}
exports.guid = guid;
function isHttpError(statusCode) {
    var firstDigital = parseInt(String(statusCode / 100), 10);
    return firstDigital === 4 || firstDigital === 5;
}
exports.isHttpError = isHttpError;
function isRedirect(statusCode) {
    var firstDigital = parseInt(String(statusCode / 100), 10);
    return firstDigital === 3;
}
exports.isRedirect = isRedirect;
function isNotFound(response) {
    return response.status === 404;
}
exports.isNotFound = isNotFound;
