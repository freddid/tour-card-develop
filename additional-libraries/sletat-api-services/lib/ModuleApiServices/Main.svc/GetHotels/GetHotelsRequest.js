"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGetHotelsRequestData = void 0;
function getGetHotelsRequestData(data) {
    return {
        countryId: data.countryId,
        towns: (data.resortsIds || []).join(','),
        stars: (data.hotelCategoryIds || []).join(','),
        all: String(data.all),
        id: data.id,
        page: data.pageNumber,
        pageSize: data.pageSize,
        filter: data.filter,
        useTree: undefined
    };
}
exports.getGetHotelsRequestData = getGetHotelsRequestData;
