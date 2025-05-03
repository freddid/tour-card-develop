"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tour = exports.FlightInfo = exports.SeatsInfo = exports.HotelPlacesAvailability = exports.Resort = exports.Operator = exports.Hotel = exports.TourIndexes = exports.TourOperatorActionTypes = void 0;
var types_1 = require("../../../types");
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
    TourIndexes[TourIndexes["priceHash"] = 68] = "priceHash";
    TourIndexes[TourIndexes["tourHash"] = 79] = "tourHash";
    TourIndexes[TourIndexes["foundedMinutesAgo"] = 81] = "foundedMinutesAgo";
    TourIndexes[TourIndexes["tourOperatorActionType"] = 82] = "tourOperatorActionType";
    TourIndexes[TourIndexes["hostTourOperatorName"] = 85] = "hostTourOperatorName";
    TourIndexes[TourIndexes["beachLineNumber"] = 87] = "beachLineNumber";
    TourIndexes[TourIndexes["fullPrice"] = 88] = "fullPrice";
    TourIndexes[TourIndexes["tripAdvisorHotelRating"] = 89] = "tripAdvisorHotelRating";
    TourIndexes[TourIndexes["tripAdvisorNumberOfHotelRated"] = 90] = "tripAdvisorNumberOfHotelRated";
    TourIndexes[TourIndexes["hotelPhone"] = 92] = "hotelPhone";
})(TourIndexes = exports.TourIndexes || (exports.TourIndexes = {}));
var Hotel = /** @class */ (function () {
    function Hotel(tour) {
        this.link = String(tour[2 /* TourIndexes.hotelLink */] || '');
        this.id = parseInt(String(tour[3 /* TourIndexes.hotelId */] || ''), 10) || 0;
        this.isLinked = this.id !== 0;
        this.name = String(tour[7 /* TourIndexes.hotelName */] || '').replace(/\s*\d?\d?\s*\*\s*$/, '');
        // Удаляем протокол, т.к. может быть потребность в https, а сервис отдает только http.
        this.photoUrl = String(tour[29 /* TourIndexes.hotelPhoto */] || '').replace(/^https?:/, '');
        this.rating = parseFloat(String(tour[35 /* TourIndexes.hotelRating */] || '')) || 0;
        this.description = String(tour[38 /* TourIndexes.hotelDescription */] || '');
        this.photoCount = parseInt(String(tour[46 /* TourIndexes.hotelPhotoCount */] || ''), 10) || 0;
        this.countOfHotelRooms = parseInt(String(tour[54 /* TourIndexes.countOfHotelRooms */] || ''), 10) || 0;
        this.systemHotelTypeId = parseInt(String(tour[45 /* TourIndexes.systemHotelCategoryId */] || ''), 10) || 0;
        this.systemHotelCategoryId = parseInt(String(tour[45 /* TourIndexes.systemHotelCategoryId */] || ''), 10) || 0;
        // Если находим в конце строки число и звездочку, то удаляем, т.к. вывод звездочек есть отдельно.
        this.starsName = String(tour[8 /* TourIndexes.starsName */] || '');
        this.starsNameOriginal = String(tour[49 /* TourIndexes.originalStarName */] || '');
        this.beachLineNumber = parseInt(String(tour[87 /* TourIndexes.beachLineNumber */] || ''), 10) || 0;
        this.roomType = String(tour[9 /* TourIndexes.room */] || '');
        this.roomTypeIdInSystem = parseInt(String(tour[44 /* TourIndexes.systemTypeOfHotelRoomId */] || ''), 10) || 0;
        this.systemRoomTypeId = parseInt(String(tour[44 /* TourIndexes.systemTypeOfHotelRoomId */] || ''), 10) || 0;
        this.roomTypeOriginal = String(tour[53 /* TourIndexes.originalTypeOfRoom */] || '');
        this.mealName = String(tour[10 /* TourIndexes.meals */] || '');
        this.mealDescription = String(tour[36 /* TourIndexes.mealDescription */] || '');
        this.mealIdInSystem = parseInt(String(tour[41 /* TourIndexes.systemMealId */] || ''), 10) || 0;
        this.systemMealId = parseInt(String(tour[41 /* TourIndexes.systemMealId */] || ''), 10) || 0;
        this.mealNameOriginal = String(tour[51 /* TourIndexes.originalMealName */] || '');
        this.accommodationDescription = String(tour[37 /* TourIndexes.accommodationDescription */] || '');
        this.accommodationIdInSystem = parseInt(String(tour[39 /* TourIndexes.systemAccommodationId */] || ''), 10) || 0;
        this.systemAccommodationId = parseInt(String(tour[39 /* TourIndexes.systemAccommodationId */] || ''), 10) || 0;
        this.accommodationNameOriginal = String(tour[52 /* TourIndexes.originalAccommodationName */] || '');
        this.accommodation = String(tour[11 /* TourIndexes.accommodation */] || '');
        this.tripAdvisorHotelRating = tour[89 /* TourIndexes.tripAdvisorHotelRating */];
        this.tripAdvisorNumberOfHotelRated = tour[90 /* TourIndexes.tripAdvisorNumberOfHotelRated */];
        // Присваиваются в getGetToursResponseData
        this.popularityLevel = types_1.HotelPopularity.NotPopular;
        this.searchesPerMonth = 0;
        this.phone = String(tour[92 /* TourIndexes.hotelPhone */] || '');
    }
    return Hotel;
}());
exports.Hotel = Hotel;
var Operator = /** @class */ (function () {
    function Operator(tour) {
        this.name = String(tour[18 /* TourIndexes.operatorName */] || '');
        this.link = String(tour[20 /* TourIndexes.operatorLink */] || '');
        this.logoLink = String(tour[34 /* TourIndexes.operatorLogo */] || '');
        this.cabinetLink = String(tour[47 /* TourIndexes.cabinetURL */] || '');
        this.actionType = tour[82 /* TourIndexes.tourOperatorActionType */];
    }
    return Operator;
}());
exports.Operator = Operator;
var Resort = /** @class */ (function () {
    function Resort(tour) {
        this.id = parseInt(String(tour[5 /* TourIndexes.resortId */] || ''), 10) || 0;
        this.link = String(tour[4 /* TourIndexes.resortLink */] || '');
        this.name = String(tour[19 /* TourIndexes.resortName */] || '');
        this.nameOriginal = String(tour[50 /* TourIndexes.originalResortName */] || '');
    }
    return Resort;
}());
exports.Resort = Resort;
/**
 * Наличие мест в отеле
 */
