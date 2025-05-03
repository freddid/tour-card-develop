"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisaFee = void 0;
var VisaFee = /** @class */ (function () {
    function VisaFee(visaInfo, currency) {
        this.minPrice = visaInfo[1];
        this.maxPrice = visaInfo[2];
        this.sourceId = visaInfo[0];
        this.currency = currency;
    }
    return VisaFee;
}());
exports.VisaFee = VisaFee;
