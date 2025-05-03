/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as formatDate from 'date-fns/format';
import { parseDateString } from 'sletat-common-utils/lib/date';
import { FlightItem, FlightsData, OldFlight } from 'sletat-api-services/lib/module/flights/models';
import { FlightsParsingResources } from 'sletat-api-services/lib/module/flights/utils/parser';


interface OldFlightsData {
    to: Array<OldFlight>;
    from: Array<OldFlight>;
}

export function getDefaultFlightData(parsingData: FlightsParsingResources): FlightsData {
    const result = getDefaultFlightDataOld({
        actualizedTour: parsingData.actualizedTour,
        resources: parsingData.resources,
        resourceData: parsingData.resourceData
    });

    return transformFlightsData(result);
}

export function transformFlightsData(data: OldFlightsData): FlightsData {
    return {
        to: data.to.map(transformFlight),
        from: data.from.map(transformFlight),
    } as FlightsData;
}

export function transformFlight(parsedFlight: OldFlight): FlightItem {
    return {
        airportFromName: parsedFlight.airportNameDeparture || null,
        airportFromCityName: parsedFlight.cityDeparture || null,
        airportToName: parsedFlight.airportNameArrival || null,
        airportToCityName: parsedFlight.cityArrival || null,
        airlineName: parsedFlight.airlaneName || null,
        flight: parsedFlight.flightNumber || null,
        airportFromCode: parsedFlight.airportCodeDeparture || null,
        airportToCode: parsedFlight.airportCodeArrival || null,
        startTime: parsedFlight.timeDeparture || null,
        endTime: parsedFlight.timeArrival || null,
        startDate: parsedFlight.dateDeparture
            ? formatDate(parsedFlight.dateDeparture, 'DD.MM.YYYY')
            : null,
        endDate: parsedFlight.dateArrival
            ? formatDate(parsedFlight.dateArrival, 'DD.MM.YYYY')
            : null,
        ticketsClass: parsedFlight.flightClass || null,
        airlineIATACode: null,
        airlineICAOCode: null,
        airlineId: parsedFlight.airlaneId || null,
        isConcrete: parsedFlight.isConcrete || false,
        baggageIncluded: false,
    };
}


function parseDate(date: string | undefined): Date | null {
    if (!date) {
        return null;
    }
    try {
        const mDate = date.match(/\d\d\.\d\d\.\d\d\d\d/g);
        return parseDateString(mDate ? mDate[0] : '', 'DD.MM.YYYY');
    } catch (err) {
        return null;
    }
}

export function getDefaultFlightDataOld(parsingData: FlightsParsingResources): OldFlightsData {
    const dateTo = parseDate(parsingData.actualizedTour!.departDate);
    const dateFrom = parseDate(parsingData.actualizedTour!.arrivalDate);

    const flightsTo = [{
        timeDeparture: '',
        timeArrival: '',
        dateDeparture: dateTo,
        dateArrival: dateTo,
        cityDeparture: parsingData.actualizedTour!.cityName,
        cityArrival: parsingData.actualizedTour!.resort.name,
        airportCodeDeparture: '',
        airportCodeArrival: '',
        airportNameDeparture: '',
        airportNameArrival: '',
        airlaneName: '',
        flightClass: '',
        flightNumber: '',
        airlaneId: '',
        isConcrete: false,
        baggageIncluded: false
    }];

    const flightsFrom = [{
        timeDeparture: '',
        timeArrival: '',
        dateDeparture: dateFrom,
        dateArrival: dateFrom,
        cityDeparture: parsingData.actualizedTour!.resort.name,
        cityArrival: parsingData.actualizedTour!.cityName,
        airportCodeDeparture: '',
        airportCodeArrival: '',
        airportNameDeparture: '',
        airportNameArrival: '',
        airlaneName: '',
        flightClass: '',
        flightNumber: '',
        airlaneId: '',
        isConcrete: false,
        baggageIncluded: false
    }];

    return {
        to: flightsTo,
        from: flightsFrom
    };
}
