"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightsParser = void 0;
var tslib_1 = require("tslib");
var date_1 = require("sletat-common-utils/lib/date");
var isInteger_1 = tslib_1.__importDefault(require("lodash/isInteger"));
var sortBy_1 = tslib_1.__importDefault(require("lodash/sortBy"));
var isNumber_1 = require("../../../utils/isNumber");
var isUndefined_1 = require("../../../utils/isUndefined");
var isNull_1 = require("../../../utils/isNull");
var models_1 = require("../../tourActualization/models");
var models_2 = require("../models");
var index_1 = require("./index");
/**
 * по валидности данных от плагинов (PH):
 * 1) PH должны всегда возвращать FLIGHT_ORDER
 * 2) PH должны всегда возврашать groupId (даже для прямых рейсов)
 * - если не будет groupId на основных рейсах (type 4 и type 10), то это сразу NoData. пусть на PH фиксят
 * - если не будет groupId на одном из основных рейсах (type 4 или type 10), то нет рейсов в эту сторону. пусть на PH фиксят
 * - если не будет groupId на одном из рейсов-пересадок (type 15), то NotConcrete
 */
function flightsParser(parsingData, options) {
    var resourceData = parsingData.resourceData || [];
    var resources = parsingData.resources || [];
    var flightResources = resources.filter(function (resource) {
        var isFlightsType = [models_1.ResourceTypes.flightTo, models_1.ResourceTypes.flightFrom, models_1.ResourceTypes.transferFlight].includes(resource.type);
        if (options && options.isMultiFlights) {
            return isFlightsType && (resource.isEnabled || resource.isChecked);
        }
        return isFlightsType && resource.isChecked;
    });
    var transferResources = flightResources.filter(function (r) { return r.type === models_1.ResourceTypes.transferFlight; });
    var flightTo = flightResources.filter(function (r) { return r.type === models_1.ResourceTypes.flightTo; })[0] || null;
    var flightFrom = flightResources.filter(function (r) { return r.type === models_1.ResourceTypes.flightFrom; })[0] || null;
    var notFoundMajorFlights = !flightTo && !flightFrom;
    var notFoundFlightsDetails = !resourceData.length;
    var brokenGroupIdsForMajorFlights = [
        flightTo ? flightTo.groupId : null,
        flightFrom ? flightFrom.groupId : null
    ].every(isNull_1.isNull);
    var shouldGetLastTransferArrivalDateOnly = !options ||
        !!(0, isUndefined_1.isUndefined)(options.shouldGetLastTransferArrivalDateOnly) ||
        options.shouldGetLastTransferArrivalDateOnly;
    if (notFoundMajorFlights || notFoundFlightsDetails || brokenGroupIdsForMajorFlights) {
        return {
            to: [],
            from: [],
            flightsPackageId: null,
            surchargeAmount: 0,
            surchargeCurrencyId: 0,
            surchargeOriginAmount: 0,
            surchargeOriginCurrencyId: 0,
            status: models_2.FlightsStatus.NoData,
            isChecked: false
        };
    }
    if (transferResources.some(function (r) { return !(0, isNumber_1.isNumber)(r.groupId); })) {
        return {
            to: [],
            from: [],
            flightsPackageId: null,
            surchargeAmount: 0,
            surchargeCurrencyId: 0,
            surchargeOriginAmount: 0,
            surchargeOriginCurrencyId: 0,
            status: models_2.FlightsStatus.NotConcrete,
            isChecked: false
        };
    }
    // TODO selkin: нужно убрать старый маппинг, чтобы был один .map
    var mapFlights = function (flights) {
        return flights
            .map(function (flight, index) {
            var flightsChecked = resourceData.filter(function (r) { return r.resourceId === flight.id; });
            var isLast = index === flights.length - 1;
            return {
                timeDeparture: getDepartureTime(flightsChecked),
                timeArrival: getArrivalTime(flightsChecked),
                dateDeparture: getDepartureDate(flightsChecked, parsingData.actualizedTour),
                dateArrival: !shouldGetLastTransferArrivalDateOnly || isLast
                    ? getArrivalDate(flightsChecked, parsingData.actualizedTour)
                    : null,
                cityDeparture: getDepartureCityName(flightsChecked) || '',
                cityArrival: getArrivalCityName(flightsChecked) || '',
                airportCodeDeparture: getDepartureAirportCode(flightsChecked),
                airportCodeArrival: getArrivalAirportCode(flightsChecked),
                airportNameDeparture: getDepartureAirportName(flightsChecked),
                airportNameArrival: getArrivalAirportName(flightsChecked),
                airlaneName: getAirlineName(flightsChecked),
                flightClass: getFlightClass(flightsChecked),
                flightNumber: getFlightNumber(flightsChecked),
                airlaneId: getAirlineId(flightsChecked),
                baggageIncluded: getBaggageIncluded(flightsChecked),
                baggagePlaces: getBaggagePlaces(flightsChecked),
                baggageWeight: getBaggageWeight(flightsChecked),
                baggageSize: getBaggageSize(flightsChecked),
                luggageIncluded: getLuggageIncluded(flightsChecked),
                luggagePlaces: getLuggagePlaces(flightsChecked),
                luggageWeight: getLuggageWeight(flightsChecked),
                luggageSize: getLuggageSize(flightsChecked),
                originTOFlightName: flight.name,
                isConcrete: getIsFlightConcrete(flightsChecked),
                flightDuration: getFlightDuration(flightsChecked),
                resourceId: flight.id,
                ticketNumber: getTicketNumber(flightsChecked)
            };
        })
            .map(function (f) { return (0, index_1.transformFlight)(f); });
    };
    var findOrderFlight = function (resourceId) {
        var orderResource = resourceData.filter(function (rd) { return rd.name === 'FLIGHT_ORDER' && rd.resourceId === resourceId; })[0] || null;
        return orderResource && (0, isInteger_1.default)(Number(orderResource.value)) ? Number(orderResource.value) : 0;
    };
    // SLT-1799 возвращаем валидный статус, когда
    // перелеты в оба направления доступны
    // перелет хотя бы в одном направлении доступен
    var getValidFlightsStatus = function (flightData) {
        if (flightData.to.length && !flightData.from.length) {
            return models_2.FlightsStatus.OnlyFlightTo;
        }
        if (flightData.from.length && !flightData.to.length) {
            return models_2.FlightsStatus.OnlyFlightFrom;
        }
        return models_2.FlightsStatus.Ok;
    };
    var groupedFlights = {
        to: [],
        from: []
    };
    if (flightTo && (0, isNumber_1.isNumber)(flightTo.groupId)) {
        groupedFlights.to = (0, sortBy_1.default)(flightResources.filter(function (r) { return r.groupId === flightTo.groupId; }), function (r) { return findOrderFlight(r.id); });
    }
    if (flightFrom && (0, isNumber_1.isNumber)(flightFrom.groupId)) {
        groupedFlights.from = (0, sortBy_1.default)(flightResources.filter(function (r) { return r.groupId === flightFrom.groupId; }), function (r) { return findOrderFlight(r.id); });
    }
    var flightsData = {
        to: mapFlights(groupedFlights.to),
        from: mapFlights(groupedFlights.from),
        flightsPackageId: flightResources[0].linkGroupsId,
        surchargeAmount: flightResources[0].surcharge || 0,
        surchargeCurrencyId: flightResources[0].surchargeCurrencyId || 0,
        surchargeOriginAmount: flightResources[0].surchargeOriginal || 0,
        surchargeOriginCurrencyId: flightResources[0].surchargeCurrencyIdOriginal || 0,
        isChecked: flightResources[0].isChecked,
    };
    return tslib_1.__assign(tslib_1.__assign({}, flightsData), { status: getValidFlightsStatus(flightsData) });
}
exports.flightsParser = flightsParser;
function parseDate(date) {
    if (!date) {
        return null;
    }
    try {
        var mDate = date.match(/\d\d\.\d\d\.\d\d\d\d/g);
        return (0, date_1.parseDateString)(mDate ? mDate[0] : '', 'DD.MM.YYYY');
    }
    catch (err) {
        return null;
    }
}
function getDepartureTime(flightsChecked) {
    var timeDepartureResource = pickResourceByName(flightsChecked, 'START_TIME');
    var dateTimeDepartureResource = pickResourceByName(flightsChecked, 'START_DATETIME');
    if (timeDepartureResource) {
        return timeDepartureResource.value;
    }
    if (dateTimeDepartureResource) {
        return dateTimeDepartureResource.value.split(' ')[1];
    }
    return '';
}
function getArrivalTime(flightsChecked) {
    var timeDepartureResource = pickResourceByName(flightsChecked, 'END_TIME');
    var dateTimeDepartureResource = pickResourceByName(flightsChecked, 'END_DATETIME');
    if (timeDepartureResource) {
        return timeDepartureResource.value;
    }
    if (dateTimeDepartureResource) {
        return dateTimeDepartureResource.value.split(' ')[1];
    }
    return '';
}
function getDepartureDate(flightsChecked, actualizedTour) {
    var dateDepartureResource = pickResourceByName(flightsChecked, 'DATE');
    var date = (dateDepartureResource && dateDepartureResource.value) || actualizedTour.departDate;
    return parseDate(date);
}
// -> 27 фев 2017, Пн
function getArrivalDate(flightsChecked, actualizedTour) {
    var dateTimeDepartureResource = pickResourceByName(flightsChecked, 'END_DATETIME');
    var dateDepartureResource = pickResourceByName(flightsChecked, 'DATE');
    var date = (dateTimeDepartureResource && dateTimeDepartureResource.value) ||
        (dateDepartureResource && dateDepartureResource.value) ||
        actualizedTour.departDate;
    return parseDate(date);
}
function getDepartureAirportCode(flightsChecked) {
    var airportResource = pickResourceByName(flightsChecked, 'AIRPORT_FROM');
    return (airportResource && separateWordsWithSpace(airportResource.value)) || '';
}
function getArrivalAirportCode(flightsChecked) {
    var airportResource = pickResourceByName(flightsChecked, 'AIRPORT_TO');
    return (airportResource && separateWordsWithSpace(airportResource.value)) || '';
}
function getDepartureAirportName(flightsChecked) {
    var airportResource = pickResourceByName(flightsChecked, 'AIRPORT_FROM_NAME');
    return (airportResource && airportResource.value) || '';
}
function getArrivalAirportName(flightsChecked) {
    var airportResource = pickResourceByName(flightsChecked, 'AIRPORT_TO_NAME');
    return (airportResource && airportResource.value) || '';
}
function getDepartureCityName(flightsChecked) {
    var airportResource = pickResourceByName(flightsChecked, 'AIRPORT_FROM_CITY');
    return (airportResource && airportResource.value) || '';
}
function getArrivalCityName(flightsChecked) {
    var airportResource = pickResourceByName(flightsChecked, 'AIRPORT_TO_CITY');
    return (airportResource && airportResource.value) || '';
}
function getTicketNumber(flightsChecked) {
    var ticketNumber = pickResourceByName(flightsChecked, 'TICKET_NUMBER');
    return (ticketNumber && ticketNumber.value) || '';
}
function getAirlineName(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'AIRLINE');
    return (resource && resource.value) || '';
}
function getAirlineId(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'AIRLINE_ID');
    return (resource && resource.value) || '';
}
function getFlightClass(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'CLASS');
    return (resource && resource.value) || '';
}
function getFlightNumber(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'FLIGHT');
    return (resource && resource.value) || '';
}
function getBaggageIncluded(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'BAGGAGE_INCLUDED');
    return !!resource && resource.value === 'True';
}
function getBaggagePlaces(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'BAGGAGE_PLACES');
    return resource && resource.value ? parseInt(resource.value, 10) : 0;
}
function getBaggageWeight(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'BAGGAGE_WEIGHT');
    return resource && resource.value ? parseInt(resource.value, 10) : 0;
}
function getBaggageSize(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'BAGGAGE_SIZE');
    return (resource && resource.value) || '';
}
function getLuggageIncluded(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'LUGGAGE_INCLUDED');
    return !!resource && resource.value === 'True';
}
function getLuggagePlaces(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'LUGGAGE_PLACES');
    return resource && resource.value ? parseInt(resource.value, 10) : 0;
}
function getLuggageWeight(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'LUGGAGE_WEIGHT');
    return resource && resource.value ? parseInt(resource.value, 10) : 0;
}
function getLuggageSize(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'LUGGAGE_SIZE');
    return (resource && resource.value) || '';
}
function getIsFlightConcrete(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'FLIGHT_IS_CONCRETE');
    /*
    SLT-10188: коммент к задаче:
    "FLIGHT_IS_CONCRETE не всегда приходит при актуализации рейсов.
     Если параметра нет, IsConcrete нужно заполнять как true."
    */
    return !resource || !!resource && resource.value === 'True';
}
function getFlightDuration(flightsChecked) {
    var resource = pickResourceByName(flightsChecked, 'FLIGHT_DURATION');
    return resource && resource.value ? parseInt(resource.value, 10) : 0;
}
function pickResourceByName(flightsChecked, name) {
    return flightsChecked.filter(function (r) { return r.name === name; })[0];
}
function separateWordsWithSpace(targetString) {
    return targetString
        .split(',')
        .map(function (item) { return item.trim(); })
        .join(', ');
}
