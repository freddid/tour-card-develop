"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisaFees = void 0;
var ActualizePriceResponse_1 = require("./ActualizePriceResponse");
function getVisaFee(fee) {
    return {
        ageFrom: fee.AgeFrom,
        ageTo: fee.AgeTo,
        citizenshipName: fee.CitizenshipName,
        currency: fee.CurrencyName,
        hostName: fee.HostName,
        isExpress: fee.IsExpress,
        issueDaysFrom: fee.IssueDaysFrom,
        issueDaysTo: fee.IssueDaysTo,
        issueOnArrival: fee.IssueOnArrival,
        issueTownName: fee.IssueTownName,
        passportType: fee.PassportType,
        price: fee.Price,
        sourceId: fee.SourceId
    };
}
function getVisaFees(rawFees, kidsAges) {
    if (!rawFees || !rawFees.length)
        return [];
    var fees = rawFees.map(function (fee) { return getVisaFee(fee); }).filter(function (fee) { return fee.price > 0; });
    return filterVisaFeesByKidsAges(fees, kidsAges);
}
exports.getVisaFees = getVisaFees;
function filterVisaFeesByKidsAges(taxes, kidsAges) {
    return taxes.filter(function (tax) {
        if (!(0, ActualizePriceResponse_1.isFeeForKid)(tax)) {
            return true;
        }
        return (0, ActualizePriceResponse_1.isFeeValidForInputKidsAges)(tax, kidsAges);
    });
}
