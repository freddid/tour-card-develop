"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapResponseData = void 0;
function wrapResponseData(response) {
    return {
        operationStatus: response.OperationStatus,
        serviceMessage: response.ServiceMessage
    };
}
exports.wrapResponseData = wrapResponseData;
