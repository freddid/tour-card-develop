Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = require("react");
/* tslint:enable:no-unused-variable */
var lodash_1 = require("lodash");
var SletatReviewItem_1 = require("./SletatReviewItem");
var BEMClassNames_1 = require("sletat-common-utils/lib/BEM/BEMClassNames");
function HotelReviewList(props) {
    return (React.createElement("div", { className: getHotelReviewListClassName(props.wrapperClass, props.bemModifications) }, lodash_1.map(props.list, function (comment, i) { return React.createElement(SletatReviewItem_1.Review, { key: i + comment.touristName, data: comment }); })));
}
exports.HotelReviewList = HotelReviewList;
function getHotelReviewListClassName(wrapperClass, bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'comments',
        additionalClasses: wrapperClass || "",
        modifications: bemModifications || []
    });
}
