"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tour = exports.TourIndexes = exports.TourOperatorActionTypes = exports.TransportFlags = exports.TourFlags = exports.DownloadToursVariants = void 0;
var flight_info_1 = require("./flight-info");
var hotels_1 = require("./hotels");
var resorts_1 = require("./resorts");
var operators_1 = require("./operators");
var DownloadToursVariants;
(function (DownloadToursVariants) {
    DownloadToursVariants[DownloadToursVariants["WithPromo"] = 0] = "WithPromo";
    DownloadToursVariants[DownloadToursVariants["WithoutPromo"] = 1] = "WithoutPromo";
})(DownloadToursVariants = exports.DownloadToursVariants || (exports.DownloadToursVariants = {}));
var TourFlags;
(function (TourFlags) {
    /// <summary>
    /// Нет флагов.
    /// </summary>
    TourFlags[TourFlags["None"] = 0] = "None";
    /// <summary>
    /// Оператор рекомендует тур.
    /// </summary>
    TourFlags[TourFlags["Recommended"] = 1] = "Recommended";
    /// <summary>
    /// Мгновенное подтверждение.
    /// </summary>
    TourFlags[TourFlags["Instant"] = 2] = "Instant";
    /// <summary>
    /// Оператор считает, что у него это лучшее предложение.
    /// </summary>
    TourFlags[TourFlags["BestOfffer"] = 4] = "BestOfffer";
    /// <summary>
    /// Раннее бронирование.
    /// </summary>
    TourFlags[TourFlags["EarlyBook"] = 8] = "EarlyBook";
    /// <summary>
    /// Позднее бронирование.
    /// </summary>
    TourFlags[TourFlags["LateBook"] = 16] = "LateBook";
    /// <summary>
    /// Тур со скидкой.
    /// </summary>
    TourFlags[TourFlags["Discount"] = 32] = "Discount";
    /// <summary>
    /// VIP предложение.
    /// </summary>
    TourFlags[TourFlags["VipOffer"] = 64] = "VipOffer";
    /// <summary>
    /// Может быть куплен в кредит.
    /// </summary>
    TourFlags[TourFlags["CreditAvailable"] = 128] = "CreditAvailable";
    /// <summary>
    /// Эксклюзивное предложение.
    /// </summary>
    TourFlags[TourFlags["Exclusive"] = 256] = "Exclusive";
    /// <summary>
    /// При покупке тура подарки.
    /// </summary>
    TourFlags[TourFlags["GoesWithGifts"] = 512] = "GoesWithGifts";
    /// <summary>
    /// Комбинированный тур.
    /// </summary>
    TourFlags[TourFlags["IsCombined"] = 1024] = "IsCombined";
    /// <summary>
    /// Шоп-тур.
    /// </summary>
    TourFlags[TourFlags["ShopTour"] = 2048] = "ShopTour";
    /// <summary>
    /// Курорт не соответствует стране.
    /// </summary>
    TourFlags[TourFlags["CountryMismatch"] = 4096] = "CountryMismatch";
    /// <summary>
    /// Экскурсионный тур.
    /// </summary>
    TourFlags[TourFlags["ExcursionTour"] = 8192] = "ExcursionTour";
    /// <summary>
    /// Промо-цена
    /// </summary>
    TourFlags[TourFlags["PROMO"] = 16384] = "PROMO";
    /// <summary>
    /// Regular flight (need to make a request to GDS) SLT-5371 Если не передан  FlightRegular вернуться только туры с перелетом чартером
    /// </summary>
    TourFlags[TourFlags["FlightRegular"] = 32768] = "FlightRegular";
    /// <summary>
    /// Charter flight
    /// </summary>
    TourFlags[TourFlags["FlightCharter"] = 65536] = "FlightCharter";
})(TourFlags = exports.TourFlags || (exports.TourFlags = {}));
var TransportFlags;
(function (TransportFlags) {
    /// <summary>
    /// Нет флагов.
    /// </summary>
    TransportFlags[TransportFlags["None"] = 0] = "None";
    /// <summary>
    /// Включен авиаперелет
    /// </summary>
    TransportFlags[TransportFlags["Avia"] = 1] = "Avia";
    /// <summary>
    /// Включен ж/д переезд
    /// </summary>
    TransportFlags[TransportFlags["Railway"] = 2] = "Railway";
    /// <summary>
    /// Включено морское путешествие
    /// </summary>
    TransportFlags[TransportFlags["Cruise"] = 4] = "Cruise";
    /// <summary>
    /// Включен автобусный переезд
    /// </summary>
    TransportFlags[TransportFlags["Bus"] = 8] = "Bus";
})(TransportFlags = exports.TransportFlags || (exports.TransportFlags = {}));
/**
 * Определяет поведение при щелчке на кнопку "Подробнее" на странице выдачи (кнопка напротив каждого тура)
 * link("http://prntscr.com/7teomd")
 */
