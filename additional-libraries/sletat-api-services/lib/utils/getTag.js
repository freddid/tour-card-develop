"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTag = void 0;
var toString = Object.prototype.toString;
function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return toString.call(value);
}
exports.getTag = getTag;
