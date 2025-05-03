"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoadState = void 0;
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var getLoadStateResponse_1 = require("./getLoadStateResponse");
function getLoadState(settings) {
    return function (params) {
        var crawlingPath = settings.isSearchWithRobot ? 'slt/' : '';
        var url = "https://".concat(settings.host, "/").concat(crawlingPath, "Main.svc/GetLoadState?requestId=").concat(params.requestId).concat(params.target ? "&target=".concat(params.target) : '');
        return fetch(url, {
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
            if (response.GetLoadStateResult.IsError) {
                throw new types_1.HttpError(response.GetLoadStateResult.ErrorMessage);
            }
            return (0, getLoadStateResponse_1.wrapResponse)(response.GetLoadStateResult.Data);
        });
    };
}
exports.getLoadState = getLoadState;
