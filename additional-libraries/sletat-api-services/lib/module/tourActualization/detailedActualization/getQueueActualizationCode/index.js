"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueueActualizationCode = void 0;
var qs = require("qs");
var utils_1 = require("../../../../utils");
var types_1 = require("../../../../types");
var response_1 = require("./response");
function getQueueActualizationCode(settings) {
    return function (params) {
        return fetch("https://".concat(settings.host, "/Main.svc/QueueActualization?").concat(qs.stringify(params)), {
            method: 'GET'
        })
            .then(function (response) {
            if ((0, utils_1.isHttpError)(response.status)) {
                throw new types_1.HttpError(response.statusText, response.status);
            }
            return response.json();
        })
            .then(function (response) {
            if (response.QueueActualizationResult.IsError) {
                throw new types_1.HttpError(response.QueueActualizationResult.ErrorMessage);
            }
            return (0, response_1.wrapResponse)(response.QueueActualizationResult.Data);
        });
    };
}
exports.getQueueActualizationCode = getQueueActualizationCode;
