"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getBooleanFromString(data, pattern) {
    return aString(data) === pattern;
}
exports.getBooleanFromString = getBooleanFromString;
function getIntegerFromString(data) {
    var value = parseInt(aString(data), 10);
    return isNaN(value) ? null : value;
}
exports.getIntegerFromString = getIntegerFromString;
function getFloatFromString(data, precise) {
    var float = parseFloat(aString(data));
    float = isNaN(float) ? null : float;
    if (precise && float !== null) {
        float = parseFloat(float.toFixed(precise));
    }
    return float;
}
exports.getFloatFromString = getFloatFromString;
function aString(data) {
    return String(data || '');
}
