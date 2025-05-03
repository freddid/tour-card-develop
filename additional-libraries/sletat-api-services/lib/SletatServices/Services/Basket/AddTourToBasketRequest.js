"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddTourToBasketRequestData = void 0;
/**
 * Преобразует параметры, с которыми работаем на клиенте в серверный вид (превращает числа в строки, массивы в числа и тд)
 */
function getAddTourToBasketRequestData(addTourToBasketParams) {
    return {
        thash: addTourToBasketParams.tourPriceHash,
        request: addTourToBasketParams.requestId,
        offer: addTourToBasketParams.tourOfferId,
        source: addTourToBasketParams.tourSourceId,
        method: '23',
        type: 1
    };
}
exports.getAddTourToBasketRequestData = getAddTourToBasketRequestData;
