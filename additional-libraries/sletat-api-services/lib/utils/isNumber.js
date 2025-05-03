"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
var getTag_1 = require("./getTag");
var isObjectLike_1 = require("./isObjectLike");
function isNumber(value) {
    return (typeof value === 'number' || ((0, isObjectLike_1.isObjectLike)(value) && (0, getTag_1.getTag)(value) === '[object Number]'));
}
exports.isNumber = isNumber;
