"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCreateClaimExLiteResponse = void 0;
function wrapCreateClaimExLiteResponse(response) {
    return {
        operationStatus: response.OperationStatus,
        claimIdentity: response.ClaimIdentity,
        orderIdentity: response.OrderIdentity,
        claimInfo: {
            number: response.ClaimInfo.Number,
            redirectToPaymentURL: response.ClaimInfo.RedirectToPaymentURL,
            tour: response.ClaimInfo.Tour,
            status: response.ClaimInfo.Status,
            paymentIsAvailable: response.ClaimInfo.PaymentIsAvailable,
            payableUntil: response.ClaimInfo.PayableUntil,
            additionalPayment: response.ClaimInfo.AdditionalPayment,
            isAdditionalPayment: response.ClaimInfo.IsAdditionalPayment,
            actualization: response.ClaimInfo.Actualization
        },
        serviceMessage: response.ServiceMessage || null
    };
}
exports.wrapCreateClaimExLiteResponse = wrapCreateClaimExLiteResponse;
