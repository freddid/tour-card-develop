"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resort = exports.getGetCitiesResponseData = void 0;
function getGetCitiesResponseData(data) {
    return {
        resorts: data.map(function (resort) { return new Resort(resort); })
    };
}
exports.getGetCitiesResponseData = getGetCitiesResponseData;
var Resort = /** @class */ (function () {
    function Resort(data) {
        this.id = data.Id;
        this.name = data.Name;
        this.default = data.Default;
        this.descriptionUrl = data.DescriptionUrl;
        this.isPopular = data.IsPopular;
        this.parentId = data.ParentId;
        this.countryId = data.CountryId;
    }
    return Resort;
}());
exports.Resort = Resort;
