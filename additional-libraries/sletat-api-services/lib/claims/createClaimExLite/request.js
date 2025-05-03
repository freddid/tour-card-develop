"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffiliateProgram = exports.wrapCreateClaimExLiteRequest = void 0;
var isUndefined_1 = require("../../utils/isUndefined");
var customer_1 = require("./models/customer");
var tourist_1 = require("./models/tourist");
var flight_util_1 = require("./utils/flight-util");
var TourServices_1 = require("../../ModuleApiServices/Main.svc/ActualizePrice/TourServices");
function wrapCreateClaimExLiteRequest(settings, params) {
    var result = {
        SourceId: params.sourceId,
        OfferId: params.offerId,
        RequestId: params.requestId,
        AffiliateProgram: params.affiliateProgram,
        Tourists: params.tourists.map(function (tourist) { return (0, tourist_1.wrapTourist)(tourist); }),
        Customer: (0, customer_1.wrapCustomer)(params.customer),
        Comments: params.comment ? params.comment : '',
        CustomInfo: params.customInfo ? params.customInfo : '',
        InitialURL: params.initialURL,
        Host: params.host,
        AviaFlightsPackageId: params.aviaFlightsPackageId,
        AviaFlightsSurcharge: params.aviaFlightsSurcharge,
        AviaFlightsSurchargeCurrencyId: params.aviaFlightsSurchargeCurrencyId,
        AviaFlights: (0, flight_util_1.wrapFlights)(params.aviaFlights),
        PriceTouristSaw: params.priceTouristSaw,
        IncludedServices: (0, TourServices_1.wrapServices)(params.includedServices),
    };
    if (!(0, isUndefined_1.isUndefined)(settings.target)) {
        result.target = settings.target;
    }
    if (!(0, isUndefined_1.isUndefined)(params.googleAnalyticsClientId)) {
        result.GoogleAnalyticsClientId = params.googleAnalyticsClientId;
    }
    if (!(0, isUndefined_1.isUndefined)(params.pricingSchemeId)) {
        result.PricingSchemeId = params.pricingSchemeId;
    }
    if (!(0, isUndefined_1.isUndefined)(params.prePayment)) {
        result.PrePayment = params.prePayment;
    }
    if (!(0, isUndefined_1.isUndefined)(params.toPayBefore)) {
        result.ToPayBefore = params.toPayBefore;
    }
    if (!(0, isUndefined_1.isUndefined)(params.checkCacheForPrice)) {
        result.CheckCacheForPrice = params.checkCacheForPrice;
    }
    if (!(0, isUndefined_1.isUndefined)(params.sessionId)) {
        result.SessionId = params.sessionId;
    }
    if (!(0, isUndefined_1.isUndefined)(params.vkGroupId)) {
        result.VkGroupId = params.vkGroupId;
    }
    if (!(0, isUndefined_1.isUndefined)(params.checkCacheForPrice)) {
        result.CheckCacheForPrice = params.checkCacheForPrice;
    }
    if (!(0, isUndefined_1.isUndefined)(params.forcedActualizationCurrencyId)) {
        result.ForcedActualizationCurrencyId = params.forcedActualizationCurrencyId;
    }
    if (!(0, isUndefined_1.isUndefined)(params.discountAmount)) {
        result.DiscountAmount = params.discountAmount;
    }
    return result;
}
exports.wrapCreateClaimExLiteRequest = wrapCreateClaimExLiteRequest;
var AffiliateProgram;
(function (AffiliateProgram) {
    AffiliateProgram[AffiliateProgram["none"] = 0] = "none";
    AffiliateProgram[AffiliateProgram["sletat"] = 1] = "sletat";
})(AffiliateProgram = exports.AffiliateProgram || (exports.AffiliateProgram = {}));
