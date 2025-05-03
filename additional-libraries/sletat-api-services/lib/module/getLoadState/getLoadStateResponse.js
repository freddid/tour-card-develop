"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapLoadState = exports.wrapResponse = void 0;
function wrapResponse(loadStates) {
    return {
        operatorsList: loadStates.map(function (originalLoadState) {
            return wrapLoadState(originalLoadState);
        })
    };
}
exports.wrapResponse = wrapResponse;
function wrapLoadState(value) {
    return {
        id: value.Id,
        name: value.Name,
        errorMessage: value.ErrorMessage,
        executionTimeMs: value.ExecutionTimeMs,
        isCached: value.IsCached,
        isError: value.IsError,
        isPersistentCacheUsed: value.IsPersistentCacheUsed,
        isProcessed: value.IsProcessed,
        isSkipped: value.IsSkipped,
        isTimeout: value.IsTimeout,
        maxPrice: value.MaxPrice,
        minPrice: value.MinPrice,
        minFullPrice: value.MinFullPrice,
        onlineErrorMessage: value.OnlineErrorMessage,
        rowsCount: value.RowsCount
    };
}
exports.wrapLoadState = wrapLoadState;
