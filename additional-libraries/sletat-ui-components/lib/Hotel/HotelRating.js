Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var BEMClassNames_1 = require("sletat-common-utils/lib/BEM/BEMClassNames");
/**
* Функция для округления
* (6.12) => 6.1; (6.98) => 7; (7.2) => 7.2
*/
function getRoundedNumber(rating) {
    return Math.round(rating * 10) / 10;
}
/**
* Рейтинга отеля (цифра + мордашка)
 * @deprecated Нужно исользовать компонет /Rating/SmileRating
*/
function HotelRating(_a) {
    var rating = _a.rating, _b = _a.prefix, prefix = _b === void 0 ? 'hotel-rating-number' : _b;
    var roundedRating = getRoundedNumber(rating);
    return (React.createElement("span", { className: BEMClassNames_1.GetBEMClassNames({
            prefix: prefix, modifications: [{
                    'good': (roundedRating > 6.5),
                    'average': (roundedRating >= 3 && roundedRating <= 6.5),
                    'bad': (roundedRating < 3)
                }]
        }) }, roundedRating));
}
exports.HotelRating = HotelRating;
