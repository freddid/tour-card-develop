"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServices = exports.getOilTaxes = exports.getVisaFees = exports.getActualizationTour = void 0;
var tslib_1 = require("tslib");
var lodash_1 = require("lodash");
var fromString_1 = require("sletat-common-utils/lib/parse/fromString");
var Tour_1 = require("../../Tour");
var consts_1 = require("./consts");
var models_1 = require("./models");
function getActualizationTour(tourData, sletatTourId) {
    return {
        countryId: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.countryId]),
        countryName: tourData[models_1.TourIndexes.countryName] || '',
        cityId: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.departCityId]),
        cityName: tourData[models_1.TourIndexes.departCityName] || '',
        departDate: tourData[models_1.TourIndexes.departureDate] || '',
        // TODO:dmtrv что-то надо делать с временем. Хотелось бы не вытаскивать время изнутри приложения.
        // мне кажется, что неплохо было бы иметь departDateTime - js Date. Я бы вообще отказался от строковой даты гуляющей по приложению.
        arrivalDate: tourData[models_1.TourIndexes.checkOutDate] || '',
        nightsCount: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.nightsCount]),
        adultCount: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.adults]),
        kidsCount: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.kids]),
        price: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.price]),
        fullPrice: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.fullPrice]),
        priceInTourOperatorCurrency: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.originalPrice]),
        tourOperatorCurrencyId: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.tourOperatorCurrencyId]),
        actualizationCurrencyId: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.actualizationCurrencyId]),
        currency: tourData[models_1.TourIndexes.currencyAlias] || '',
        flightInfo: getFlightInfo(tourData),
        isHotelInStop: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.isHotelInStop]) === Tour_1.HotelInStop.inStop,
        isHotelInStopExtendedInfo: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.isHotelInStop] || '2'),
        hotel: getHotel(tourData),
        resort: getResort(tourData),
        nameOfSPO: tourData[models_1.TourIndexes.originalSPOName],
        sourceId: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.sourceId]),
        sourceName: tourData[models_1.TourIndexes.sourceName],
        tourHash: tourData[models_1.TourIndexes.tourHash],
        tourOperatorTourPageUrl: tourData[models_1.TourIndexes.tourOperatorTourPageUrl],
        tourOperatorInfoPageAlias: tourData[models_1.TourIndexes.tourOperatorInfoPageAlias],
        sletatTourId: sletatTourId,
        originLatArrivalCountryName: tourData[models_1.TourIndexes.originLatArrivalCountryName],
        originLatDepartCityName: tourData[models_1.TourIndexes.originLatDepartCityName],
        tourFlag: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.tourFlag]),
        accommodationNameOriginal: tourData[models_1.TourIndexes.hotelPlaceName]
    };
}
exports.getActualizationTour = getActualizationTour;
function getVisaFees(rawFees, kidsAges) {
    var fees = (rawFees || []).map(getVisaFee).filter(function (fee) { return fee.price > 0; });
    return filterVisaFeesByKidsAges(fees, kidsAges);
}
exports.getVisaFees = getVisaFees;
function getOilTaxes(rawTaxes, kidsAges) {
    var taxes = (rawTaxes || []).map(wrapOilTax);
    taxes = (taxes || []).filter(function (tax) { return tax.price > 0; });
    return filterOilTaxByKidsAges(taxes, kidsAges);
}
exports.getOilTaxes = getOilTaxes;
function getServices(resources) {
    var servicesList = Object.getOwnPropertyNames(consts_1.TourServices).map(function (key) { return consts_1.TourServices[key]; });
    var getServiceByType = function (type) { return (0, lodash_1.find)(servicesList, ['type', type]); };
    // SLT-4115 проверяем, есть ли в списке ресурсы траснферов
    // если да, находим включенные и добавляем только их к результату
    // если включенных трансферов нет, работаем с исходным списком
    var transferResources = (resources || []).filter(function (res) { return res.type === models_1.ResourceTypes.transfer; });
    var hasCheckedTransfers = transferResources.some(function (res) { return res.isChecked; });
    var resourcesToIntersect = hasCheckedTransfers
        ? tslib_1.__spreadArray(tslib_1.__spreadArray([], (resources || []).filter(function (res) { return res.type !== models_1.ResourceTypes.transfer; }), true), [
            transferResources.filter(function (res) { return res.isChecked; })[0]
        ], false) : resources || [];
    var resultResources = (0, lodash_1.intersectionBy)(resourcesToIntersect, servicesList, 'type');
    return {
        included: resultResources.filter(function (res) { return res.isChecked; }).map(function (res) { return getServiceByType(res.type); }),
        notIncluded: resultResources.filter(function (res) { return !res.isChecked; }).map(function (res) { return getServiceByType(res.type); })
    };
}
exports.getServices = getServices;
function getFlightInfo(tourData) {
    return {
        economyTicketsTo: getTicketAvailabilityInfo(tourData, models_1.TourIndexes.economyDepartTickets),
        economyTicketsBack: getTicketAvailabilityInfo(tourData, models_1.TourIndexes.economyReturnTickets),
        ticketBusinessTo: getTicketAvailabilityInfo(tourData, models_1.TourIndexes.businessDepartTickets),
        ticketBusinessBack: getTicketAvailabilityInfo(tourData, models_1.TourIndexes.businessReturnTickets),
        ticketsInPrice: (0, fromString_1.getBooleanFromString)(tourData[models_1.TourIndexes.isTicketsIncluded], 'True'),
        isFewEconomyDepartTickets: tourData[models_1.TourIndexes.isFewEconomyDepartTickets],
        isFewEconomyReturnTickets: tourData[models_1.TourIndexes.isFewEconomyReturnTickets],
        isFewBusinessDepartTickets: tourData[models_1.TourIndexes.isFewBusinessDepartTickets],
        isFewBusinessReturnTickets: tourData[models_1.TourIndexes.isFewBusinessReturnTickets]
    };
}
function getHotel(tourData) {
    return {
        id: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.hotelId]),
        isLinked: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.hotelId]) !== 0,
        link: tourData[models_1.TourIndexes.hotelURL] || '',
        name: tourData[models_1.TourIndexes.hotelName] || '',
        photoUrl: (tourData[models_1.TourIndexes.hotelPhotoURL] || '').replace(/^https?:/, ''),
        rating: (0, fromString_1.getFloatFromString)(tourData[models_1.TourIndexes.hotelRating], 1),
        description: tourData[models_1.TourIndexes.originalTourDescription] || '',
        photoCount: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.hotelPhotosCount]),
        systemHotelCategoryId: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.hotelCategoryId]),
        starsName: tourData[models_1.TourIndexes.hotelCategoryName] || '',
        starsNameOriginal: tourData[models_1.TourIndexes.originalStarName] || '',
        roomType: tourData[models_1.TourIndexes.hotelRoomTypeName] || '',
        systemRoomTypeId: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.hotelRoomTypeId]),
        roomTypeOriginal: tourData[models_1.TourIndexes.originalRoomTypeName] || '',
        mealName: tourData[models_1.TourIndexes.hotelMealName] || '',
        mealDescription: tourData[models_1.TourIndexes.mealTypeDescription],
        systemMealId: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.hotelMealId]),
        mealNameOriginal: tourData[models_1.TourIndexes.originalMealName] || '',
        accommodation: tourData[models_1.TourIndexes.hotelAccommodationName] || '',
        systemAccommodationId: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.hotelAccommodationId]),
        accommodationDescription: tourData[models_1.TourIndexes.hotelPlaceName]
    };
}
function getResort(tourData) {
    return {
        id: (0, fromString_1.getIntegerFromString)(tourData[models_1.TourIndexes.resortId]),
        name: tourData[models_1.TourIndexes.resortName] || '',
        nameOriginal: tourData[models_1.TourIndexes.originalResortName] || ''
    };
}
function getTicketAvailabilityInfo(tourData, index) {
    var value = (0, fromString_1.getIntegerFromString)(tourData[index]);
    return value !== null ? value : Tour_1.TicketsAvailability.NoSuchData;
}
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
function filterVisaFeesByKidsAges(taxes, kidsAges) {
    return (taxes || []).filter(function (tax) {
        if (!isFeeForKid(tax)) {
            return true;
        }
        return isFeeValidForInputKidsAges(tax, kidsAges);
    });
}
function wrapOilTax(tax) {
    return {
        periodStartDate: tax[models_1.OilTaxIndexes.periodStartDate] || '',
        periodEndDate: tax[models_1.OilTaxIndexes.periodEndDate] || '',
        price: (0, fromString_1.getIntegerFromString)(tax[models_1.OilTaxIndexes.price]),
        currency: tax[models_1.OilTaxIndexes.currency] || '',
        airline: tax[models_1.OilTaxIndexes.airline] || '',
        hostName: tax[models_1.OilTaxIndexes.hostName] || '',
        resortName: tax[models_1.OilTaxIndexes.resortName] || '',
        resortIATA: tax[models_1.OilTaxIndexes.resortIATA] || '',
        flightNumber: (0, fromString_1.getIntegerFromString)(tax[models_1.OilTaxIndexes.flightNumber]),
        townFromId: (0, fromString_1.getIntegerFromString)(tax[models_1.OilTaxIndexes.townFromId]),
        sourceName: tax[models_1.OilTaxIndexes.sourceName] || '',
        ageFrom: (0, fromString_1.getIntegerFromString)(tax[models_1.OilTaxIndexes.ageFrom]),
        ageTo: (0, fromString_1.getIntegerFromString)(tax[models_1.OilTaxIndexes.ageTo])
    };
}
function filterOilTaxByKidsAges(taxes, kidsAges) {
    return (taxes || []).filter(function (tax) {
        if (!isFeeForKid(tax)) {
            return true;
        }
        return isFeeValidForInputKidsAges(tax, kidsAges);
    });
}
function isFeeForKid(fee) {
    var result = true;
    var ageFrom = fee.ageFrom;
    var ageTo = fee.ageTo;
    if (ageFrom !== null && ageTo !== null) {
        result = ageFrom < 18 && ageTo <= 18;
    }
    else if (ageFrom !== null && ageTo === null) {
        result = ageFrom < 18;
    }
    else if (ageFrom === null && ageTo !== null) {
        result = ageTo <= 18;
    }
    else {
        result = true;
    }
    return result;
}
function isFeeValidForInputKidsAges(fee, agesList) {
    var result = true;
    var ageFrom = fee.ageFrom;
    var ageTo = fee.ageTo;
    if (agesList.length) {
        // Проверяем чтобы сбор проходил по возрасту хотя бы для одного из детей.
        result =
            (agesList || []).filter(function (age) {
                var innerResult = true;
                if (ageFrom !== null && ageTo !== null) {
                    innerResult = ageFrom <= age && ageTo > age;
                }
                else if (ageFrom !== null && ageTo === null) {
                    innerResult = ageFrom <= age;
                }
                else if (ageFrom === null && ageTo !== null) {
                    innerResult = ageTo > age;
                }
                return innerResult;
            }).length > 0;
    }
    else {
        // Проверяем, что в отстствие детей мы не пропустим сбор предазначеный туристам,
        // чей возраст меньше 18 лет.
        if (ageTo !== null) {
            // Тут проверяем, что именно "больше", поскольку приходит "не включительно".
            result = ageTo > 18;
        }
    }
    return result;
}
