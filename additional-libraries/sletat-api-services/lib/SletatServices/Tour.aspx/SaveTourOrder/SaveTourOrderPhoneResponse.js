"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaveTourOrderPhoneResponseData = void 0;
function getSaveTourOrderPhoneResponseData(data) {
    return {
        data: data.Data,
        errorMessage: data.ErrorMessage,
        executionTimeMs: data.ExecutionTimeMs,
        isError: data.IsError
    };
}
exports.getSaveTourOrderPhoneResponseData = getSaveTourOrderPhoneResponseData;
