"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapResponse = void 0;
function wrapCountry(unwrappedCountry) {
    return {
        id: unwrappedCountry.Id,
        name: unwrappedCountry.Name,
        originalName: unwrappedCountry.OriginalName,
        alias: unwrappedCountry.Alias,
        flags: unwrappedCountry.Flags,
        hasTickets: unwrappedCountry.HasTickets,
        hotelIsNotInStop: unwrappedCountry.HotelIsNotInStop,
        isProVisa: unwrappedCountry.IsProVisa,
        isVisa: unwrappedCountry.IsVisa,
        rank: unwrappedCountry.Rank,
        ticketsIncluded: unwrappedCountry.TicketsIncluded
    };
}
function wrapResponse(unwrappedCountries) {
    return {
        countries: unwrappedCountries.map(wrapCountry)
    };
}
exports.wrapResponse = wrapResponse;
