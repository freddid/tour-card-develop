"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsAvailability = exports.HotelInStop = void 0;
var HotelInStop;
(function (HotelInStop) {
    HotelInStop[HotelInStop["hasPlaces"] = 0] = "hasPlaces";
    HotelInStop[HotelInStop["inStop"] = 1] = "inStop";
    HotelInStop[HotelInStop["onRequest"] = 2] = "onRequest";
    HotelInStop[HotelInStop["unknown"] = 3] = "unknown";
})(HotelInStop = exports.HotelInStop || (exports.HotelInStop = {}));
/**
 * Информация о доступности билетов
 */
var TicketsAvailability;
(function (TicketsAvailability) {
    /**
     * Билетов нет (0)
     */
    TicketsAvailability[TicketsAvailability["OutOfStock"] = 0] = "OutOfStock";
    /**
     * Билеты есть (1)
     */
    TicketsAvailability[TicketsAvailability["InStock"] = 1] = "InStock";
    /**
     * Нет данных, нужно запросить (2)
     */
    TicketsAvailability[TicketsAvailability["NoSuchData"] = 2] = "NoSuchData";
})(TicketsAvailability = exports.TicketsAvailability || (exports.TicketsAvailability = {}));
