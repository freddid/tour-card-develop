"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRequestData = void 0;
function wrapRequestData(data) {
    return {
        ClaimIdentity: data.claimId,
        HasBeenViewedDate: data.hasBeenViewedDate
    };
}
exports.wrapRequestData = wrapRequestData;
