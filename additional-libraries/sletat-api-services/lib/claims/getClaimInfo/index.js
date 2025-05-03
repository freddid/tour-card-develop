"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClaimInfo = void 0;
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var response_1 = require("./response");
function getClaimInfo(settings) {
    return function (params) {
        return fetch("https://".concat(settings.host, "/Main.svc/GetClaimInfoJson?claimid=").concat(params.claimId), {
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
            if (response.GetClaimInfoResult.IsError) {
                throw new types_1.HttpError(response.GetClaimInfoResult.ErrorMessage);
            }
            if (!response.GetClaimInfoResult.Data) {
                throw new types_1.HttpError('Data is null');
            }
            return (0, response_1.wrapResponseData)(response.GetClaimInfoResult.Data);
        });
    };
}
exports.getClaimInfo = getClaimInfo;
