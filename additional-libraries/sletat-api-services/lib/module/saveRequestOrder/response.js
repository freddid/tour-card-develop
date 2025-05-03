"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapResponse = void 0;
function wrapResponse(resp) {
    return {
        data: resp.SaveRequestOrderResult.Data,
        errorMessage: resp.SaveRequestOrderResult.ErrorMessage,
        errorCode: resp.SaveRequestOrderResult.ErrorCode,
        executionTimeMs: resp.SaveRequestOrderResult.ExecutionTimeMs,
        isError: resp.SaveRequestOrderResult.IsError
    };
}
exports.wrapResponse = wrapResponse;
