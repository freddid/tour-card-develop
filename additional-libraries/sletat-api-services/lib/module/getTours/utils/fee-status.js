"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeeStatus = exports.FeeStatus = void 0;
/**
 * SLT-1127 Определяем какой статус доплат показывать у тура на главной выдаче
 */
var FeeStatus;
(function (FeeStatus) {
    FeeStatus[FeeStatus["feeInTourPrice"] = 0] = "feeInTourPrice";
    FeeStatus[FeeStatus["feeNotInTourPrice"] = 1] = "feeNotInTourPrice";
    FeeStatus[FeeStatus["extraFeeMaybe"] = 2] = "extraFeeMaybe";
})(FeeStatus = exports.FeeStatus || (exports.FeeStatus = {}));
function getFeeStatus(tour) {
    if (tour.fullPrice === tour.price) {
        return FeeStatus.feeInTourPrice;
    }
    if (tour.fullPrice > tour.price) {
        return FeeStatus.feeNotInTourPrice;
    }
    return FeeStatus.extraFeeMaybe;
}
exports.getFeeStatus = getFeeStatus;
