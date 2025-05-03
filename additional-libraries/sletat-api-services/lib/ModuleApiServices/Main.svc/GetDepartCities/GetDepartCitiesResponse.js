"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartCity = exports.getGetDepartCitiesResponseData = void 0;
function getGetDepartCitiesResponseData(data) {
    return {
        departCities: data.map(function (city) { return new DepartCity(city); })
    };
}
exports.getGetDepartCitiesResponseData = getGetDepartCitiesResponseData;
var DepartCity = /** @class */ (function () {
    function DepartCity(data) {
        this.id = data.Id;
        this.name = data.Name;
        this.default = data.Default;
        this.descriptionUrl = data.DescriptionUrl;
        this.isPopular = data.IsPopular;
        this.parentId = data.ParentId;
        this.countryId = data.CountryId;
    }
    return DepartCity;
}());
exports.DepartCity = DepartCity;