var HotelPlacesAvailability;
(function (HotelPlacesAvailability) {
    /**
     * Места есть (0)
     */
    HotelPlacesAvailability[HotelPlacesAvailability["InStock"] = 0] = "InStock";
    /**
     * Мест нет (1)
     */
    HotelPlacesAvailability[HotelPlacesAvailability["OutOfStock"] = 1] = "OutOfStock";
    /**
     * Нет данных, нужно запросить (2)
     */
    HotelPlacesAvailability[HotelPlacesAvailability["NoSuchData"] = 2] = "NoSuchData";
})(HotelPlacesAvailability = exports.HotelPlacesAvailability || (exports.HotelPlacesAvailability = {}));
var SeatsInfo;
(function (SeatsInfo) {
    /**
     * Нет данных, о точном количестве билетов. Однако точно ясно что их мало
     */
    SeatsInfo[SeatsInfo["NoSuchData"] = -1] = "NoSuchData";
    /**
     * Билетов много
     */
    SeatsInfo[SeatsInfo["Many"] = -2] = "Many";
})(SeatsInfo = exports.SeatsInfo || (exports.SeatsInfo = {}));
var FlightInfo = /** @class */ (function () {
    function FlightInfo(tour) {
        this.economyTicketsTo = parseInt(String(tour[23 /* TourIndexes.economyTicketsTo */] || ''), 10) || 0;
        this.economyTicketsBack = parseInt(String(tour[24 /* TourIndexes.economyTicketsBack */] || ''), 10) || 0;
        this.ticketBusinessTo = parseInt(String(tour[25 /* TourIndexes.ticketBusinessTo */] || ''), 10) || 0;
        this.ticketBusinessBack = parseInt(String(tour[26 /* TourIndexes.ticketBusinessBack */] || ''), 10) || 0;
        // Если билетов много(много или мало проверяется на сервере) то в ответе -1 или число, иначе в ответе пустая строка
        this.economySeatsTo = parseInt(String(tour[55 /* TourIndexes.economySeatsTo */] || '-2'), 10);
        this.economySeatsBack = parseInt(String(tour[56 /* TourIndexes.economySeatsBack */] || '-2'), 10);
        this.businessSeatsTo = parseInt(String(tour[57 /* TourIndexes.businessSeatsTo */] || '-2'), 10);
        this.businessSeatsBack = parseInt(String(tour[58 /* TourIndexes.businessSeatsBack */] || '-2'), 10);
        this.ticketsInPrice = parseInt(String(tour[22 /* TourIndexes.ticketInPrice */]), 10) !== 0;
    }
    return FlightInfo;
}());
exports.FlightInfo = FlightInfo;
/**
 * Оболочка над туром, массив которых возвращает getTours
 */
