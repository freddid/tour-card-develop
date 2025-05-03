"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/**
 * форматирует дату по маске
 *
 * @param  {Date}   date объект даты
 * @param  {string} mask маска (например, 'DD-MM-YYYY')
 * @return {string | null} форматированная дата
 */
function formatDate(date, mask) {
    var parser = utils_1.getParser(mask);
    if (parser) {
        return parser.format(date);
    }
    return null;
}
exports.formatDate = formatDate;
