"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRequest = void 0;
function wrapRequest(params) {
    return {
        townFromId: params.townFromId,
        useAccount: params.useAccount ? 1 : 0
    };
}
exports.wrapRequest = wrapRequest;
