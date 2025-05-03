"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = exports.getGetTourOperatorsResponseData = void 0;
function getGetTourOperatorsResponseData(data) {
    return {
        operators: data.map(function (operator) { return new Operator(operator); })
    };
}
exports.getGetTourOperatorsResponseData = getGetTourOperatorsResponseData;
var Operator = /** @class */ (function () {
    function Operator(data) {
        this.id = data.Id;
        this.name = data.Name;
        this.isEnabled = data.Enabled;
    }
    return Operator;
}());
exports.Operator = Operator;
