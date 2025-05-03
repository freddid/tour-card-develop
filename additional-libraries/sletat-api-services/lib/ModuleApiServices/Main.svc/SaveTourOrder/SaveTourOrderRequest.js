"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaveTourOrderRequestWrapper = exports.OrderOriginTypes = void 0;
var OrderOriginTypes;
(function (OrderOriginTypes) {
    OrderOriginTypes[OrderOriginTypes["officesWidget"] = 3] = "officesWidget";
})(OrderOriginTypes = exports.OrderOriginTypes || (exports.OrderOriginTypes = {}));
function getSaveTourOrderRequestWrapper(params) {
    var request = {
        requestId: params.requestId,
        sourceId: params.sourceId,
        offerId: params.offerId,
        officeId: params.officeId,
        user: params.userName,
        countryName: params.countryName,
        cityFromName: params.cityFromName,
        currencyAlias: params.currencyAlias,
        orderReferrer: params.referrer,
        email: String(params.email || ''),
        phone: String(params.phone || ''),
        info: String(params.comment || '')
    };
    if (params.target) {
        request.target = params.target;
    }
    if (params.originType !== undefined) {
        request.orderOriginType = params.originType;
    }
    if (params.flight !== undefined) {
        request.flight = params.flight;
    }
    return request;
}
exports.getSaveTourOrderRequestWrapper = getSaveTourOrderRequestWrapper;
