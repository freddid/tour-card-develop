Object.defineProperty(exports, "__esModule", { value: true });
/**
 * касаемо второго параметра:
 * эта функция очень много где используется - от КТ модулей до сайта.
 * многие компоненты получали символ рубля через эту функцию без перечёркивания
 * и после уже через стили доделывали перечёркивание.
 *
 * однако бывают случаи, где нужно получить сразу юникодный символ с перечёркиванием,
 * например, текстовые поля.
 *
 * чтобы не делать мажорных изменений, добавил этот параметр (SLT-1225) как опциональный
 */
function getCurrencySymbol(currency, rubWithUnderscore) {
    if (rubWithUnderscore === void 0) { rubWithUnderscore = false; }
    var currencyAlias = currency;
    if (currencyAlias === 'RUB') {
        return rubWithUnderscore ? '₽' : 'Р';
    }
    else if (currencyAlias === 'USD') {
        return '$';
    }
    else if (currencyAlias === 'EUR') {
        return '€';
    }
    else if (currencyAlias === 'KZT') {
        return '₸';
    }
    else if ((currencyAlias === 'BYN') || (currencyAlias === 'BYR')) {
        return 'BYN';
    }
    else if (currencyAlias === 'UAH') {
        return '₴';
    }
    else {
        return rubWithUnderscore ? '₽' : 'Р';
    }
}
exports.getCurrencySymbol = getCurrencySymbol;
function getPriceBeforeDiscount(price, fakeDiscount) {
    return Math.round(price / (1 - Math.max(0, Math.min(0.99, fakeDiscount))));
}
exports.getPriceBeforeDiscount = getPriceBeforeDiscount;
function formatDiscount(discount) {
    return Math.floor(Math.round(discount * 100));
}
exports.formatDiscount = formatDiscount;
