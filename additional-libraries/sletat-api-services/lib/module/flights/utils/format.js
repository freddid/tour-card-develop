"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
var tslib_1 = require("tslib");
var format_1 = tslib_1.__importDefault(require("date-fns/format"));
function formatDate(date) {
    return (0, format_1.default)(date, 'DD.MM.YYYY');
}
exports.formatDate = formatDate;
