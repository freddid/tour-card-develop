"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCities = void 0;
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
function getCities(settings) {
    return function (params) {
        var crawlingPath = settings.isSearchWithRobot ? 'slt/' : '';
        var url = "https://".concat(settings.host, "/").concat(crawlingPath, "Main.svc/GetCities?countryId=").concat(params.countryId) +
            "".concat(settings.target ? "&target=".concat(settings.target) : '');
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
            if (response.GetCitiesResult.IsError) {
                throw new types_1.HttpError(response.GetCitiesResult.ErrorMessage);
            }
            return (0, utils_2.wrapResponse)(response.GetCitiesResult);
        });
    };
}
exports.getCities = getCities;
