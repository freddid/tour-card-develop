"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapResponse = void 0;
function wrapCity(unwrappedCity) {
    return {
        id: unwrappedCity.Id,
        name: unwrappedCity.Name,
        originalName: unwrappedCity.OriginalName,
        countryId: unwrappedCity.CountryId,
        isDefault: unwrappedCity.Default,
        isPopular: unwrappedCity.IsPopular,
        descriptionUrl: unwrappedCity.DescriptionUrl,
        parentId: unwrappedCity.ParentId
    };
}
function wrapResponse(response) {
    return {
        cities: response.Data.map(wrapCity)
    };
}
exports.wrapResponse = wrapResponse;
