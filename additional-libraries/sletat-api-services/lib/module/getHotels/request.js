"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRequestParams = void 0;
function wrapRequestParams(params) {
    return {
        countryId: params.countryId,
        towns: (params.towns || []).join(','),
        stars: (params.stars || []).join(','),
        all: params.all ? 1 : -1,
        features: (params.selectedFeatures || []).join(','),
    };
}
exports.wrapRequestParams = wrapRequestParams;
