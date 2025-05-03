"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddLargeCommentRequestData = void 0;
function getAddLargeCommentRequestData(data) {
    return {
        hotelId: data.hotelId,
        commentData: getOriginalCommentData(data.commentData),
        target: data.target
    };
}
exports.getAddLargeCommentRequestData = getAddLargeCommentRequestData;
function getOriginalCommentData(data) {
    var result = {
        Rate: data.rate,
        TouristName: data.touristName
    };
    if (data.positiveReview) {
        result.Positive = data.positiveReview;
    }
    if (data.negativeReview) {
        result.Negative = data.negativeReview;
    }
    if (data.restStartDate) {
        result.StartRest = getDateString(data.restStartDate);
    }
    if (data.restEndDate) {
        result.EndRest = getDateString(data.restEndDate);
    }
    if (data.cityName) {
        result.CityName = data.cityName;
    }
    return result;
}
function getDateString(date) {
    return "".concat(date.getDate(), ".").concat(date.getMonth() + 1, ".").concat(date.getFullYear());
}
