"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShowcases = void 0;
var getTemplate = function (rawTemplate) {
    return rawTemplate
        ? {
            townFromID: rawTemplate.townFromId,
            adults: rawTemplate.adults,
            kids: rawTemplate.kids,
            checkInDate: rawTemplate.checkInFrom,
            checkOutDate: rawTemplate.checkInTo,
            hasTickets: rawTemplate.hasTickets,
            isHotelNotInStop: rawTemplate.hotelIsNotInStop,
            isTicketsIncluded: rawTemplate.ticketsIncluded,
            mealIDs: rawTemplate.meals,
            starIDs: rawTemplate.stars,
            nightsMax: rawTemplate.nightsMax,
            nightsMin: rawTemplate.nightsMin,
            priceMax: rawTemplate.priceMax,
            priceMin: rawTemplate.priceMin,
            pseudoDiscountPercent: rawTemplate.lastPricePercent,
            useRandomDiscountPercent: rawTemplate.useRandomPricePercent
        }
        : null;
};
var getShowcaseItem = function (ID, name) {
    return {
        ID: ID,
        name: name
    };
};
var getItemsListFromDataLists = function (IDList, namesList) {
    return IDList.map(function (ID, index) { return getShowcaseItem(ID, namesList[index]); });
};
function getIDByName(name, list) {
    var showCase = list.find(function (showCaseItem) { return showCaseItem.name === name; });
    return showCase ? showCase.ID : 0;
}
var parseCurrencyFromPriceString = function (price) {
    var RUB_CURRENCY = 'RUB';
    var currencyFromPrice = price.split(' ')[1] || '';
    return currencyFromPrice.length === 3 ? currencyFromPrice : RUB_CURRENCY;
};
var getShowcase = function (data) {
    return {
        availableMeals: getItemsListFromDataLists(data.AvailableMealIds, data.AvailableMealNames),
        availableNights: data.AvailableNights,
        availableResorts: getItemsListFromDataLists(data.AvailableResortsIds, data.AvailableResortsNames),
        availableHotelCategories: getItemsListFromDataLists(data.AvailableStarIds, data.AvailableStarNames),
        country: {
            ID: data.CountryId,
            name: data.CountryName,
            imageURL: data.CountryImageUrl.replace(/https?:/, ''),
            capitalWeather: {}
        },
        resort: {
            ID: getIDByName(data.ResortName, getItemsListFromDataLists(data.AvailableResortsIds, data.AvailableResortsNames)),
            name: data.ResortName
        },
        hotel: {
            ID: parseInt(String(data.HotelId), 10) || null,
            name: data.HotelName,
            hotelURL: data.HotelUrl,
            hotelPlaceName: data.HtPlaceName
        },
        meal: {
            ID: getIDByName(data.MealName, getItemsListFromDataLists(data.AvailableMealIds, data.AvailableMealNames)),
            name: data.MealName
        },
        category: {
            ID: getIDByName(data.StarName, getItemsListFromDataLists(data.AvailableStarIds, data.AvailableStarNames)),
            name: data.StarName
        },
        minPrice: parseInt(data.MinPrice, 10) || 0,
        currency: parseCurrencyFromPriceString(data.MinPrice),
        minPriceDate: data.MinPriceDate,
        nights: data.Nights,
        offerID: data.OfferId,
        sourceID: data.SourceId,
        isDemo: isNaN(parseInt(data.MinPrice, 10)),
        template: getTemplate(data.Template)
    };
};
var getShowcases = function (list) {
    return list.map(function (data) { return getShowcase(data); });
};
exports.getShowcases = getShowcases;
