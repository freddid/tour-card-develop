"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OilTax = void 0;
var OilTax = /** @class */ (function () {
    function OilTax(oilTax) {
        var sourceId = oilTax[0];
        var periodStartDate = oilTax[1];
        var periodEndDate = oilTax[2];
        var price = oilTax[3];
        var currency = oilTax[4];
        var airline = oilTax[5];
        var hostName = oilTax[6];
        var resortName = oilTax[7];
        var resortIATA = oilTax[8];
        var resort = oilTax[9];
        var flightNumber = oilTax[10];
        var townFromId = oilTax[11];
        var ageFrom = oilTax[12];
        var ageTo = oilTax[13];
        var sourceIdNumber;
        periodStartDate = String(periodStartDate);
        periodEndDate = String(periodEndDate);
        sourceIdNumber = !isNaN(parseInt(String(sourceId), 10)) ? parseInt(String(sourceId), 10) : 0;
        price = parseFloat(String(price)) || 0;
        currency = String(currency || '');
        airline = String(airline || '');
        hostName = String(hostName || '');
        resortName = String(resortName || '');
        resortIATA = String(resortIATA || '');
        flightNumber = parseInt(String(flightNumber), 10) || 0;
        townFromId = parseInt(String(townFromId), 10) || 0;
        ageFrom = parseInt(String(ageFrom), 10) || null;
        ageTo = parseInt(String(ageTo), 10) || null;
        this.sourceId = sourceIdNumber;
        this.periodStartDate = periodStartDate;
        this.periodEndDate = periodEndDate;
        this.price = price;
        this.currency = currency;
        this.airline = airline;
        this.operatorName = hostName;
        this.hostName = hostName;
        this.resortName = resortName;
        this.resortIATA = resortIATA;
        this.resortId = resort;
        this.flightNumber = flightNumber;
        this.townFromId = townFromId;
        this.ageFrom = ageFrom;
        this.ageTo = ageTo;
    }
    return OilTax;
}());
exports.OilTax = OilTax;
