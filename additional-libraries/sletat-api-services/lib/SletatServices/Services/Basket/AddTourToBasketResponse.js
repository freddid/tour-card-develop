"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddTourToBasketResponseData = void 0;
function getAddTourToBasketResponseData(data) {
    return {
        id: data.id,
        type: data.type,
        value: data.value,
        source: Number(data.parameters[0].Value),
        offer: Number(data.parameters[1].Value),
        request: Number(data.parameters[2].Value),
        key: Number(data.parameters[3].Value)
    };
}
exports.getAddTourToBasketResponseData = getAddTourToBasketResponseData;
