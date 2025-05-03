"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRequestOrder = void 0;
var qs = require("qs");
var lodash_1 = require("lodash");
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var response_1 = require("./response");
function saveRequestOrder(settings) {
    return function (params) {
        var url = "https://".concat(settings.host, "/Main.svc/SaveRequestOrder?").concat(qs.stringify(params), "&debug=").concat((0, lodash_1.toInteger)(settings.debug), "&target=").concat(settings.target);
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
            if (response.SaveRequestOrderResult.IsError) {
                throw new types_1.HttpError(response.SaveRequestOrderResult.ErrorMessage);
            }
            return (0, response_1.wrapResponse)(response);
        });
    };
}
exports.saveRequestOrder = saveRequestOrder;
