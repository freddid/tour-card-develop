"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var format_1 = __importDefault(require("date-fns/format"));
var ruLocale = __importStar(require("date-fns/locale/ru"));
var lodash_1 = require("lodash");
var supported_masks_1 = require("./supported-masks");
var declineByCount_1 = require("../format/declineByCount");
var index_1 = require("./index");
/**
 * возвращает по переданной маске нужный парсер
 */
function getParser(mask) {
    for (var _i = 0, SUPPORTED_MASKS_1 = supported_masks_1.SUPPORTED_MASKS; _i < SUPPORTED_MASKS_1.length; _i++) {
        var parser = SUPPORTED_MASKS_1[_i];
        if (parser.dateMask === mask) {
            return parser;
        }
    }
    return null;
}
exports.getParser = getParser;
/**
 * добавляет числу number ведущие нули для соответствия кол-ву разрядов countDigits
 */
function formatLendingZero(number, countDigits) {
    var stringNumber = String(number);
    return (stringNumber.length === countDigits)
        ? stringNumber
        : new Array(countDigits - stringNumber.length + 1).join('0') + stringNumber;
}
exports.formatLendingZero = formatLendingZero;
/**
 * Сдвигает время по таймзоне
 */
function offsetByTimezoneForISO(date, offsetFromISO) {
    if (!date) {
        return null;
    }
    return new Date(date.getTime() - (date.getTimezoneOffset() - (60 * offsetFromISO)) * 60000);
}
exports.offsetByTimezoneForISO = offsetByTimezoneForISO;
function formatPeopleNumber(adults, kids) {
    var adultsString = adults > 0 ? adults + " " + declineByCount_1.declineByCount(['взрослый', 'взрослых', 'взрослых'], adults) : '';
    var kidsString = kids > 0 ? kids + " " + declineByCount_1.declineByCount(['ребенок', 'детей', 'детей'], kids) : '';
    return [adultsString, kidsString].filter(Boolean).join(', ');
}
exports.formatPeopleNumber = formatPeopleNumber;
function formatDate(date) {
    if (!date) {
        return null;
    }
    return format_1.default(date, 'DD.MM.YYYY');
}
exports.formatDate = formatDate;
function formatDateStringToIsoString(dateStr, timeStr) {
    var dateParsed = index_1.parseDateString(dateStr || '', 'DD.MM.YYYY');
    if (!dateParsed) {
        return null;
    }
    var _a = (timeStr || '')
        .split(':')
        .map(function (item) { return parseInt(item, 10); })
        .filter(function (item) { return lodash_1.isInteger(item); }), hours = _a[0], minutes = _a[1];
    if (hours) {
        dateParsed.setHours(hours);
    }
    if (minutes) {
        dateParsed.setMinutes(minutes);
    }
    var dateParsedWithLocalTime = new Date(dateParsed.getTime() - dateParsed.getTimezoneOffset() * 60000);
    return dateParsedWithLocalTime.toISOString();
}
exports.formatDateStringToIsoString = formatDateStringToIsoString;
function getVerbalFlightDate(date) {
    if (!date || !index_1.checkValid(date, 'DD.MM.YYYY')) {
        return null;
    }
    return format_1.default(index_1.parseDateString(date, 'DD.MM.YYYY'), 'D MMM, dd', { locale: ruLocale });
}
exports.getVerbalFlightDate = getVerbalFlightDate;
function formatVerbalDate(date) {
    return format_1.default(date, 'D MMM', { locale: ruLocale });
}
exports.formatVerbalDate = formatVerbalDate;
function formatVerbalDateFullMonth(date) {
    return format_1.default(date, 'D MMMM', { locale: ruLocale });
}
exports.formatVerbalDateFullMonth = formatVerbalDateFullMonth;
function formatDateSlashed(date) {
    if (!date) {
        return null;
    }
    return format_1.default(date, 'DD/MM/YYYY');
}
exports.formatDateSlashed = formatDateSlashed;
function getVerbalFlightDateWithFullMonthName(date) {
    if (!date || !index_1.checkValid(date, 'DD.MM.YYYY')) {
        return null;
    }
    return format_1.default(index_1.parseDateString(date, 'DD.MM.YYYY'), 'D MMMM', { locale: ruLocale });
}
exports.getVerbalFlightDateWithFullMonthName = getVerbalFlightDateWithFullMonthName;
