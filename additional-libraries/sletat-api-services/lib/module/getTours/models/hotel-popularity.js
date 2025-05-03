"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapHotelPopularities = exports.HotelPopularity = void 0;
var HotelPopularity;
(function (HotelPopularity) {
    HotelPopularity[HotelPopularity["NotPopular"] = 0] = "NotPopular";
    HotelPopularity[HotelPopularity["Popular"] = 1] = "Popular";
    HotelPopularity[HotelPopularity["VeryPopular"] = 2] = "VeryPopular";
})(HotelPopularity = exports.HotelPopularity || (exports.HotelPopularity = {}));
function wrapHotelPopularities(items) {
    return (items || []).reduce(function (dic, item) {
        dic[item.HotelId] = {
            level: item.Level,
            searchCount: item.SearchCount
        };
        return dic;
    }, {});
}
exports.wrapHotelPopularities = wrapHotelPopularities;
