"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemoveTourFromBasketRequestData = void 0;
/**
 * Преобразует параметры, с которыми работаем на клиенте в серверный вид (превращает числа в строки, массивы в числа и тд)
 */
function getRemoveTourFromBasketRequestData(removeTourFromBasket) {
    return {
        thash: removeTourFromBasket.tourPriceHash,
        method: '29',
        type: 1
    };
}
exports.getRemoveTourFromBasketRequestData = getRemoveTourFromBasketRequestData;
