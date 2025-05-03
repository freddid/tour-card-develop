"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveRequestOrderRequestData = exports.getSaveRequestOrderResponseData = void 0;
function getSaveRequestOrderResponseData(data) {
    return {
        response: new SaveRequestOrderRequestData(data)
    };
}
exports.getSaveRequestOrderResponseData = getSaveRequestOrderResponseData;
var SaveRequestOrderRequestData = /** @class */ (function () {
    function SaveRequestOrderRequestData(data) {
        this.errorMessage = data.ErrorMessage;
        this.executionTimeMs = data.ExecutionTimeMs;
        this.isError = data.IsError;
        this.data = data.Data;
    }
    return SaveRequestOrderRequestData;
}());
exports.SaveRequestOrderRequestData = SaveRequestOrderRequestData;
