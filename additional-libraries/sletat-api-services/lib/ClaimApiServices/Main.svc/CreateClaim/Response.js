"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClaimResponseWrapper = void 0;
function createClaimResponseWrapper(response) {
    return {
        operationStatus: response.OperationStatus,
        claimIdentity: response.ClaimIdentity,
        orderIdentity: response.OrderIdentity,
        serviceMessage: response.ServiceMessage || null
    };
}
exports.createClaimResponseWrapper = createClaimResponseWrapper;
