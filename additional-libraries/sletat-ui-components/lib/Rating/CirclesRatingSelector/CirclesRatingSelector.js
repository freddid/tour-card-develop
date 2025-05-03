Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = require("react");
/* tslint:enable:no-unused-variable */
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
function CirclesRatingSelector(props) {
    var range = lodash_2.rangeRight(1, (props.maxValue || 10) + 1);
    var currentValue = props.currentValue || 5;
    return (React.createElement("ul", { className: "rating-circle" }, lodash_1.map(range, function (value) {
        var classes = ['rating-circle__item'];
        if (currentValue === value) {
            classes.push('rating-circle__item_selected');
        }
        return (React.createElement("li", { className: classes.join(' '), key: value },
            React.createElement("span", { className: "rating-circle__num", onClick: function () { return props.onChange(value); } }, value)));
    })));
}
exports.CirclesRatingSelector = CirclesRatingSelector;
