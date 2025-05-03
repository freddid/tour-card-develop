"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOfficesResponse = void 0;
var tslib_1 = require("tslib");
var map_1 = tslib_1.__importDefault(require("lodash/map"));
function getOfficesResponse(data) {
    var cities = getCities(data);
    return {
        cities: cities,
        offices: (0, map_1.default)(data, getOfficeHandler(cities))
    };
}
exports.getOfficesResponse = getOfficesResponse;
function getOfficeHandler(cities) {
    return function getOffice(params) {
        return {
            id: params.Id,
            address: params.Addres,
            city: getCity(cities, params),
            emails: params.Emails,
            phones: params.Phones,
            subway: getSubway(params),
            description: params.Description
        };
    };
}
function getCities(params) {
    return params.reduce(function (acc, office, index) {
        if (!hasCity(acc, office.City)) {
            acc.push({
                name: office.City,
                id: index
            });
        }
        return acc;
    }, []);
}
function hasCity(cities, cityName) {
    return cities.filter(function (city) { return city.name.toLowerCase() === cityName.toLowerCase(); }).length > 0;
}
function getCity(cities, office) {
    return cities.filter(function (value) { return value.name.toLowerCase() === office.City.toLowerCase(); })[0];
}
function getSubway(office) {
    if (office.Subway && office.SubwayId !== 0 && office.SubwayLineId !== 0) {
        return {
            id: office.SubwayId,
            name: office.Subway,
            lineId: office.SubwayLineId
        };
    }
    return null;
}
