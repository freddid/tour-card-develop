"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = exports.HotelPopularity = exports.CurrencyId = void 0;
var tslib_1 = require("tslib");
var CurrencyId;
(function (CurrencyId) {
    CurrencyId[CurrencyId["USD"] = 2] = "USD";
    CurrencyId[CurrencyId["EUR"] = 3] = "EUR";
    CurrencyId[CurrencyId["RUB"] = 5] = "RUB";
    CurrencyId[CurrencyId["BYR"] = 6] = "BYR";
    CurrencyId[CurrencyId["KZT"] = 7] = "KZT";
    CurrencyId[CurrencyId["UAH"] = 8] = "UAH";
    CurrencyId[CurrencyId["BYN"] = 9] = "BYN";
    CurrencyId[CurrencyId["CAD"] = 10] = "CAD";
})(CurrencyId = exports.CurrencyId || (exports.CurrencyId = {}));
var HotelPopularity;
(function (HotelPopularity) {
    HotelPopularity[HotelPopularity["NotPopular"] = 0] = "NotPopular";
    HotelPopularity[HotelPopularity["Popular"] = 1] = "Popular";
    HotelPopularity[HotelPopularity["VeryPopular"] = 2] = "VeryPopular";
})(HotelPopularity = exports.HotelPopularity || (exports.HotelPopularity = {}));
var HttpError = /** @class */ (function (_super) {
    tslib_1.__extends(HttpError, _super);
    function HttpError(msg, statusCode, errorCode) {
        if (statusCode === void 0) { statusCode = null; }
        if (errorCode === void 0) { errorCode = null; }
        var _this = _super.call(this, msg) || this;
        _this.statusCode = null;
        _this.errorCode = null;
        _this.name = 'HttpError';
        _this.statusCode = statusCode;
        _this.errorCode = errorCode;
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
