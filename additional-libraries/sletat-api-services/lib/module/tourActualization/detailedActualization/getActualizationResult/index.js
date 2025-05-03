"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActualizationResult = void 0;
var utils_1 = require("../../../../utils");
var types_1 = require("../../../../types");
var response_1 = require("./response");
function getActualizationResult(settings) {
    return function (code) {
        return fetch("https://".concat(settings.host, "/Main.svc/GetActualizationResult?code=").concat(encodeURIComponent(code)), {
            method: 'GET'
        })
            .then(function (response) {
            if ((0, utils_1.isHttpError)(response.status)) {
                throw new types_1.HttpError(response.statusText, response.status);
            }
            return response.json();
        })
            .then(function (response) {
            if (response.GetActualizationResultResult.IsError) {
                throw new types_1.HttpError(response.GetActualizationResultResult.ErrorMessage);
            }
            return (0, response_1.wrapResponse)(response.GetActualizationResultResult.Data);
        });
    };
}
exports.getActualizationResult = getActualizationResult;