var Tour = /** @class */ (function () {
    function Tour(tour, requestId) {
        this.hotel = new Hotel(tour);
        this.resort = new Resort(tour);
        this.operator = new Operator(tour);
        this.flightInfo = new FlightInfo(tour);
        this.requestId = parseInt(String(requestId || ''), 10) || 0;
        this.offerId = parseInt(String(tour[0 /* TourIndexes.offerId */] || ''), 10) || 0;
        this.sourceId = parseInt(String(tour[1 /* TourIndexes.sourceId */] || ''), 10) || 0;
        this.tourName = String(tour[6 /* TourIndexes.tourName */] || '');
        this.departDate = String(tour[12 /* TourIndexes.departDate */] || '');
        this.arrivalDate = String(tour[13 /* TourIndexes.arrivalDate */] || '');
        this.nightCount = parseInt(String(tour[14 /* TourIndexes.nightsCount */] || ''), 10) || 0;
        this.nightsCount = parseInt(String(tour[14 /* TourIndexes.nightsCount */] || ''), 10) || 0;
        this.priceWithCurrency = String(tour[15 /* TourIndexes.priceWithCurrency */] || '');
        this.adultCount = parseInt(String(tour[16 /* TourIndexes.adultCount */] || ''), 10) || 0;
        this.kidsCount = parseInt(String(tour[17 /* TourIndexes.kidsCount */] || ''), 10) || 0;
        this.ticketInPrice = parseInt(String(tour[22 /* TourIndexes.ticketInPrice */]), 10) !== 0;
        this.dateOfEntranceToHotel = String(tour[27 /* TourIndexes.dateOfEntranceToHotel */] || '');
        this.dateOfCheckOut = String(tour[28 /* TourIndexes.dateOfCheckOut */] || '');
        this.countryId = parseInt(String(tour[30 /* TourIndexes.countryId */] || ''), 10) || 0;
        this.countryName = String(tour[31 /* TourIndexes.countryName */] || '');
        this.cityId = parseInt(String(tour[32 /* TourIndexes.cityId */] || ''), 10) || 0;
        this.cityName = String(tour[33 /* TourIndexes.cityName */] || '');
        this.isDemo = !!tour[40 /* TourIndexes.isDemo */];
        this.price = parseFloat(String(tour[42 /* TourIndexes.price */] || '')) || 0;
        this.fullPrice = parseFloat(String(tour[88 /* TourIndexes.fullPrice */] || '')) || 0;
        this.currency = String(tour[43 /* TourIndexes.currency */] || '');
        this.tourNameOriginal = String(tour[48 /* TourIndexes.originalTourName */] || '');
        this.isWithTheObligations = !!tour[59 /* TourIndexes.isWithTheObligations */];
        this.priceHash = String(tour[68 /* TourIndexes.priceHash */] || '');
        this.tourHash = String(tour[79 /* TourIndexes.tourHash */] || '');
        this.foundedMinutesAgo = parseInt(String(tour[81 /* TourIndexes.foundedMinutesAgo */] || ''), 10) || 0;
        this.hostTourOperatorName = tour[85 /* TourIndexes.hostTourOperatorName */];
        this.isHotelInStop = !!tour[21 /* TourIndexes.hotelInStop */];
        this.isHotelInStopOriginalFlag = parseInt(String(tour[21 /* TourIndexes.hotelIsInStopOriginalFlag */] || '2'), 10);
        this.isHotelInStopExtendedInfo = parseInt(String(tour[21 /* TourIndexes.hotelIsInStopOriginalFlag */] || '2'), 10);
        this.hotelPlacesAvailability = parseInt(String(tour[21 /* TourIndexes.hotelIsInStopOriginalFlag */] || '2'), 10);
    }
    return Tour;
}());
exports.Tour = Tour;
