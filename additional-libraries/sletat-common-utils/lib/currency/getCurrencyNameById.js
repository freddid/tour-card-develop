"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var currencyConst_1 = require("./currencyConst");
function getCurrencyNameById(currencyId) {
    switch (currencyId) {
        case currencyConst_1.CurrencyId.USD:
            return 'USD';
        case currencyConst_1.CurrencyId.EUR:
            return 'EUR';
        case currencyConst_1.CurrencyId.RUB:
            return 'RUB';
        case currencyConst_1.CurrencyId.BYR:
            return 'BYR';
        case currencyConst_1.CurrencyId.KZT:
            return 'KZT';
        case currencyConst_1.CurrencyId.UAH:
            return 'UAH';
        case currencyConst_1.CurrencyId.BYN:
            return 'BYN';
        case currencyConst_1.CurrencyId.CAD:
            return 'CAD';
        default:
            return '';
    }
}
exports.getCurrencyNameById = getCurrencyNameById;
