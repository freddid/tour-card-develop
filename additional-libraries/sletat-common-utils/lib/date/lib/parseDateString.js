"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/**
 * парсит строку по маске, возвращая объект типа Date
 *
 * @param  {string} dateString дата форматированная по маске
 * @param  {string} mask       маска (например, 'DD-MM-YYYY')
 * @return {Date}              пропарсенная дата
 */
function parseDateString(dateString, mask) {
    var parser = utils_1.getParser(mask);
    if (!parser) {
        return null;
    }
    try {
        return parser.parse(dateString);
    }
    catch (e) {
        console.error("parseDateString: couldn't parse date string '" + dateString + "'");
        return null;
    }
}
exports.parseDateString = parseDateString;
