"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotels = void 0;
var qs = require("qs");
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var request_1 = require("./request");
var response_1 = require("./response");
function getHotels(settings) {
    return function (params) {
        var crawlingPath = settings.isSearchWithRobot ? 'slt/' : '';
        var url = "https://".concat(settings.host, "/").concat(crawlingPath, "Main.svc/GetHotels?").concat(qs.stringify((0, request_1.wrapRequestParams)(params))) +
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
            if (response.GetHotelsResult.IsError) {
                throw new types_1.HttpError(response.GetHotelsResult.ErrorMessage);
            }
            return (response.GetHotelsResult.Data || []).map(response_1.wrapHotel);
        });
    };
}
exports.getHotels = getHotels;
