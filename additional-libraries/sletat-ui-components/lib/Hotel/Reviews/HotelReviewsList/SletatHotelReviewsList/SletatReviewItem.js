Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = require("react");
var LineRating_1 = require("../../../../Rating/LineRating");
var BEMClassNames_1 = require("sletat-common-utils/lib/BEM/BEMClassNames");
var ReviewItemCommentWithToggler_1 = require("../ReviewItemCommentWithToggler");
function Review(_a) {
    var _b = _a.data, rate = _b.rate, touristName = _b.touristName, positiveReview = _b.positiveReview, restStartDate = _b.restStartDate, restEndDate = _b.restEndDate, negativeReview = _b.negativeReview, _c = _a.bemModifications, bemModifications = _c === void 0 ? [] : _c;
    return (React.createElement("div", { className: getHotelReviewListItemClassName(bemModifications) },
        React.createElement(LineRating_1.LineRating, { value: rate, maxValue: 10, wrapperClass: getHotelReviewListItemRatingClassName(bemModifications) }),
        React.createElement("p", { className: getHotelReviewListItemTitleClassName(bemModifications) },
            React.createElement("b", null, touristName),
            restStartDate || restEndDate ?
                ", \u0431\u044B\u043B(\u0430) \u0432 \u043E\u0442\u0435\u043B\u0435: " + getDateOfRest(restStartDate, restEndDate)
                : null),
        positiveReview ?
            React.createElement(ReviewItemCommentWithToggler_1.ReviewItemCommentWithToggler, { comment: positiveReview, isPositive: true }) : null,
        negativeReview ?
            React.createElement(ReviewItemCommentWithToggler_1.ReviewItemCommentWithToggler, { comment: negativeReview, isPositive: false }) : null));
}
exports.Review = Review;
function getDateOfRest(start, end) {
    var months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    if (start) {
        return months[start.getMonth()] + " " + start.getFullYear();
    }
    else if (end) {
        return months[end.getMonth()] + " " + end.getFullYear();
    }
    else {
        return null;
    }
}
function getHotelReviewListItemClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'comments__item',
        modifications: bemModifications || []
    });
}
function getHotelReviewListItemRatingClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'comments__rating',
        modifications: bemModifications || []
    });
}
function getHotelReviewListItemTitleClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'comments__title',
        modifications: bemModifications || []
    });
}
