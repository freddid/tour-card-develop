"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTours = void 0;
var qs = require("qs");
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var getToursRequest_1 = require("./getToursRequest");
var getToursResponse_1 = require("./getToursResponse");
function getTours(settings) {
    return function (params) {
        var preparedParams = (0, getToursRequest_1.transformRequestParams)(params);
        var crawlingPath = settings.isSearchWithRobot ? 'slt/' : '';
        return fetch("https://".concat(settings.host, "/").concat(crawlingPath, "Main.svc/GetTours?").concat(qs.stringify(preparedParams)), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'google-token': !!settings.headers && !!settings.headers.reCaptchaToken ? settings.headers.reCaptchaToken : ''
            }
        })
            .then(function (response) {
            if ((0, utils_1.isHttpError)(response.status)) {
                throw new types_1.HttpError(response.statusText, response.status);
            }
            return response.json();
        })
            .then(function (response) {
            if (response.GetToursResult.IsError) {
                throw new types_1.HttpError(response.GetToursResult.ErrorMessage, null, response.GetToursResult.ErrorCode);
            }
            return (0, getToursResponse_1.wrapResponse)(response.GetToursResult.Data);
        });
    };
}
exports.getTours = getTours;
