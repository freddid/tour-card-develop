"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapResponse = void 0;
function wrapDepartCities(unwrappedDepartCities) {
    return unwrappedDepartCities.map(function (departCity) { return ({
        id: departCity.Id,
        countryId: departCity.CountryId,
        name: departCity.Name,
        isDefault: departCity.Default,
        isPopular: departCity.IsPopular,
        descriptionUrl: departCity.DescriptionUrl,
        parentId: departCity.ParentId
    }); });
}
function wrapResponse(response) {
    return {
        departCities: wrapDepartCities(response.Data)
    };
}
exports.wrapResponse = wrapResponse;
