Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = require("react");
var utils_1 = require("./utils");
var Price_1 = require("./Price");
function PriceBlock(props) {
    var getLabel = function () {
        if (props.isOnlyHotel)
            return 'за отель';
        return 'за тур';
    };
    return (React.createElement("div", { className: "tour-price-block" },
        React.createElement("p", { className: "tour-price-block__detail" },
            React.createElement("span", { className: "tour-price-block__detail-title" },
                "\u0426\u0435\u043D\u0430 ",
                React.createElement("b", null,
                    getLabel(),
                    "\u00A0: ")),
            ' ',
            React.createElement("span", { className: "tour-price-block__detail-price-block" },
                !!props.useFakeDiscount && props.fakeDiscount ?
                    React.createElement("span", { className: "tour-price-block__old-price" },
                        React.createElement(Price_1.Price, { price: utils_1.getPriceBeforeDiscount(props.price, props.fakeDiscount), currency: props.currency }),
                        React.createElement("span", { className: "tour-price-block__sale" },
                            utils_1.formatDiscount(props.fakeDiscount),
                            "%"))
                    : null,
                React.createElement("b", { className: "tour-price-block__detail-price" },
                    React.createElement(Price_1.Price, { price: props.price, currency: props.currency })))),
        !!props.usePricePerson ?
            React.createElement("p", { className: "tour-price-block__main" },
                React.createElement("span", { className: "tour-price-block__main-title" },
                    "\u0426\u0435\u043D\u0430 ",
                    React.createElement("b", null, "\u0437\u0430 1 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430: ")),
                React.createElement("span", { className: "tour-price-block__main-price-block" },
                    React.createElement("b", { className: "tour-price-block__main-price" },
                        React.createElement(Price_1.Price, { price: Math.round(props.price / (props.adults + (props.kids || 0))), currency: props.currency }))))
            : ''));
}
exports.PriceBlock = PriceBlock;
