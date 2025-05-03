Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var bemCn = require("bem-cn");
var format_1 = require("sletat-common-utils/lib/format");
var Currency_1 = require("./Currency");
require("./Price.styl");
function Price(props) {
    return (React.createElement("span", null,
        props.currency === 'USD' ?
            React.createElement(Currency_1.Currency, { currency: props.currency })
            : null,
        React.createElement("span", { className: bemCn('price')({ strikethrough: !!props.strikethrough })() }, format_1.numberFormat(props.price) + " "),
        props.currency !== 'USD' ?
            React.createElement(Currency_1.Currency, { currency: props.currency })
            : null));
}
exports.Price = Price;
