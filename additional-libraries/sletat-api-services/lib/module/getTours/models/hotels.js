"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = exports.wrapHotelTags = void 0;
var tours_1 = require("./tours");
var hotel_popularity_1 = require("./hotel-popularity");
function wrapHotelTags(tags) {
    return tags.map(function (tag) { return ({
        id: tag.Id,
        name: tag.Name
    }); });
}
exports.wrapHotelTags = wrapHotelTags;
var Hotel = /** @class */ (function () {
    function Hotel(tour) {
        this.link = String(tour[tours_1.TourIndexes.hotelLink] || '');
        this.id = parseInt(String(tour[tours_1.TourIndexes.hotelId] || ''), 10) || 0;
        this.isLinked = this.id !== 0;
        // Если находим в конце строки число и звездочку, то удаляем, т.к. вывод звездочек есть отдельно.
        this.name = String(tour[tours_1.TourIndexes.hotelName] || '').replace(/\s*\d?\d?\s*\*\s*$/, '');
        // Удаляем протокол, т.к. может быть потребность в https, а сервис отдает только http.
        this.photoUrl = String(tour[tours_1.TourIndexes.hotelPhoto] || '').replace(/^https?:/, '');
        this.rating = parseFloat(String(tour[tours_1.TourIndexes.hotelRating] || '')) || 0;
        this.description = String(tour[tours_1.TourIndexes.hotelDescription] || '');
        this.photoCount = parseInt(String(tour[tours_1.TourIndexes.hotelPhotoCount] || ''), 10) || 0;
        this.countOfHotelRooms = parseInt(String(tour[tours_1.TourIndexes.countOfHotelRooms] || ''), 10) || 0;
        this.systemHotelTypeId = parseInt(String(tour[tours_1.TourIndexes.systemHotelCategoryId] || ''), 10) || 0;
        this.systemHotelCategoryId = parseInt(String(tour[tours_1.TourIndexes.systemHotelCategoryId] || ''), 10) || 0;
        this.starsName = tour[tours_1.TourIndexes.starsName] !== 'unknown' ? String(tour[tours_1.TourIndexes.starsName] || '') : '';
        this.starsNameOriginal =
            tour[tours_1.TourIndexes.originalStarName] !== 'unknown' ? String(tour[tours_1.TourIndexes.originalStarName] || '') : '';
        this.beachLineNumber = parseInt(String(tour[tours_1.TourIndexes.beachLineNumber] || ''), 10) || 0;
        this.roomType = String(tour[tours_1.TourIndexes.room] || '');
        this.roomTypeIdInSystem = parseInt(String(tour[tours_1.TourIndexes.systemTypeOfHotelRoomId] || ''), 10) || 0;
        this.systemRoomTypeId = parseInt(String(tour[tours_1.TourIndexes.systemTypeOfHotelRoomId] || ''), 10) || 0;
        this.roomTypeOriginal = String(tour[tours_1.TourIndexes.originalTypeOfRoom] || '');
        this.mealName = String(tour[tours_1.TourIndexes.meals] || '');
        this.mealDescription = String(tour[tours_1.TourIndexes.mealDescription] || '');
        this.mealIdInSystem = parseInt(String(tour[tours_1.TourIndexes.systemMealId] || ''), 10) || 0;
        this.systemMealId = parseInt(String(tour[tours_1.TourIndexes.systemMealId] || ''), 10) || 0;
        this.mealNameOriginal = String(tour[tours_1.TourIndexes.originalMealName] || '');
        this.accommodationDescription = String(tour[tours_1.TourIndexes.accommodationDescription] || '');
        this.accommodationIdInSystem = parseInt(String(tour[tours_1.TourIndexes.systemAccommodationId] || ''), 10) || 0;
        this.systemAccommodationId = parseInt(String(tour[tours_1.TourIndexes.systemAccommodationId] || ''), 10) || 0;
        this.accommodationNameOriginal = String(tour[tours_1.TourIndexes.originalAccommodationName] || '');
        this.accommodation = String(tour[tours_1.TourIndexes.accommodation] || '');
        this.tripAdvisorHotelRating = tour[tours_1.TourIndexes.tripAdvisorHotelRating];
        this.tripAdvisorNumberOfHotelRated = tour[tours_1.TourIndexes.tripAdvisorNumberOfHotelRated];
        // Присваиваются в getGetToursResponseData
        this.popularityLevel = hotel_popularity_1.HotelPopularity.NotPopular;
        this.searchesPerMonth = 0;
        this.phone = tour[tours_1.TourIndexes.hotelPhone];
    }
    return Hotel;
}());
exports.Hotel = Hotel;
