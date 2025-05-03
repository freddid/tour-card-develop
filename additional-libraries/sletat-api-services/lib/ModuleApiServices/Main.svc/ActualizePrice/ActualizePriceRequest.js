"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizePriceRequestWrapper = void 0;
function ActualizePriceRequestWrapper(params) {
    var result = {
        requestId: params.requestId,
        sourceId: params.sourceId,
        offerId: params.offerId,
        countryId: params.countryId,
        townFromId: params.townFromId,
        price: params.price,
        nights: params.nights,
        adults: params.adults,
        kids: params.kids,
        hotelId: params.hotelId,
        townId: params.townId,
        currencyAlias: params.currencyAlias
    };
    if (params.isTicketsIncluded !== undefined) {
        result.isTicketsIncluded = params.isTicketsIncluded ? '1' : '0';
    }
    if (params.vk_group_id !== undefined) {
        result.vk_group_id = params.vk_group_id;
    }
    if (params.showcase !== undefined) {
        result.showcase = params.showcase ? '1' : '0';
    }
    if (params.userId !== undefined) {
        result.userId = params.userId;
    }
    if (params.isSiteRequest !== undefined) {
        result.isSiteRequest = params.isSiteRequest ? '1' : '0';
    }
    if (params.target !== undefined) {
        result.target = params.target;
    }
    return result;
}
exports.ActualizePriceRequestWrapper = ActualizePriceRequestWrapper;
