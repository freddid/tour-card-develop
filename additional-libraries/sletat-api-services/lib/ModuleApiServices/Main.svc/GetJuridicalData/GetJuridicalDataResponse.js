"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapResponseResult = void 0;
var tslib_1 = require("tslib");
// трансформирует оригинальный результат в преобразованный
function wrapResponseResult(responseResult) {
    var data = null;
    if (responseResult.Data) {
        data = tslib_1.__assign(tslib_1.__assign({}, responseResult.Data), { agreementHTML: responseResult.Data.html });
    }
    return tslib_1.__assign(tslib_1.__assign({}, responseResult), { Data: data });
}
exports.wrapResponseResult = wrapResponseResult;
