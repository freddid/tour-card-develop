"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleConfig = void 0;
var utils_1 = require("../../utils");
var types_1 = require("../../types");
/**
 * Возвращает конфигурацию для модуля
 */
function getModuleConfig(params, opts) {
    return fetch("https://".concat(opts.host, "/api/configurations/").concat(params.configId, "/"), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if ((0, utils_1.isHttpError)(response.status)) {
            throw new types_1.HttpError(response.statusText, response.status);
        }
        return response.json();
    });
}
exports.getModuleConfig = getModuleConfig;
