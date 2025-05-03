"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTourOfficeClaimLetsFly = void 0;
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var request_1 = require("../createClaimExLite/request");
var response_1 = require("../createTourOfficeClaim/response");
function createTourOfficeClaimLetsFly(params, host) {
    return fetch("https://".concat(host, "/api-letsfly-claims/create-claim "), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify((0, request_1.wrapCreateClaimExLiteRequest)({ host: host }, params))
    })
        .then(function (response) {
        if ((0, utils_1.isHttpError)(response.status)) {
            throw new types_1.HttpError(response.statusText, response.status);
        }
        return response.json();
    })
        .then(function (response) {
        if (response.IsError) {
            throw new types_1.HttpError(response.ErrorMessage);
        }
        if (!response.Data) {
            throw new types_1.HttpError('Data is null');
        }
        return (0, response_1.wrapCreateTourOfficeClaimResponse)(response.Data);
    });
}
exports.createTourOfficeClaimLetsFly = createTourOfficeClaimLetsFly;
