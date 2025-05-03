"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGetCountriesListResponseData = void 0;
function getGetCountriesListResponseData(data) {
    return {
        countries: data.map(function (country) { return ({
            countryId: country.CountryId,
            countryName: country.CountryName,
            countryDescription: country.CountryDescription,
            minTourPrice: country.LowTourPrice,
            toursCount: country.ToursCount,
            resorts: country.Resorts.map(function (resort) { return ({
                avgTemperature: parseInt(resort.AvgTemperature.toFixed(0), 10),
                resortId: resort.ResortId,
                resortName: resort.ResortName
            }); })
        }); })
    };
}
exports.getGetCountriesListResponseData = getGetCountriesListResponseData;
