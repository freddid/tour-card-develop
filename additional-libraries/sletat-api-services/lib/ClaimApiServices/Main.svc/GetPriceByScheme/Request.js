"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetPriceBySchemeRequestWrapper = void 0;
function createGetPriceBySchemeRequestWrapper(params) {
    var result = {
        Price: params.tourPrice,
        PricingSchemeId: params.priceModifierSchemeId
    };
    if (params.host) {
        result.Host = params.host;
    }
    if (params.sessionId) {
        result.SessionId = params.sessionId;
    }
    if (params.vkGroupId) {
        result.VkGroupId = params.vkGroupId;
    }
    if (params.target) {
        result.target = params.target;
    }
    return result;
}
exports.createGetPriceBySchemeRequestWrapper = createGetPriceBySchemeRequestWrapper;
