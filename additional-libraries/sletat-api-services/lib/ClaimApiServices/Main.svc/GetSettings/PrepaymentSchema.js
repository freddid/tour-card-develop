"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawPrepaymentType = exports.prepaymentSchemaConverter = exports.PrepaymentType = void 0;
var PrepaymentType;
(function (PrepaymentType) {
    PrepaymentType[PrepaymentType["fixed"] = 0] = "fixed";
    PrepaymentType[PrepaymentType["percent"] = 1] = "percent";
})(PrepaymentType = exports.PrepaymentType || (exports.PrepaymentType = {}));
/**
 * @deprecated
 * SLT-2674 используется в GetSettings
 */
function prepaymentSchemaConverter(schema) {
    var prepaymentType = schema.PrepaymentType === RawPrepaymentType.Fixed ? PrepaymentType.fixed : PrepaymentType.percent;
    return {
        minPrice: schema.MinPrice,
        maxPrice: schema.MaxPrice,
        prepaymentType: prepaymentType,
        daysToPay: schema.DaysToPay,
        value: schema.Value
    };
}
exports.prepaymentSchemaConverter = prepaymentSchemaConverter;
var RawPrepaymentType;
(function (RawPrepaymentType) {
    RawPrepaymentType[RawPrepaymentType["Fixed"] = 0] = "Fixed";
    RawPrepaymentType[RawPrepaymentType["Percent"] = 1] = "Percent";
})(RawPrepaymentType = exports.RawPrepaymentType || (exports.RawPrepaymentType = {}));
