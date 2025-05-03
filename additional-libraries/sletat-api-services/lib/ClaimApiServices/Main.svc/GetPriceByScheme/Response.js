"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetPriceBySchemeResponseWrapper = void 0;
function createGetPriceBySchemeResponseWrapper(response) {
    return {
        operationStatus: response.OperationStatus,
        serviceMessage: response.ServiceMessage,
        price: response.Price
    };
}
exports.createGetPriceBySchemeResponseWrapper = createGetPriceBySchemeResponseWrapper;