var TourOperatorActionTypes;
(function (TourOperatorActionTypes) {
    /**
     * Перейти на карточку тура
     */
    TourOperatorActionTypes[TourOperatorActionTypes["GoToTourCard"] = 1] = "GoToTourCard";
    /**
     * Переход к сайту ТО
     */
    TourOperatorActionTypes[TourOperatorActionTypes["GoToTourOperatorSite"] = 2] = "GoToTourOperatorSite";
    /**
     * Выбрать из попапа
     */
    TourOperatorActionTypes[TourOperatorActionTypes["SelectFromPopup"] = 3] = "SelectFromPopup";
})(TourOperatorActionTypes = exports.TourOperatorActionTypes || (exports.TourOperatorActionTypes = {}));
// https://gitlab.global.sletat.ru/slt/modules/module-api/blob/develop/SletatRu.Module/SletatRu.Module.Gate/InternalGate.Public.cs#L8728
var TourIndexes;
(function (TourIndexes) {
    /**
     * Идентификатор ценового предложения (тура).
     */
    TourIndexes[TourIndexes["offerId"] = 0] = "offerId";
    /**
     * Шифрованный идентификатор ТО.
     */
    TourIndexes[TourIndexes["sourceId"] = 1] = "sourceId";
    TourIndexes[TourIndexes["hotelLink"] = 2] = "hotelLink";
    TourIndexes[TourIndexes["hotelId"] = 3] = "hotelId";
    TourIndexes[TourIndexes["resortLink"] = 4] = "resortLink";
    TourIndexes[TourIndexes["resortId"] = 5] = "resortId";
    TourIndexes[TourIndexes["tourName"] = 6] = "tourName";
    TourIndexes[TourIndexes["hotelName"] = 7] = "hotelName";
    TourIndexes[TourIndexes["starsName"] = 8] = "starsName";
    TourIndexes[TourIndexes["room"] = 9] = "room";
    TourIndexes[TourIndexes["meals"] = 10] = "meals";
    TourIndexes[TourIndexes["accommodation"] = 11] = "accommodation";
    TourIndexes[TourIndexes["departDate"] = 12] = "departDate";
    TourIndexes[TourIndexes["arrivalDate"] = 13] = "arrivalDate";
    TourIndexes[TourIndexes["nightsCount"] = 14] = "nightsCount";
    TourIndexes[TourIndexes["priceWithCurrency"] = 15] = "priceWithCurrency";
    TourIndexes[TourIndexes["adultCount"] = 16] = "adultCount";
    TourIndexes[TourIndexes["kidsCount"] = 17] = "kidsCount";
    TourIndexes[TourIndexes["operatorName"] = 18] = "operatorName";
    TourIndexes[TourIndexes["resortName"] = 19] = "resortName";
    TourIndexes[TourIndexes["operatorLink"] = 20] = "operatorLink";
    TourIndexes[TourIndexes["hotelInStop"] = 21] = "hotelInStop";
    TourIndexes[TourIndexes["hotelIsInStopOriginalFlag"] = 21] = "hotelIsInStopOriginalFlag";
    TourIndexes[TourIndexes["ticketInPrice"] = 22] = "ticketInPrice";
    TourIndexes[TourIndexes["economyTicketsTo"] = 23] = "economyTicketsTo";
    TourIndexes[TourIndexes["economyTicketsBack"] = 24] = "economyTicketsBack";
    TourIndexes[TourIndexes["ticketBusinessTo"] = 25] = "ticketBusinessTo";
    TourIndexes[TourIndexes["ticketBusinessBack"] = 26] = "ticketBusinessBack";
    TourIndexes[TourIndexes["dateOfEntranceToHotel"] = 27] = "dateOfEntranceToHotel";
    TourIndexes[TourIndexes["dateOfCheckOut"] = 28] = "dateOfCheckOut";
    TourIndexes[TourIndexes["hotelPhoto"] = 29] = "hotelPhoto";
    TourIndexes[TourIndexes["countryId"] = 30] = "countryId";
    TourIndexes[TourIndexes["countryName"] = 31] = "countryName";
    TourIndexes[TourIndexes["cityId"] = 32] = "cityId";
    TourIndexes[TourIndexes["cityName"] = 33] = "cityName";
    TourIndexes[TourIndexes["operatorLogo"] = 34] = "operatorLogo";
    TourIndexes[TourIndexes["hotelRating"] = 35] = "hotelRating";
    TourIndexes[TourIndexes["mealDescription"] = 36] = "mealDescription";
    TourIndexes[TourIndexes["accommodationDescription"] = 37] = "accommodationDescription";
    TourIndexes[TourIndexes["hotelDescription"] = 38] = "hotelDescription";
    TourIndexes[TourIndexes["systemAccommodationId"] = 39] = "systemAccommodationId";
    TourIndexes[TourIndexes["isDemo"] = 40] = "isDemo";
    TourIndexes[TourIndexes["systemMealId"] = 41] = "systemMealId";
    TourIndexes[TourIndexes["price"] = 42] = "price";
    TourIndexes[TourIndexes["currency"] = 43] = "currency";
    TourIndexes[TourIndexes["systemTypeOfHotelRoomId"] = 44] = "systemTypeOfHotelRoomId";
    TourIndexes[TourIndexes["systemHotelCategoryId"] = 45] = "systemHotelCategoryId";
    TourIndexes[TourIndexes["hotelPhotoCount"] = 46] = "hotelPhotoCount";
    TourIndexes[TourIndexes["cabinetURL"] = 47] = "cabinetURL";
    TourIndexes[TourIndexes["originalTourName"] = 48] = "originalTourName";
    TourIndexes[TourIndexes["originalStarName"] = 49] = "originalStarName";
    TourIndexes[TourIndexes["originalResortName"] = 50] = "originalResortName";
    TourIndexes[TourIndexes["originalMealName"] = 51] = "originalMealName";
    TourIndexes[TourIndexes["originalAccommodationName"] = 52] = "originalAccommodationName";
    TourIndexes[TourIndexes["originalTypeOfRoom"] = 53] = "originalTypeOfRoom";
    TourIndexes[TourIndexes["countOfHotelRooms"] = 54] = "countOfHotelRooms";
    TourIndexes[TourIndexes["economySeatsTo"] = 55] = "economySeatsTo";
    TourIndexes[TourIndexes["economySeatsBack"] = 56] = "economySeatsBack";
    TourIndexes[TourIndexes["businessSeatsTo"] = 57] = "businessSeatsTo";
    TourIndexes[TourIndexes["businessSeatsBack"] = 58] = "businessSeatsBack";
    TourIndexes[TourIndexes["isWithTheObligations"] = 59] = "isWithTheObligations";
    TourIndexes[TourIndexes["originalHotelName"] = 60] = "originalHotelName";
    TourIndexes[TourIndexes["originalStarName1"] = 61] = "originalStarName1";
    TourIndexes[TourIndexes["originalResortName1"] = 62] = "originalResortName1";
    TourIndexes[TourIndexes["originalMealName1"] = 63] = "originalMealName1";
    TourIndexes[TourIndexes["originalAccommodationName1"] = 64] = "originalAccommodationName1";
    TourIndexes[TourIndexes["originalRoomName"] = 65] = "originalRoomName";
    TourIndexes[TourIndexes["systemHotelStarId"] = 66] = "systemHotelStarId";
    TourIndexes[TourIndexes["tourPriceType"] = 67] = "tourPriceType";
    TourIndexes[TourIndexes["priceHash"] = 68] = "priceHash";
    TourIndexes[TourIndexes["tourFlags"] = 69] = "tourFlags";
    TourIndexes[TourIndexes["tourHash"] = 79] = "tourHash";
    TourIndexes[TourIndexes["foundedMinutesAgo"] = 81] = "foundedMinutesAgo";
    TourIndexes[TourIndexes["tourOperatorActionType"] = 82] = "tourOperatorActionType";
    TourIndexes[TourIndexes["hostTourOperatorId"] = 84] = "hostTourOperatorId";
    TourIndexes[TourIndexes["hostTourOperatorName"] = 85] = "hostTourOperatorName";
    TourIndexes[TourIndexes["beachLineNumber"] = 87] = "beachLineNumber";
    TourIndexes[TourIndexes["fullPrice"] = 88] = "fullPrice";
    TourIndexes[TourIndexes["tripAdvisorHotelRating"] = 89] = "tripAdvisorHotelRating";
    TourIndexes[TourIndexes["tripAdvisorNumberOfHotelRated"] = 90] = "tripAdvisorNumberOfHotelRated";
    TourIndexes[TourIndexes["originalRoomIds"] = 91] = "originalRoomIds";
    TourIndexes[TourIndexes["hotelLatitude"] = 92] = "hotelLatitude";
    TourIndexes[TourIndexes["hotelLongitude"] = 93] = "hotelLongitude";
    TourIndexes[TourIndexes["hotelPhone"] = 94] = "hotelPhone";
    TourIndexes[TourIndexes["includedTourServices"] = 95] = "includedTourServices";
    TourIndexes[TourIndexes["systemHotelRate"] = 96] = "systemHotelRate";
    TourIndexes[TourIndexes["specialPromoOffers"] = 97] = "specialPromoOffers"; // спецаильные предложения по туру
})(TourIndexes = exports.TourIndexes || (exports.TourIndexes = {}));
/**
 * Оболочка над туром, массив которых возвращает getTours
 */
