"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/**
 * проверяет, соответствует ли переданная дата в строке необходимой маске
 *
 * @param  {string}  dateString дата форматированная по маске
 * @param  {string}  mask       маска (например, 'DD-MM-YYYY')
 * @return {boolean}            true или false
 */
function checkValid(dateString, mask) {
    var parser = utils_1.getParser(mask);
    return !!parser && parser.isValid(dateString);
}
exports.checkValid = checkValid;
