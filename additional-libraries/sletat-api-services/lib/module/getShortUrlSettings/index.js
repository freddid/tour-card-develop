"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortUrlSettings = void 0;
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
function getShortUrlSettings(settings) {
    return function (params) {
        var url = "https://".concat(settings.host, "/Main.svc/GetShortUrlSettings?code=").concat(params.code);
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
            if ((0, utils_1.isHttpError)(response.status)) {
                throw new types_1.HttpError(response.statusText, response.status);
            }
            return response.json();
        })
            .then(function (response) {
            if (response.GetShortUrlSettingsResult.IsError) {
                throw new types_1.HttpError(response.GetShortUrlSettingsResult.ErrorMessage);
            }
            return (0, utils_2.wrapShortUrlSettings)(response.GetShortUrlSettingsResult.Data);
        });
    };
}
exports.getShortUrlSettings = getShortUrlSettings;
