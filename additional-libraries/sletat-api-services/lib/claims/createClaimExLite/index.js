"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClaimExLite = void 0;
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var request_1 = require("./request");
var response_1 = require("./response");
// Сервис для новой формы оплаты в КТ десктопа. Работает с ограниченными передаваемыми данными.
function createClaimExLite(params, settings) {
    return fetch("https://".concat(settings.host, "/Main.svc/claim/CreateClaimExLite").concat(settings.target ? "?target=".concat(settings.target) : ''), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify((0, request_1.wrapCreateClaimExLiteRequest)(settings, params))
    })
        .then(function (response) {
        if ((0, utils_1.isHttpError)(response.status)) {
            throw new types_1.HttpError(response.statusText, response.status);
        }
        return response.json();
    })
        .then(function (response) {
        if (response.IsError) {
            throw new types_1.HttpError(response.ErrorMessage);
        }
        if (!response.Data) {
            throw new types_1.HttpError('Data is null');
        }
        return (0, response_1.wrapCreateClaimExLiteResponse)(response.Data);
    });
}
exports.createClaimExLite = createClaimExLite;
