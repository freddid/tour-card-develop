"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsResponse = void 0;
var fromString_1 = require("sletat-common-utils/lib/parse/fromString");
function getCommentsResponse(data) {
    return {
        isCommentsAllowed: data.commentsAllowed,
        commentsCount: data.commentsCount,
        comments: data.data.map(function (comment) { return getHotelComment(comment); }),
        averageRate: data.rate
    };
}
exports.getCommentsResponse = getCommentsResponse;
function getHotelComment(data) {
    return {
        cityName: data.CityName,
        createDate: parseDateOfCreationReview(data.CreateDate),
        restEndDate: data.EndRest ? parseRestDate(data.EndRest) : null,
        negativeReview: data.Negative,
        positiveReview: data.Positive,
        rate: data.Rate,
        restStartDate: data.StartRest ? parseRestDate(data.StartRest) : null,
        touristName: data.TouristName
    };
}
function parseRestDate(value) {
    var parts = value.split('.');
    var day = (0, fromString_1.getIntegerFromString)(parts[0]);
    var month = (0, fromString_1.getIntegerFromString)(parts[1]);
    month = month ? month - 1 : month;
    var year = (0, fromString_1.getIntegerFromString)(parts[2]);
    return new Date(year, month, day);
}
function parseDateOfCreationReview(value) {
    var parts = value.split(' ');
    var day = (0, fromString_1.getIntegerFromString)(parts[0]);
    var month = getMonthByName(parts[1]);
    var year = (0, fromString_1.getIntegerFromString)(parts[2]);
    return new Date(year, month, day);
}
function getMonthByName(value) {
    return {
        января: 0,
        февраля: 1,
        марта: 2,
        апреля: 3,
        мая: 4,
        июня: 5,
        июля: 6,
        августа: 7,
        сентября: 8,
        октября: 9,
        ноября: 10,
        декабря: 11
    }[value];
}
