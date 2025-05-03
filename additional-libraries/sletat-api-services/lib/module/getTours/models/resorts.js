"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resort = void 0;
var tours_1 = require("./tours");
var Resort = /** @class */ (function () {
    function Resort(tour) {
        this.id = parseInt(String(tour[tours_1.TourIndexes.resortId] || ''), 10) || 0;
        this.link = String(tour[tours_1.TourIndexes.resortLink] || '');
        this.name = String(tour[tours_1.TourIndexes.resortName] || '');
        this.nameOriginal = String(tour[tours_1.TourIndexes.originalResortName] || '');
    }
    return Resort;
}());
exports.Resort = Resort;
