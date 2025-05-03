Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = require("react");
/* tslint:enable:no-unused-variable */
var BEMClassNames_1 = require("sletat-common-utils/lib/BEM/BEMClassNames");
require("./index.styl");
function LineRating(props) {
    var bemModifications = props.bemModifications || [];
    bemModifications.push("mark-" + countPercent(props.value, props.maxValue));
    var classes = BEMClassNames_1.GetBEMClassNames({
        prefix: 'rating-line',
        modifications: bemModifications,
        additionalClasses: props.wrapperClass || ''
    });
    return (React.createElement("span", { className: classes }, props.value + " \u0438\u0437 " + props.maxValue));
}
exports.LineRating = LineRating;
function countPercent(val, maxVal) {
    return Math.round(((val * 100) / maxVal) / 10);
}
