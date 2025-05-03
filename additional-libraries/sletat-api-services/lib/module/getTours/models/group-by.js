"use strict";
// Сначала уточним, что такое страница .
// То есть в целом тут все стандартно: страница - это набор объектов, которые метод GetTours возвращает в ответе. Номер и размер страницы передаются при вызове метода - это параметры pageNumber и pageSize соответственно.
// Однако при вызове метода GetTours можно запросить результат с группировкой по отелям или без группировки. Дальше я буду говорить о
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupBy = void 0;
// странице туров - когда данные запрашиваются без группировки и метод возвращает просто pageSize туров (либо меньше, если страница последняя/не существует)
// странице отелей - когда возвращаются все туры в pageSize отелей. Очевидно, что туров на странице отелей может быть гораздо больше, чем pageSize.
/**
 * Группировка туров
 */
var GroupBy;
(function (GroupBy) {
    /**
     * Страница отелей без дополнительной сортировки
     */
    GroupBy[GroupBy["Hotel"] = 'hotel'] = "Hotel";
    /**
     * Вернуть страницу туров, причем туры сортируются по возрастанию даты заезда,
     * а в рамках одной даты - по возрастанию цены
     */
    GroupBy[GroupBy["CheckInAndPrice"] = 'so_checkin_price'] = "CheckInAndPrice";
    /**
     * Рекламные туры
     */
    GroupBy[GroupBy["SpecialHotels"] = 'special_hotels'] = "SpecialHotels";
    /**
     * Минимальная стоимость тура в отеле
     */
    GroupBy[GroupBy["MinHotelPrice"] = 'ht_minhotelprices'] = "MinHotelPrice";
    /**
     * Вернуть страницу отелей, причем отели сортируются по возрастанию минимальной цены тура в отель.
     * Не учитывает параметр hotels
     */
    GroupBy[GroupBy["SortedHotels"] = 'sortedHotels'] = "SortedHotels";
    /**
     * Вернуть страницу туров, причем туры сортируются по возрастанию цены
     */
    GroupBy[GroupBy["SortByPrice"] = 'so_price'] = "SortByPrice";
    /**
     * Вернуть страницу отелей, причем отели сортируются по возрастанию минимальной цены тура в отель.
     * Учитывает параметр hotels - список конкретных отелей,- если его передать в метод
     * Включая неслинкованые.
     * Предполагается использовать этот метод при группировке по отелю
     */
    GroupBy[GroupBy["AllSortedHotels"] = 'all_sortedHotels'] = "AllSortedHotels";
    /**
     * Вернуть страницу отелей, причем отели сортируются по убыванию популярности отеля
     */
    GroupBy[GroupBy["HotelPopularity"] = 'hotelsPopularity'] = "HotelPopularity";
    /**
     * Вернуть страницу отелей, причем отели сортируются по убыванию минимальной цены тура в отель.
     * Учитывает параметр hotels - список конкретных отелей,- если его передать в метод.
     * */
    GroupBy[GroupBy["AllSortedHotelsDesc"] = 'all_sortedHotelsDesc'] = "AllSortedHotelsDesc";
    /**
     * Вернуть страницу отелей, причем отели сортируются по убыванию рейтинга отеля
     */
    GroupBy[GroupBy["HotelRatingDesc"] = 'hotelsRatingDesc'] = "HotelRatingDesc";
})(GroupBy = exports.GroupBy || (exports.GroupBy = {}));
