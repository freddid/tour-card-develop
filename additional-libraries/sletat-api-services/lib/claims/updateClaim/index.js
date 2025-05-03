"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClaim = void 0;
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var request_1 = require("./request");
var response_1 = require("./response");
function updateClaim(settings) {
    return function (params) {
        return fetch("https://".concat(settings.host, "/Main.svc/UpdateClaim"), {
            method: 'POST',
            body: JSON.stringify((0, request_1.wrapRequestData)(params))
        })
            .then(function (response) {
            if ((0, utils_1.isHttpError)(response.status)) {
                throw new types_1.HttpError(response.statusText, response.status);
            }
            return response.json();
        })
            .then(function (response) {
            if (response.UpdateClaimResult.IsError) {
                throw new types_1.HttpError(response.UpdateClaimResult.ErrorMessage);
            }
            return (0, response_1.wrapResponseData)(response.UpdateClaimResult.Data);
        });
    };
}
exports.updateClaim = updateClaim;
