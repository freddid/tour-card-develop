"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapShortUrlSettings = void 0;
function wrapShortUrlSettings(settings) {
    return {
        adults: settings.Adults,
        airTransferIncluded: settings.AirTransferIncluded,
        anyHotelIfResultEmpty: settings.AnyHotelIfResultEmpty,
        anyResortIfResultEmpty: settings.AnyResortIfResultEmpty,
        country: settings.Country,
        currency: settings.Currency,
        dateEnd: settings.DateEnd,
        dateStart: settings.DateStart,
        dateType: settings.DateType,
        departureTown: settings.DepartureTown,
        hotels: settings.Hotels,
        intDatesEnd: settings.IntDatesEnd,
        intDatesStart: settings.IntDatesStart,
        kid1Age: settings.Kid1Age,
        kid2Age: settings.Kid2Age,
        kid3Age: settings.Kid3Age,
        kids: settings.Kids,
        meals: settings.Meals,
        name: settings.Name,
        nightsMax: settings.NightsMax,
        nightsMin: settings.NightsMin,
        resorts: settings.Resorts,
        searchText: settings.SearchText,
        stars: settings.Stars,
        ticketsIncluded: settings.TicketsIncluded,
        tourPriceMax: settings.TourPriceMax,
        tourPriceMin: settings.TourPriceMin,
        pageUrl: settings.PageUrl,
        siteUrl: settings.SiteUrl
    };
}
exports.wrapShortUrlSettings = wrapShortUrlSettings;
