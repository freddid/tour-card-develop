"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelStar = exports.getGetHotelStarsResponseData = void 0;
function getGetHotelStarsResponseData(data) {
    return {
        hotelStars: data.map(function (star) { return new HotelStar(star); })
    };
}
exports.getGetHotelStarsResponseData = getGetHotelStarsResponseData;
var HotelStar = /** @class */ (function () {
    function HotelStar(data) {
        this.id = data.Id;
        this.name = data.Name;
    }
    return HotelStar;
}());
exports.HotelStar = HotelStar;
