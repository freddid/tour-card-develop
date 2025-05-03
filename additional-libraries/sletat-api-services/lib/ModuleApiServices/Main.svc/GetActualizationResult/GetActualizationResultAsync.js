"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActualizationResultAsync = void 0;
var QueueActualization_1 = require("../QueueActualization/QueueActualization");
var GetActualizationResult_1 = require("./GetActualizationResult");
var startTime = null;
function delay(callback) {
    var POLLING_TIMEOUT = 4000;
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(null);
        }, POLLING_TIMEOUT);
    }).then(callback);
}
function isTimeToStop(time) {
    var TIMEOUT_TIME = 60000;
    return new Date().getTime() - time > TIMEOUT_TIME;
}
function getActualizationResultAsync(params, actualizationParams, options) {
    return (0, QueueActualization_1.queueActualization)(params, options).then(function (response) {
        return getActualization({ code: response.code }, actualizationParams, options).then(function (actualizationResult) {
            return {
                queueCode: response.code,
                actualizationResult: actualizationResult
            };
        });
    });
}
exports.getActualizationResultAsync = getActualizationResultAsync;
function getActualization(params, actualizationParams, options) {
    startTime = new Date().getTime();
    return (0, GetActualizationResult_1.getActualizationResult)(params, actualizationParams, options).then(recursivePolling(params.code, actualizationParams, options));
}
function recursivePolling(code, actualizationParams, options) {
    return function (response) {
        if (response.isCompleted) {
            if (!response.isError) {
                return Promise.resolve(response);
            }
            return Promise.reject(response.errorMessage);
        }
        if (response.isError) {
            return Promise.reject(response.errorMessage);
        }
        if (isTimeToStop(startTime)) {
            return Promise.reject(new Error('Превышено время ожидания'));
        }
        return delay(function () {
            return (0, GetActualizationResult_1.getActualizationResult)({ code: code }, actualizationParams, options).then(recursivePolling(code, actualizationParams, options));
        });
    };
}
