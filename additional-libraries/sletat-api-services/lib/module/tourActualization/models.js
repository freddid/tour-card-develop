"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyOnlineAvailabilityStatus = exports.OilTaxIndexes = exports.PromoOfferType = exports.ResourceTypes = exports.TourIndexes = void 0;
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
     * Ссылка на страницу Слетать.ру с редиректом на страницу туроператора для бронирования тура
     */
    TourIndexes[TourIndexes["tourOperatorTourPageUrl"] = 46] = "tourOperatorTourPageUrl";
    /*
     * Обозначение валюты туроператора.
     */
    TourIndexes[TourIndexes["tourOperatorCurrencyId"] = 47] = "tourOperatorCurrencyId";
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
     * SLT-1452
     * Валюта, в которой удалось проактуализировать тур
     */
    TourIndexes[TourIndexes["actualizationCurrencyId"] = 59] = "actualizationCurrencyId";
    /**
     * SLT-2028, SLT-2022: Мало ли билетов эконом класса в ПРЯМОМ направлении
     *
     * Важно: false не означает, что билетов 'много'! Может просто ТО не вернул информацию!
     */
    TourIndexes[TourIndexes["isFewEconomyDepartTickets"] = 60] = "isFewEconomyDepartTickets";
    /**
     * SLT-2028, SLT-2022: Мало ли билетов эконом класса в ОБРАТНОМ направлении
     *
     * Важно: false не означает, что билетов 'много'! Может просто ТО не вернул информацию!
     */
    TourIndexes[TourIndexes["isFewEconomyReturnTickets"] = 61] = "isFewEconomyReturnTickets";
    /**
     * SLT-2028, SLT-2022: Мало ли билетов бизнес класса в ПРЯМОМ направлении
     *
     * Важно: false не означает, что билетов 'много'! Может просто ТО не вернул информацию!
     */
    TourIndexes[TourIndexes["isFewBusinessDepartTickets"] = 62] = "isFewBusinessDepartTickets";
    /**
     * SLT-2028, SLT-2022: Мало ли билетов бизнес класса в ОБРАТНОМ направлении
     *
     * Важно: false не означает, что билетов 'много'! Может просто ТО не вернул информацию!
     */
    TourIndexes[TourIndexes["isFewBusinessReturnTickets"] = 63] = "isFewBusinessReturnTickets";
    /**
     * SLT-2361
     */
    TourIndexes[TourIndexes["originLatArrivalCountryName"] = 64] = "originLatArrivalCountryName";
    /**
     * SLT-2361
     */
    TourIndexes[TourIndexes["originLatDepartCityName"] = 65] = "originLatDepartCityName";
    /**
     * SLT-2490 Алиас на страницу Слетать.ру с описанием туроператора (для формирования полной ссылки)
     */
    TourIndexes[TourIndexes["tourOperatorInfoPageAlias"] = 66] = "tourOperatorInfoPageAlias";
    /**
     * SLT-4509: Битовые флаги тура TourFlags
     */
    TourIndexes[TourIndexes["tourFlag"] = 67] = "tourFlag";
})(TourIndexes = exports.TourIndexes || (exports.TourIndexes = {}));
var ResourceTypes;
(function (ResourceTypes) {
    ResourceTypes[ResourceTypes["medicalInsurance"] = 3] = "medicalInsurance";
    ResourceTypes[ResourceTypes["flightTo"] = 4] = "flightTo";
    ResourceTypes[ResourceTypes["transfer"] = 7] = "transfer";
    ResourceTypes[ResourceTypes["guide"] = 8] = "guide";
    ResourceTypes[ResourceTypes["flightFrom"] = 10] = "flightFrom";
    ResourceTypes[ResourceTypes["visa"] = 11] = "visa";
    ResourceTypes[ResourceTypes["tripCancellationInsurance"] = 12] = "tripCancellationInsurance";
    ResourceTypes[ResourceTypes["transferFlight"] = 15] = "transferFlight";
    ResourceTypes[ResourceTypes["responsibilityOfOperatorInsurance"] = 17] = "responsibilityOfOperatorInsurance";
    ResourceTypes[ResourceTypes["stayInHotel"] = -42] = "stayInHotel";
    ResourceTypes[ResourceTypes["includingFlights"] = -410] = "includingFlights";
})(ResourceTypes = exports.ResourceTypes || (exports.ResourceTypes = {}));
var PromoOfferType;
(function (PromoOfferType) {
    PromoOfferType[PromoOfferType["TourOperators"] = 0] = "TourOperators";
    PromoOfferType[PromoOfferType["Hotelier"] = 1] = "Hotelier";
    PromoOfferType[PromoOfferType["OtherPartner"] = 2] = "OtherPartner";
})(PromoOfferType = exports.PromoOfferType || (exports.PromoOfferType = {}));
var OilTaxIndexes;
(function (OilTaxIndexes) {
    OilTaxIndexes[OilTaxIndexes["price"] = 0] = "price";
    OilTaxIndexes[OilTaxIndexes["currency"] = 1] = "currency";
    OilTaxIndexes[OilTaxIndexes["airline"] = 2] = "airline";
    OilTaxIndexes[OilTaxIndexes["sourceName"] = 3] = "sourceName";
    OilTaxIndexes[OilTaxIndexes["resortName"] = 4] = "resortName";
    OilTaxIndexes[OilTaxIndexes["periodStartDate"] = 5] = "periodStartDate";
    OilTaxIndexes[OilTaxIndexes["periodEndDate"] = 6] = "periodEndDate";
    OilTaxIndexes[OilTaxIndexes["hostName"] = 7] = "hostName";
    OilTaxIndexes[OilTaxIndexes["resortIATA"] = 8] = "resortIATA";
    OilTaxIndexes[OilTaxIndexes["flightNumber"] = 9] = "flightNumber";
    OilTaxIndexes[OilTaxIndexes["townFromId"] = 10] = "townFromId";
    OilTaxIndexes[OilTaxIndexes["ageFrom"] = 11] = "ageFrom";
    OilTaxIndexes[OilTaxIndexes["ageTo"] = 12] = "ageTo";
})(OilTaxIndexes = exports.OilTaxIndexes || (exports.OilTaxIndexes = {}));
var BuyOnlineAvailabilityStatus;
(function (BuyOnlineAvailabilityStatus) {
    /**
     * Доступна опалта без дополнительных условия
     */
    BuyOnlineAvailabilityStatus[BuyOnlineAvailabilityStatus["available"] = 1] = "available";
    /**
     * Оплата доступна, но турист должен поторопиться, так как до вылета меньше суток.
     */
    BuyOnlineAvailabilityStatus[BuyOnlineAvailabilityStatus["availableWhenLessThanOneDayBeforeDeparture"] = 2] = "availableWhenLessThanOneDayBeforeDeparture";
    /**
     * Оператор не поддерживает онлайн оплату
     */
    BuyOnlineAvailabilityStatus[BuyOnlineAvailabilityStatus["operatorDoesntSupportOnlinePayment"] = 3] = "operatorDoesntSupportOnlinePayment";
    /**
     * Тур продан. Или нет перелётов(при этом ticketIncluded= true) или отеля (при этом hasTicket= true)
     */
    BuyOnlineAvailabilityStatus[BuyOnlineAvailabilityStatus["tourSold"] = 4] = "tourSold";
    /**
     * Неподдерживаемая для онлайн оплаты основная валюта тура
     */
    BuyOnlineAvailabilityStatus[BuyOnlineAvailabilityStatus["incorrectCurrency"] = 5] = "incorrectCurrency";
    /**
     * До отправления меньше 24 ч
     */
    BuyOnlineAvailabilityStatus[BuyOnlineAvailabilityStatus["lessThanOneDayBeforeDeparture"] = 6] = "lessThanOneDayBeforeDeparture";
    /**
     * Тур не найден
     */
    BuyOnlineAvailabilityStatus[BuyOnlineAvailabilityStatus["tourNotFound"] = 7] = "tourNotFound";
    /**
     * Проблема с данными в туре
     */
    BuyOnlineAvailabilityStatus[BuyOnlineAvailabilityStatus["internalProblem"] = 8] = "internalProblem";
})(BuyOnlineAvailabilityStatus = exports.BuyOnlineAvailabilityStatus || (exports.BuyOnlineAvailabilityStatus = {}));
