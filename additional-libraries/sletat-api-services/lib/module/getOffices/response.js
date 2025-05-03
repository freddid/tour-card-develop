"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformResponse = void 0;
function transformResponse(data) {
    var cities = getCities(data);
    return {
        cities: cities,
        offices: data.map(function (office) {
            return {
                id: office.Id,
                address: office.Addres,
                city: getCity(cities, office),
                emails: office.Emails,
                phones: office.Phones,
                subway: getSubway(office),
                description: office.Description
            };
        })
    };
}
exports.transformResponse = transformResponse;
function getCities(offices) {
    return offices.reduce(function (acc, office, index) {
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
    return cities.filter(function (city) { return city.name.toLowerCase() === office.City.toLowerCase(); })[0];
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
