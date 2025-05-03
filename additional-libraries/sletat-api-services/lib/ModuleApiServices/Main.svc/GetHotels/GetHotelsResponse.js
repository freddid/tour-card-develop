"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = exports.getGetHotelsResponseData = void 0;
function getGetHotelsResponseData(data) {
    return {
        hotels: data.map(function (hotel) { return new Hotel(hotel); })
    };
}
exports.getGetHotelsResponseData = getGetHotelsResponseData;
var Hotel = /** @class */ (function () {
    function Hotel(data) {
        this.id = data.Id;
        this.name = data.Name;
        this.photosCount = data.PhotosCount;
        this.rate = data.Rate;
        this.categoryId = data.StarId;
        this.resortId = data.TownId;
        this.starName = data.StarName;
        this.beachLineNumber = data.BeachLineId;
        this.popularityLevel = data.PopularityLevel;
        this.searchesPerMonth = data.SearchCount;
    }
    return Hotel;
}());
exports.Hotel = Hotel;
