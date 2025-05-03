"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountries = void 0;
var qs = require("qs");
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var getCountriesRequest_1 = require("./getCountriesRequest");
var utils_2 = require("./utils");
function getCountries(settings) {
    var buildUrl = function (params) {
        var crawlingPath = settings.isSearchWithRobot ? 'slt/' : '';
        return ("https://".concat(settings.host, "/").concat(crawlingPath, "Main.svc/GetCountries?").concat(qs.stringify((0, getCountriesRequest_1.wrapRequest)(params))) +
            "".concat(settings.target ? "&target=".concat(settings.target) : ''));
    };
    return function (params) {
        return fetch(buildUrl(params), {
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
            if (response.GetCountriesResult.IsError) {
                throw new types_1.HttpError(response.GetCountriesResult.ErrorMessage);
            }
            return (0, utils_2.wrapResponse)(response.GetCountriesResult.Data);
        });
    };
}
exports.getCountries = getCountries;