var Tour = /** @class */ (function () {
    function Tour(tour, requestId) {
        this.hotel = new hotels_1.Hotel(tour);
        this.resort = new resorts_1.Resort(tour);
        this.operator = new operators_1.Operator(tour);
        this.flightInfo = new flight_info_1.FlightInfo(tour);
        this.requestId = parseInt(String(requestId || ''), 10) || 0;
        this.offerId = parseInt(String(tour[TourIndexes.offerId] || ''), 10) || 0;
        this.sourceId = parseInt(String(tour[TourIndexes.sourceId] || ''), 10) || 0;
        this.tourName = String(tour[TourIndexes.tourName] || '');
        this.departDate = String(tour[TourIndexes.departDate] || '');
        this.arrivalDate = String(tour[TourIndexes.arrivalDate] || '');
        this.nightCount = parseInt(String(tour[TourIndexes.nightsCount] || ''), 10) || 0;
        this.nightsCount = parseInt(String(tour[TourIndexes.nightsCount] || ''), 10) || 0;
        this.priceWithCurrency = String(tour[TourIndexes.priceWithCurrency] || '');
        this.adultCount = parseInt(String(tour[TourIndexes.adultCount] || ''), 10) || 0;
        this.kidsCount = parseInt(String(tour[TourIndexes.kidsCount] || ''), 10) || 0;
        this.ticketInPrice = parseInt(String(tour[TourIndexes.ticketInPrice]), 10) !== 0;
        this.dateOfEntranceToHotel = String(tour[TourIndexes.dateOfEntranceToHotel] || '');
        this.dateOfCheckOut = String(tour[TourIndexes.dateOfCheckOut] || '');
        this.countryId = parseInt(String(tour[TourIndexes.countryId] || ''), 10) || 0;
        this.countryName = String(tour[TourIndexes.countryName] || '');
        this.cityId = parseInt(String(tour[TourIndexes.cityId] || ''), 10) || 0;
        this.cityName = String(tour[TourIndexes.cityName] || '');
        this.isDemo = !!tour[TourIndexes.isDemo];
        this.price = parseFloat(String(tour[TourIndexes.price] || '')) || 0;
        this.fullPrice = parseFloat(String(tour[TourIndexes.fullPrice])) || null; // null - нет полной цены
        this.currency = String(tour[TourIndexes.currency] || '');
        this.tourNameOriginal = String(tour[TourIndexes.originalTourName] || '');
        this.isWithTheObligations = !!tour[TourIndexes.isWithTheObligations];
        this.priceHash = String(tour[TourIndexes.priceHash] || '');
        this.tourHash = String(tour[TourIndexes.tourHash] || '');
        this.foundedMinutesAgo = parseInt(String(tour[TourIndexes.foundedMinutesAgo] || ''), 10) || 0;
        this.hostTourOperatorName = tour[TourIndexes.hostTourOperatorName];
        this.isHotelInStop = !!tour[TourIndexes.hotelInStop];
        this.isHotelInStopOriginalFlag = parseInt(String(tour[TourIndexes.hotelIsInStopOriginalFlag] || '2'), 10);
        this.isHotelInStopExtendedInfo = parseInt(String(tour[TourIndexes.hotelIsInStopOriginalFlag] || '2'), 10);
        this.hotelPlacesAvailability = parseInt(String(tour[TourIndexes.hotelIsInStopOriginalFlag] || '2'), 10);
        this.tourFlags = parseInt(String(tour[TourIndexes.tourFlags] || 0), 10);
        this.includedServices = tour[TourIndexes.includedTourServices].map(function (s) { return parseInt(String(s), 10); });
        this.specialPromoOffersIds = tour[TourIndexes.specialPromoOffers].split(',').map(function (s) { return parseInt(String(s), 10); });
    }
    return Tour;
}());
exports.Tour = Tour;
