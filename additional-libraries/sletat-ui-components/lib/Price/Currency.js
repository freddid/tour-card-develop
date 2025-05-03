Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable-next-line:no-unused-variable */
var React = require("react");
var utils_1 = require("./utils");
function Currency(props) {
    return (React.createElement("span", { className: props.currency === 'RUB' ? 'b-rub' : '' }, utils_1.getCurrencySymbol(props.currency)));
}
exports.Currency = Currency;
