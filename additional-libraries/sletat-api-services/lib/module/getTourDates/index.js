"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTourDates = void 0;
var qs = require("qs");
var types_1 = require("../../types");
var utils_1 = require("../../utils");
function getTourDates(settings) {
    return function (params) {
        var crawlingPath = settings.isSearchWithRobot ? 'slt/' : '';
        return fetch("https://".concat(settings.host, "/").concat(crawlingPath, "Main.svc/GetTourDates?").concat(qs.stringify(params)), {
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
            if (response.GetTourDatesResult.IsError) {
                throw new types_1.HttpError(response.GetTourDatesResult.ErrorMessage);
            }
            return response.GetTourDatesResult.Data;
        });
    };
}
exports.getTourDates = getTourDates;
