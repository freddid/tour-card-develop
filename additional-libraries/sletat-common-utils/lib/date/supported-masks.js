"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
/**
 * класс для создания нового парсера
 */
var DateUtilsParser = /** @class */ (function () {
    function DateUtilsParser(dateMask, regExp, parser, formatter) {
        this.dateMask = dateMask;
        this.regExp = regExp;
        this.parser = parser;
        this.formatter = formatter;
    }
    DateUtilsParser.prototype.isValid = function (dateString) {
        return this.regExp.test(dateString);
    };
    DateUtilsParser.prototype.parse = function (dateString) {
        if (!this.isValid(dateString)) {
            return null;
        }
        var matches = dateString.match(this.regExp);
        return this.parser(matches.slice(1));
    };
    DateUtilsParser.prototype.format = function (date) {
        return this.formatter(this.dateMask, date);
    };
    return DateUtilsParser;
}());
exports.DateUtilsParser = DateUtilsParser;
/**
 * массив содержит поддерживаемые маски-парсеры
 */
exports.SUPPORTED_MASKS = [
    new DateUtilsParser('DD.MM.YY', /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.([0-9]{2})$/, DDMMYYparser, DDMMYYformatter),
    new DateUtilsParser('DD.MM.YYYY', /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.([1-9]\d{3})$/, DDMMYYYYparser, DDMMYYYYformatter),
    new DateUtilsParser('DD/MM/YYYY', /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/([1-9]\d{3})$/, DDMMYYYYparser, DDMMYYYYformatter),
    new DateUtilsParser('DD-MM-YYYY', /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-([1-9]\d{3})$/, DDMMYYYYparser, DDMMYYYYformatter),
    new DateUtilsParser('YYYY-MM-DD', /^([1-9]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, YYYYMMDDparser, DDMMYYYYformatter),
    new DateUtilsParser('YYYY/MM/DD', /^([1-9]\d{3})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/, YYYYMMDDparser, DDMMYYYYformatter),
    new DateUtilsParser('YYYY-MM-DD', /^([1-9]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, YYYYMMDDparser, DDMMYYYYformatter)
];
function DDMMYYYYformatter(dateMask, date) {
    return dateMask
        .replace('DD', utils_1.formatLendingZero(date.getDate(), 2))
        .replace('MM', utils_1.formatLendingZero(date.getMonth() + 1, 2))
        .replace('YYYY', String(date.getFullYear()));
}
function DDMMYYformatter(dateMask, date) {
    return dateMask
        .replace('DD', utils_1.formatLendingZero(date.getDate(), 2))
        .replace('MM', utils_1.formatLendingZero(date.getMonth() + 1, 2))
        .replace('YY', String(date.getFullYear())).slice(-2);
}
function DDMMYYYYparser(matches) {
    return new Date(Number(matches[2]), Number(matches[1]) - 1, Number(matches[0]));
}
function DDMMYYparser(matches) {
    var date = new Date();
    var possibleYear = Number(String(date.getFullYear()).slice(0, 2) + matches[2]);
    var resultYear = possibleYear > (date.getFullYear() + 1)
        ? Number('19' + matches[2])
        : possibleYear;
    date.setFullYear(resultYear, Number(matches[1]) - 1, Number(matches[0]));
    return date;
}
function YYYYMMDDparser(matches) {
    return new Date(Number(matches[0]), Number(matches[1]) - 1, Number(matches[2]));
}
