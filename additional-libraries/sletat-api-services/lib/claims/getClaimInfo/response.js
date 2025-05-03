"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapResponseData = void 0;
function wrapResponseData(response) {
    return {
        number: response.Number,
        redirectToPaymentURL: response.RedirectToPaymentURL,
        tour: response.Tour,
        status: response.Status,
        paymentIsAvailable: response.PaymentIsAvailable,
        payableUntil: response.PayableUntil,
        additionalPayment: response.AdditionalPayment,
        isAdditionalPayment: response.IsAdditionalPayment,
        actualization: response.Actualization,
        operationStatus: response.OperationStatus,
        serviceMessage: response.ServiceMessage
    };
}
exports.wrapResponseData = wrapResponseData;
