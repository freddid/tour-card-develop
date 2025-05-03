"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = void 0;
var tours_1 = require("./tours");
var Operator = /** @class */ (function () {
    function Operator(tour) {
        this.name = String(tour[tours_1.TourIndexes.operatorName] || '');
        this.link = String(tour[tours_1.TourIndexes.operatorLink] || '');
        this.logoLink = String(tour[tours_1.TourIndexes.operatorLogo] || '');
        this.cabinetLink = String(tour[tours_1.TourIndexes.cabinetURL] || '');
        this.actionType = tour[tours_1.TourIndexes.tourOperatorActionType];
    }
    return Operator;
}());
exports.Operator = Operator;
