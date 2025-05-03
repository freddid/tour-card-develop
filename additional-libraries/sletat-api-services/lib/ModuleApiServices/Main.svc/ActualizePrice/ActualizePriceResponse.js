"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFeeValidForInputKidsAges = exports.isFeeForKid = exports.getActualizePriceResponseData = void 0;
var fromString_1 = require("sletat-common-utils/lib/parse/fromString");
var Tour_1 = require("../../../Tour");
var OilTaxes_1 = require("./OilTaxes");
var VisaFees_1 = require("./VisaFees");
var TourServices_1 = require("./TourServices");
function getActualizePriceResponseData(requestParams, isDetailedActualization) {
    return function dataHandler(data) {
        var tour = data.data ? getActualizationTour(data.data, data.randomNumber) : null;
        var visaFees = (0, VisaFees_1.getVisaFees)(data.visaExtendedInfo, requestParams.kidsAges || []);
        var resources = data.resources;
        return {
            requestParams: requestParams,
            sessionId: data.actualizationSessionId,
            tour: tour,
            errorMessage: data.errorMessage,
            isCompleted: data.isCompleted,
            isDetailedExists: data.isDetailedExists,
            isError: data.isError,
            isFound: data.isFound,
            sletatTourId: data.randomNumber,
            oilTaxes: (0, OilTaxes_1.getOilTaxes)(data.oilTaxes, requestParams.kidsAges || []),
            resourceData: data.resourceData,
            resources: resources,
            visaFees: visaFees,
            services: (0, TourServices_1.getServices)(resources),
            specialPromoOffers: data.specialPromoOffers
        };
    };
}
exports.getActualizePriceResponseData = getActualizePriceResponseData;
function getActualizationTour(tourData, sletatTourId) {
    return {
        countryId: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.countryId]),
        countryName: tourData[TourIndexes.countryName] || '',
        cityId: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.departCityId]),
        cityName: tourData[TourIndexes.departCityName] || '',
        departDate: tourData[TourIndexes.departureDate] || '',
        // TODO:dmtrv что-то надо делать с временем. Хотелось бы не вытаскивать время изнутри приложения.
        // мне кажется, что неплохо было бы иметь departDateTime - js Date. Я бы вообще отказался от строковой даты гуляющей по приложению.
        arrivalDate: tourData[TourIndexes.checkOutDate] || '',
        nightsCount: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.nightsCount]),
        adultCount: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.adults]),
        kidsCount: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.kids]),
        price: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.price]),
        fullPrice: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.fullPrice]),
        currency: tourData[TourIndexes.currencyAlias] || '',
        flightInfo: getFlightInfo(tourData),
        isHotelInStop: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.isHotelInStop]) === Tour_1.HotelInStop.inStop,
        isHotelInStopExtendedInfo: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.isHotelInStop] || '2'),
        hotel: getHotel(tourData),
        resort: getResort(tourData),
        nameOfSPO: tourData[TourIndexes.originalSPOName],
        sourceId: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.sourceId]),
        sourceName: tourData[TourIndexes.sourceName],
        tourHash: tourData[TourIndexes.tourHash],
        tourOperatorTourPageUrl: tourData[TourIndexes.tourOperatorTourPageUrl],
        sletatTourId: sletatTourId,
        tourFlag: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.tourFlag])
    };
}
function getFlightInfo(tourData) {
    return {
        economyTicketsTo: getTicketAvailabilityInfo(tourData, TourIndexes.economyDepartTickets),
        economyTicketsBack: getTicketAvailabilityInfo(tourData, TourIndexes.economyReturnTickets),
        ticketBusinessTo: getTicketAvailabilityInfo(tourData, TourIndexes.businessDepartTickets),
        ticketBusinessBack: getTicketAvailabilityInfo(tourData, TourIndexes.businessReturnTickets),
        ticketsInPrice: (0, fromString_1.getBooleanFromString)(tourData[TourIndexes.isTicketsIncluded], 'True')
    };
}
function getTicketAvailabilityInfo(tourData, index) {
    var value = (0, fromString_1.getIntegerFromString)(tourData[index]);
    return value !== null ? value : Tour_1.TicketsAvailability.NoSuchData;
}
function getHotel(tourData) {
    return {
        id: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.hotelId]),
        isLinked: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.hotelId]) !== 0,
        link: tourData[TourIndexes.hotelURL] || '',
        name: tourData[TourIndexes.hotelName] || '',
        photoUrl: (tourData[TourIndexes.hotelPhotoURL] || '').replace(/^https?:/, ''),
        rating: (0, fromString_1.getFloatFromString)(tourData[TourIndexes.hotelRating], 1),
        description: tourData[TourIndexes.originalTourDescription] || '',
        photoCount: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.hotelPhotosCount]),
        systemHotelCategoryId: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.hotelCategoryId]),
        starsName: tourData[TourIndexes.hotelCategoryName] || '',
        starsNameOriginal: tourData[TourIndexes.originalStarName] || '',
        roomType: tourData[TourIndexes.hotelRoomTypeName] || '',
        systemRoomTypeId: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.hotelRoomTypeId]),
        roomTypeOriginal: tourData[TourIndexes.originalRoomTypeName] || '',
        mealName: tourData[TourIndexes.hotelMealName] || '',
        mealDescription: tourData[TourIndexes.mealTypeDescription],
        systemMealId: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.hotelMealId]),
        mealNameOriginal: tourData[TourIndexes.originalMealName] || '',
        accommodation: tourData[TourIndexes.hotelAccommodationName] || '',
        systemAccommodationId: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.hotelAccommodationId]),
        accommodationDescription: tourData[TourIndexes.accommodationDescription]
    };
}
function getResort(tourData) {
    return {
        id: (0, fromString_1.getIntegerFromString)(tourData[TourIndexes.resortId]),
        name: tourData[TourIndexes.resortName] || '',
        nameOriginal: tourData[TourIndexes.originalResortName] || ''
    };
}
var TourIndexes;
(function (TourIndexes) {
    /**
     * Оригинальное назвнаие страны-направления.
     */
    TourIndexes[TourIndexes["originalCountryName"] = 0] = "originalCountryName";
    /**
     * Оригинальное название города вылета.
     */
    TourIndexes[TourIndexes["originalDepartCityName"] = 1] = "originalDepartCityName";
    /**
     * Оригинальное название курорта.
     */
    TourIndexes[TourIndexes["originalResortName"] = 2] = "originalResortName";
    /**
     * Оригинальное название программы, в рамках которой тур значится у ТО.
     */
    TourIndexes[TourIndexes["originalSPOName"] = 3] = "originalSPOName";
    /**
     * Дата вылета в формате DD.MM.YYYY.
     */
    TourIndexes[TourIndexes["departureDate"] = 4] = "departureDate";
    /**
     * Продолжительность тура в ночах.
     */
    TourIndexes[TourIndexes["nightsCount"] = 5] = "nightsCount";
    /**
     * Оригинальное название отеля.
     */
    TourIndexes[TourIndexes["originalHotelName"] = 6] = "originalHotelName";
    /**
     * Идентификатор поискового запроса в рамках которого был найден тур.
     *
     * @deprecated Согласно документации - не используется.
     */
    TourIndexes[TourIndexes["requestId"] = 7] = "requestId";
    /**
     * Оригинальная категория отеля.
     *
     * В формате "2*".
     */
    TourIndexes[TourIndexes["originalStarName"] = 8] = "originalStarName";
    /**
     * Оригинальное название типа номера.
     */
    TourIndexes[TourIndexes["originalRoomTypeName"] = 9] = "originalRoomTypeName";
    /**
     * Дата выезда из отеля в формате DD.MM.YYYY.
     */
    TourIndexes[TourIndexes["checkOutDate"] = 10] = "checkOutDate";
    /**
     * Оригинальное название типа питания.
     *
     * В формате "BB".
     */
    TourIndexes[TourIndexes["originalMealName"] = 11] = "originalMealName";
    /**
     * Признак того, что билеты включены в стоимость тура.
     */
    TourIndexes[TourIndexes["isTicketsIncluded"] = 12] = "isTicketsIncluded";
    /**
     * Признак того, что отель на стопе.
     */
    TourIndexes[TourIndexes["isHotelInStop"] = 13] = "isHotelInStop";
    /**
     * Наличие билетов эконом-класса для перелета "туда".
     */
    TourIndexes[TourIndexes["economyDepartTickets"] = 14] = "economyDepartTickets";
    /**
     * Наличие билетов эконом-класса для перелета "обратно".
     */
    TourIndexes[TourIndexes["economyReturnTickets"] = 15] = "economyReturnTickets";
    /**
     * Наличие билетов бизнес-класса для перелета "туда".
     */
    TourIndexes[TourIndexes["businessDepartTickets"] = 16] = "businessDepartTickets";
    /**
     * Наличие билетов бизнес-класса для перелета "обратно".
     */
    TourIndexes[TourIndexes["businessReturnTickets"] = 17] = "businessReturnTickets";
    /**
     * Оригинальная цена тура
     */
    TourIndexes[TourIndexes["originalPrice"] = 18] = "originalPrice";
    /**
     * Цена в запрошенной валюте.
     */
    TourIndexes[TourIndexes["price"] = 19] = "price";
    /**
     * Оригинальное описание тура.
     */
    TourIndexes[TourIndexes["originalTourDescription"] = 20] = "originalTourDescription";
    /**
     * Оригинальное название туроператора.
     */
    TourIndexes[TourIndexes["originalOperatorName"] = 21] = "originalOperatorName";
    /**
     * Тип размещения.
     */
    TourIndexes[TourIndexes["hotelPlaceName"] = 22] = "hotelPlaceName";
    /**
     * Системное название валюты.
     */
    TourIndexes[TourIndexes["currencyAlias"] = 23] = "currencyAlias";
    /**
     * Идентификатор туроператора.
     */
    TourIndexes[TourIndexes["sourceId"] = 24] = "sourceId";
    /**
     * Название туроператора.
     */
    TourIndexes[TourIndexes["sourceName"] = 25] = "sourceName";
    /**
     * Идентификатор страны-направления.
     */
    TourIndexes[TourIndexes["countryId"] = 26] = "countryId";
    /**
     * Название страны-направления.
     */
    TourIndexes[TourIndexes["countryName"] = 27] = "countryName";
    /**
     * Идентификатор города вылета.
     */
    TourIndexes[TourIndexes["departCityId"] = 28] = "departCityId";
    /**
     * Название города вылета.
     */
    TourIndexes[TourIndexes["departCityName"] = 29] = "departCityName";
    /**
     * Идентификатор курорта.
     */
    TourIndexes[TourIndexes["resortId"] = 30] = "resortId";
    /**
     * Название курорта.
     */
    TourIndexes[TourIndexes["resortName"] = 31] = "resortName";
    /**
     * Идентификатор отеля.
     */
    TourIndexes[TourIndexes["hotelId"] = 32] = "hotelId";
    /**
     * Название отеля.
     */
    TourIndexes[TourIndexes["hotelName"] = 33] = "hotelName";
    /**
     * Идентификатор категории отеля.
     */
    TourIndexes[TourIndexes["hotelCategoryId"] = 34] = "hotelCategoryId";
    /**
     * Название категории отеля.
     *
     * В формате "2*".
     */
    TourIndexes[TourIndexes["hotelCategoryName"] = 35] = "hotelCategoryName";
    /**
     * Идентификатор типа номера.
     */
    TourIndexes[TourIndexes["hotelRoomTypeId"] = 36] = "hotelRoomTypeId";
    /**
     * Тип номера.
     */
    TourIndexes[TourIndexes["hotelRoomTypeName"] = 37] = "hotelRoomTypeName";
    /**
     * Идентификатор типа питания.
     */
    TourIndexes[TourIndexes["hotelMealId"] = 38] = "hotelMealId";
    /**
     * Тип питания.
     */
    TourIndexes[TourIndexes["hotelMealName"] = 39] = "hotelMealName";
    /**
     * Идентификатор типа размещения.
     */
    TourIndexes[TourIndexes["hotelAccommodationId"] = 40] = "hotelAccommodationId";
    /**
     * Тип размещения.
     */
    TourIndexes[TourIndexes["hotelAccommodationName"] = 41] = "hotelAccommodationName";
    /**
     * Ссылка на туроператора.
     */
    TourIndexes[TourIndexes["operatorURL"] = 42] = "operatorURL";
    /**
     * Ссылка на страницу отеля.
     */
    TourIndexes[TourIndexes["hotelURL"] = 43] = "hotelURL";
    /**
     * Ссылка на первую фотографию отеля.
     *
     * В формате "http://hotels.sletat.ru/i/p/37064_0.jpg", где первое число - hotelId, а второе - номер фотографии.
     */
    TourIndexes[TourIndexes["hotelPhotoURL"] = 44] = "hotelPhotoURL";
    /**
     * Количество доступных фотографий отеля.
     */
    TourIndexes[TourIndexes["hotelPhotosCount"] = 45] = "hotelPhotosCount";
    /**
     * Ссылка на страницу слетать.ру, которая редиректнет на страницу тура на сайте самого оператора
     */
    TourIndexes[TourIndexes["tourOperatorTourPageUrl"] = 46] = "tourOperatorTourPageUrl";
    /**
     * ???.
     */
    TourIndexes[TourIndexes["unknownField2"] = 47] = "unknownField2";
    /**
     * Рейтинг отеля.
     */
    TourIndexes[TourIndexes["hotelRating"] = 48] = "hotelRating";
    /**
     * Описание питания в виде строки.
     */
    TourIndexes[TourIndexes["mealTypeDescription"] = 49] = "mealTypeDescription";
    /**
     * Тип номера в виде строки.
     */
    TourIndexes[TourIndexes["accommodationDescription"] = 50] = "accommodationDescription";
    /**
     * ???.
     */
    TourIndexes[TourIndexes["unknownField5"] = 51] = "unknownField5";
    /**
     * ???.
     */
    TourIndexes[TourIndexes["unknownField6"] = 52] = "unknownField6";
    /**
     * Кол-во взрослых в туре.
     */
    TourIndexes[TourIndexes["adults"] = 53] = "adults";
    /**
     * Кол-во детей в туре.
     */
    TourIndexes[TourIndexes["kids"] = 54] = "kids";
    /**
     * Хэш тура, ваш Кэп.
     */
    TourIndexes[TourIndexes["tourHash"] = 55] = "tourHash";
    /**
     * ???.
     */
    TourIndexes[TourIndexes["unknownField10"] = 56] = "unknownField10";
    /**
     * Полная цена тура.
     */
    TourIndexes[TourIndexes["fullPrice"] = 57] = "fullPrice";
    /**
     * SLT-4509: Битовые флаги тура TourFlags
     */
    TourIndexes[TourIndexes["tourFlag"] = 67] = "tourFlag";
})(TourIndexes || (TourIndexes = {}));
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
exports.isFeeForKid = isFeeForKid;
function isFeeValidForInputKidsAges(fee, agesList) {
    var result = true;
    var ageFrom = fee.ageFrom;
    var ageTo = fee.ageTo;
    if (agesList.length) {
        // Проверяем чтобы сбор проходил по возрасту хотя бы для одного из детей.
        result =
            agesList.filter(function (age) {
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
exports.isFeeValidForInputKidsAges = isFeeValidForInputKidsAges;
