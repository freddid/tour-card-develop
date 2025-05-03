"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClaimExResponseWrapper = void 0;
function createClaimExResponseWrapper(response) {
    return {
        operationStatus: response.OperationStatus,
        claimIdentity: response.ClaimIdentity,
        orderIdentity: response.OrderIdentity,
        claimInfo: response.ClaimInfo,
        serviceMessage: response.ServiceMessage || null
    };
}
exports.createClaimExResponseWrapper = createClaimExResponseWrapper;
