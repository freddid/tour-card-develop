"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffices = void 0;
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var response_1 = require("./response");
function getOffices(settings) {
    return function () {
        var url = "https://".concat(settings.host, "/Main.svc/GetOffices").concat(settings.target ? "?target=".concat(settings.target) : '');
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
            if (response.GetOfficesResult.IsError) {
                throw new types_1.HttpError(response.GetOfficesResult.ErrorMessage);
            }
            return (0, response_1.transformResponse)(response.GetOfficesResult.Data);
        });
    };
}
exports.getOffices = getOffices;
