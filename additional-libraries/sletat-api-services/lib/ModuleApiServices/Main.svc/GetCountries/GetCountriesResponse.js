"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = exports.getGetCountriesResponseData = void 0;
function getGetCountriesResponseData(data) {
    return {
        countries: data.map(function (country) { return new Country(country); })
    };
}
exports.getGetCountriesResponseData = getGetCountriesResponseData;
var Country = /** @class */ (function () {
    function Country(data) {
        this.id = data.Id;
        this.name = data.Name;
        this.alias = data.Alias === 'NIL' ? null : data.Alias;
        this.hasTickets = data.HasTickets;
        this.hotelIsNotInStop = data.HotelIsNotInStop;
        this.rank = data.Rank;
        this.ticketsIncluded = data.TicketsIncluded;
        this.isVisa = data.IsVisa;
        this.flags = data.Flags;
    }
    return Country;
}());
exports.Country = Country;
