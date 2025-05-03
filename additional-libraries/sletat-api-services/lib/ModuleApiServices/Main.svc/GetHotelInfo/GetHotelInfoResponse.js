"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeachLineName = exports.getBeachLineFacility = exports.getBeachLineGroup = exports.getHandlerForGetHotelInfoResponseData = exports.getHotelInfoFromResponseData = void 0;
var getWeatherList = function (data) {
    if (!data || !data.length)
        return [];
    return data.map(function (weather) { return ({
        date: weather.Date,
        temp: weather.Temp,
        weatherCode: weather.WeatherCode
    }); });
};
var getPopularResortsList = function (data) {
    if (!data || !data.length)
        return [];
    return data.map(function (resort) { return ({
        ID: resort.Id,
        name: resort.Name,
        countryID: resort.CountryId,
        isDefault: resort.Default,
        descriptionURL: resort.DescriptionUrl,
        isPopular: resort.IsPopular,
        parentID: resort.ParentId
    }); });
};
var getHotelFacilities = function (data) {
    if (!data || !data.length)
        return [];
    return data.map(function (group) {
        var facilities = group.Facilities.map(function (facility) { return ({
            hit: facility.Hit,
            ID: facility.Id,
            name: facility.Name
        }); });
        return {
            facilities: facilities,
            ID: group.Id,
            name: group.Name
        };
    });
};
var getHotelInfoFromResponseData = function (data, hotelId) {
    return {
        id: hotelId,
        address: data.Address,
        comments: data.Comments,
        countryName: data.Country,
        countryID: data.CountryId,
        currentWeather: getWeatherList(data.CurrentWeather),
        description: data.Description ? parseDescription(data.Description) : null,
        noParseDescription: data.Description,
        hotelAirportDistance: data.HotelAirportDistance,
        hotelEmail: data.HotelEmail,
        hotelFacilities: getHotelFacilities(data.HotelFacilities),
        hotelFax: data.HotelFax,
        hotelPhone: data.HotelPhone,
        hotelPopularityLevel: data.HotelPopularityLevel,
        hotelRate: data.HotelRate,
        hotelRoomsCount: data.HotelRoomsCount,
        hotelSearchCount: data.HotelSearchCount,
        imagesCount: data.ImgCount,
        latitude: data.Latitude,
        longitude: data.Longitude,
        name: data.Name.replace(/\s\d\*/, ''),
        photoURL: data.PhotoUrl.replace(/https?:/, ''),
        popularResorts: getPopularResortsList(data.PopularResorts),
        resortDescription: data.ResortDescription ? parseDescription(data.ResortDescription) : null,
        resortID: data.ResortId,
        resortImageURL: data.ResortImageURL.replace(/https?:/, ''),
        resortName: data.ResortName,
        site: data.Site,
        starID: data.StarId,
        starName: data.StarName,
        tripAdvisorHotelRate: data.TripAdvisorHotelRate,
        tripAdvisorNumberOfRated: data.TripAdvisorNumberOfRated,
        weatherStat: getWeatherList(data.WeatherStat),
        weatherStatMonth: getWeatherList(data.WeatherStatMonth)
    };
};
exports.getHotelInfoFromResponseData = getHotelInfoFromResponseData;
function getHandlerForGetHotelInfoResponseData(request) {
    return function getGetHotelInfoResponseData(data) {
        return {
            hotelInfo: (0, exports.getHotelInfoFromResponseData)(data, request.hotelId)
        };
    };
}
exports.getHandlerForGetHotelInfoResponseData = getHandlerForGetHotelInfoResponseData;
function getBeachLineGroup(hotelFacilities) {
    // Ищем по ID = 6 - пляжная линия.
    return hotelFacilities.filter(function (val) { return val.ID === 6; })[0] || null;
}
exports.getBeachLineGroup = getBeachLineGroup;
function getBeachLineFacility(group) {
    // Пытаемся в этой группе найти пляжную линию.
    return group.facilities.filter(function (val) { return val.name.includes('пляжная линия'); })[0] || null;
}
exports.getBeachLineFacility = getBeachLineFacility;
function getBeachLineName(hotelFacilities) {
    var beachLineGroup = getBeachLineGroup(hotelFacilities);
    var beachLine = beachLineGroup ? getBeachLineFacility(beachLineGroup) : null;
    return beachLine ? beachLine.name : null;
}
exports.getBeachLineName = getBeachLineName;
function parseDescription(raw) {
    // Заменяем &nbsp; на пробелы.
    raw = raw.replace(/\u00a0/g, ' ');
    var description = [];
    if (raw.includes('<p')) {
        var temp = document.createElement('div');
        temp.innerHTML = raw;
        for (var i = 0; i < temp.children.length; i++) {
            var text = temp.children[i].innerText;
            if (text) {
                description.push(text.trim());
            }
        }
    }
    if (raw && description.length === 0) {
        if (raw.includes('\n')) {
            var paragraphs = raw.split('\n\n');
            for (var i = 0; i < paragraphs.length; i++) {
                var value = paragraphs[i];
                value = value
                    .split('\n')
                    .join('<br />')
                    .trim();
                description.push(value);
            }
        }
        else {
            description.push(raw.trim());
        }
    }
    return description.map(function (value) { return "<p>".concat(value, "</p>"); }).join('');
}
