"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapHotel = void 0;
function wrapHotel(hotel) {
    return {
        id: hotel.Id,
        beachLineId: hotel.BeachLineId,
        commonRate: hotel.CommonRate,
        isInBonusProgram: hotel.IsInBonusProgram,
        name: hotel.Name,
        originalName: hotel.OriginalName,
        photosCount: hotel.PhotosCount,
        popularityLevel: hotel.PopularityLevel,
        rate: hotel.Rate,
        searchCount: hotel.SearchCount,
        starId: hotel.StarId,
        starName: hotel.StarName,
        townId: hotel.TownId
    };
}
exports.wrapHotel = wrapHotel;
