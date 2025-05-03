"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartCities = void 0;
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
function getDepartCities(settings) {
    return function () {
        var url = "https://".concat(settings.host, "/Main.svc/GetDepartCities?target=").concat(settings.target);
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
            if (response.GetDepartCitiesResult.IsError) {
                throw new types_1.HttpError(response.GetDepartCitiesResult.ErrorMessage);
            }
            return (0, utils_2.wrapResponse)(response.GetDepartCitiesResult);
        });
    };
}
exports.getDepartCities = getDepartCities;
