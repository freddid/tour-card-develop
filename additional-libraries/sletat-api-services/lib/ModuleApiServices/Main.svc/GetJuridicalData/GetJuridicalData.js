"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJuridicalData = void 0;
var sletat_api_services_consts_1 = require("sletat-api-services-consts");
var types_1 = require("../../../types");
var utils_1 = require("../../../utils");
var GetJuridicalDataResponse_1 = require("./GetJuridicalDataResponse");
function getJuridicalData(params) {
    var url = "https://".concat(sletat_api_services_consts_1.MODULE_HOST_NAME, "/Main.svc/GetJuridicalData");
    return fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
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
        var result = response.GetJuridicalDataResult;
        if (result.IsError || result.ErrorMessage) {
            throw new types_1.HttpError(result.ErrorMessage || "".concat(url, ": http error"));
        }
        return (0, GetJuridicalDataResponse_1.wrapResponseResult)(result);
    })
        .then(function (data) { return data.Data; });
}
exports.getJuridicalData = getJuridicalData;
