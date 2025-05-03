"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Возвращает строку с числом, разденным пробелами поразрядно
* Пример 15000 -> 15 000
*/
exports.numberFormat = function (number) {
    if (number !== null && number !== undefined) {
        var strNumber = number.toString();
        return strNumber.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
    return '';
};
