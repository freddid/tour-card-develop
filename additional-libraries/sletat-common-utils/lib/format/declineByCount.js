"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Возвращает нужное слово в зависимости от количества
 * Пример 1 билет, 4 билета, 10 билетов
 * declineByCount(['билет', 'билета', 'билетов'], 4) => билета
 */
function declineByCount(variants, number) {
    if ((number % 10 === 1) && (number % 100 !== 11)) {
        return variants[0];
    }
    else if ((number % 10 >= 2) && (number % 10 <= 4) && (number % 100 < 10 || number % 100 >= 20)) {
        return variants[1];
    }
    else {
        return variants[2];
    }
}
exports.declineByCount = declineByCount;
