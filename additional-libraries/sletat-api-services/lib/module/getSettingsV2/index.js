"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettingsV2 = void 0;
var qs = require("qs");
var types_1 = require("../../types");
var utils_1 = require("../../utils");
function getSettingsV2(settings) {
    return function (params) {
        var url = "https://".concat(settings.host, "/Main.svc/GetSettingsV2?").concat(qs.stringify(params), "&target=").concat(settings.target);
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
            if (response.GetSettingsV2Result.IsError) {
                throw new types_1.HttpError(response.GetSettingsV2Result.ErrorMessage);
            }
            return response.GetSettingsV2Result.Data;
        });
    };
}
exports.getSettingsV2 = getSettingsV2;
