"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCreateTourOfficeClaimResponse = void 0;
function wrapCreateTourOfficeClaimResponse(response) {
    return {
        operationStatus: response.OperationStatus,
        serviceMessage: response.ServiceMessage || null,
        claimNumber: response.ClaimNumber,
        paymentUrl: response.PaymentUrl,
    };
}
exports.wrapCreateTourOfficeClaimResponse = wrapCreateTourOfficeClaimResponse;
