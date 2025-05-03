/* eslint-disable */
/* eslint-disable prettier/prettier */
import { isUndefined }  from 'lodash';

import { Resource, ResourceData } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/Resources';
import { ActualizationTour } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/ActualizePriceResponse';
import { ActualizePriceVisaFee } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/VisaFees';
import {
    IFacilityGroup,
    IWeather
} from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfoResponse';
import { GetClaimsSettingsResponse } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/GetSettings/GetSettings';
import { PrepaymentSchema } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/GetSettings/PrepaymentSchema';
import { TicketsAvailability, HotelInStop, BaseFlightInfo } from 'sletat-api-services/lib/Tour';
import { IHotelInfo } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfoResponse';
import { currency } from 'sletat-api-services/lib/types';
import {
    FlightsData,
    FlightsStatus
} from 'sletat-api-services/lib/module/flights/models';
import { TourFlags } from "sletat-api-services/lib/module/getTours/models/tours";

import { ActualizedData } from './TourCardActualization';
import { parseFlags } from '../utils/flagParser';
import { TourFlagDictionary, TourFlagKeys } from '../types/enums';
import { Services } from 'sletat-api-services/lib/module/tourActualization/models';


export interface TourFlightsInfo {
    toFlights: Array<string> | null;
    fromFlights: Array<string> | null;
    toWaitingTime: number | null;
    fromWaitingTime: number | null;
}


export class TourActualizedInfo {
    private actualizedData: ActualizedData;

    /**
     * Нижнее подчеркивани для данных, которые используются в геттерах с таким же именем
     */
    private _isDetailedActualization: boolean;

    constructor(data: ActualizedData, isDetailed = false) {
        this.actualizedData = data;
        this._isDetailedActualization = isDetailed;
    }

    public get isDetailedActualization(): boolean {
        return this._isDetailedActualization;
    }

    public get hasTourData(): boolean {
        return !!this.actualizedData && !!this.actualizedData.tour;
    }

    public get tour(): ActualizationTour | null {
        return (this.hasTourData && this.actualizedData.tour) ? this.actualizedData.tour : null;
    }

    public get tourOperatorName(): string | null {
        return this.tour ? this.tour.sourceName : null;
    }

    public get services(): Services | undefined | null {
        return this.actualizedData?.services
    }

    public get tourId(): number | null | undefined {
        /**
         * MODULES-824: возвращаем sletatTourId тот, который был до детальной актуализации
         */
        return this.hasTourData ? this.actualizedData.basicSletatTourId : null;
    }

    public get tourCountryId(): number | null {
        return this.tour ? this.tour.countryId : null;
    }

    public get tourCountryName(): string | null {
        return this.tour ? this.tour.countryName : null;
    }

    public get tourCityName(): string | null {
        return this.tour ? this.tour.cityName : null;
    }

    public get tourDepartureCityId(): number | null {
        return this.tour ? this.tour.cityId : null;
    }

    public get tourDepartDate(): string | null {
        return this.tour ? this.tour.departDate : null;
    }

    public get tourArrivalDate(): string | null {
        return this.tour ? this.tour.arrivalDate : null;
    }

    public get tourNameOfSPO(): string | null {
        return this.tour ? this.tour.nameOfSPO : null;
    }

    public get tourCurrency(): currency | null {
        return this.tour ? this.tour.currency as currency : null;
    }
    
    public get tourPrice(): number | null {
        if (!this.tour) {
            return null;
        }

        // https://agile.sletat.ru/jiraurl/browse/SLT-482?focusedCommentId=86585&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-86585
        return this.isDetailedActualization
            ? this.tour.price
            : this.tour.fullPrice || this.tour.price;
    }

    public get basicActualizationTourPrice(): number | null {
        return (this.hasTourData && this.actualizedData.basicTourPrice) ? this.actualizedData.basicTourPrice : null;
    }

    public get diffPricePercentAfterActualization(): string | null {
        if (this.tourPrice && this.basicActualizationTourPrice) {
            const diff = this.tourPrice - this.basicActualizationTourPrice;
            return ((diff / this.tourPrice) * 100).toFixed(2);
        }

        return null;
    }

    public get tourNumAdults(): number | null {
        return this.tour ? this.tour.adultCount : null;
    }

    public get tourNumKids(): number | null {
        return this.tour ? this.tour.kidsCount : null;
    }

    public get tourNumNights(): number | null {
        return this.tour ? this.tour.nightsCount : null;
    }

    public get tourResortName(): string | null {
        return (this.tour && this.tour.resort) ? this.tour.resort.name : null;
    }

    public get tourResortId(): number | null {
        return (this.tour && this.tour.resort) ? this.tour.resort.id : null;
    }

    public get tourHotelId(): number | null {
        return (this.tour && this.tour.hotel) ? this.tour.hotel.id : null;
    }

    public get tourHotelName(): string | null {
        return (this.tour && this.tour.hotel) ? this.tour.hotel.name : null;
    }

    public get tourHotelAccommodationDescription(): string | null {
        return (this.tour && this.tour.hotel) ? this.tour.hotel.accommodationDescription : null;
    }

    public get tourHotelStarsName(): string | null {
        return (this.tour && this.tour.hotel) ? this.tour.hotel.starsName : null;
    }

    public get tourHotelStarsId(): number | null {
        return (this.tour && this.tour.hotel) ? this.tour.hotel.systemHotelCategoryId : null;
    }

    public get tourHotelMealDescription(): string | null {
        return (this.tour && this.tour.hotel) ? this.tour.hotel.mealDescription : null;
    }

    public get tourHotelMealId(): number | null {
        return (this.tour && this.tour.hotel) ? this.tour.hotel.systemMealId : null;
    }

    public get tourHotelMealName(): string | null {
        return (this.tour && this.tour.hotel) ? this.tour.hotel.mealName : null;
    }

    public get tourHotelRating(): number | null {
        return (this.tour && this.tour.hotel && typeof this.tour.hotel.rating === 'number')
            ? this.tour.hotel.rating
            : null;
    }

    public get tourHotelRoomType(): string | null {
        return (this.tour && this.tour.hotel) ? this.tour.hotel.roomType : null;
    }

    public get tourHotelRoomId(): number | null {
        return (!!this.tour?.hotel) ? this.tour.hotel.systemRoomTypeId : null;
    }

    public get areNoPlacesInHotel(): boolean | null {
        return (this.tour && this.tour.hotel) && this.tour.isHotelInStop;
    }

    public get placesInHotelExtendedInfo(): HotelInStop | null {
        return (this.tour && this.tour.hotel) ? this.tour.isHotelInStopExtendedInfo : null;
    }

    public get tourHotelPhotoCount(): number | null {
        return (this.tour && this.tour.hotel) ? this.tour.hotel.photoCount : null;
    }

    public get tourFlightsInfo(): BaseFlightInfo | null {
        return this.tour ? this.tour.flightInfo : null;
    }

    public get tourFlags(): Array<TourFlags> {
        return Object.keys(TourFlags)
        .map((flag) => TourFlags[flag as keyof typeof TourFlags])
        .filter((item) => !!((this.actualizedData.tour?.tourFlag ?? 0) & item));
    }

    public get getAllFlags(): TourFlagKeys {
        return parseFlags<TourFlagKeys>(this.actualizedData.tour?.tourFlag ?? 0, TourFlagDictionary);
    }

    public get isCombinedTour(): boolean {
        return this.tourFlags.includes(TourFlags.IsCombined);
    }

    public get tourIncludesTickets(): boolean {
        return !!this.tourFlightsInfo && this.tourFlightsInfo.ticketsInPrice;
    }

    private get hotelInfo(): IHotelInfo | null {
        return (!!this.actualizedData && !!this.actualizedData.hotelInfo) ? this.actualizedData.hotelInfo : null;
    }

    public get hasHotelInfo(): boolean {
        return !!this.hotelInfo;
    }

    public get hotelInfoId(): number | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.id : null;
    }

    public get hotelInfoName(): string | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.name : null;
    }

    public get hotelInfoCountryName(): string | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.countryName : null;
    }

    public get hotelInfoStarName(): string | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.starName : null;
    }

    public get hotelInfoDescription(): string | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.description : null;
    }

    public get hotelInfoAirportDistance(): number | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.hotelAirportDistance : null;
    }
    public get hotelInfoNoParseDescription(): string | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.noParseDescription : null;
    }

    public get hotelInfoNumRooms(): number | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.hotelRoomsCount : null;
    }

    public get hotelInfoNumImages(): number | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.imagesCount : null;
    }

    public get hotelInfoFacilities(): Array<IFacilityGroup> | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.hotelFacilities : null;
    }

    public get hotelInfoCurrentWeather(): Array<IWeather> | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.currentWeather : null;
    }

    public get hotelInfoLatitude(): number | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.latitude : null;
    }

    public get hotelInfoLongitude(): number | null {
        return !!this.hotelInfo ? this.actualizedData.hotelInfo.longitude : null;
    }

    public get resources(): Array<Resource> {
        return (!!this.actualizedData && !!this.actualizedData.resources) ? this.actualizedData.resources : [];
    }

    public get resourceData(): Array<ResourceData> {
        return !!this.actualizedData && this.actualizedData.resourceData || [];
    }

    public get claimsSettings(): GetClaimsSettingsResponse | null {
        return (!!this.actualizedData && !!this.actualizedData.claimsSettings)
            ? this.actualizedData.claimsSettings
            : null;
    }

    public get isTwoStepsHoldingMode(): boolean {
        return !!this.claimsSettings ? this.claimsSettings.twoStepsHolding : false;
    }

    public get prepaymentSchemas(): Array<PrepaymentSchema> {
        return !!this.claimsSettings ? this.claimsSettings.prepaymentSchemas : [];
    }

    public get visaFees(): Array<ActualizePriceVisaFee> {
        return (!!this.actualizedData && !!this.actualizedData.visaFees) ? this.actualizedData.visaFees : [];
    }

    public get areTicketsToOutOfStock(): boolean {
        return !!this.tour && (this.tour.flightInfo.economyTicketsTo === TicketsAvailability.OutOfStock)
            && (this.tour.flightInfo.ticketBusinessTo === TicketsAvailability.OutOfStock);
    }

    public get areTicketsBackOutOfStock(): boolean {
        return !!this.tour && (this.tour.flightInfo.economyTicketsBack === TicketsAvailability.OutOfStock)
            && (this.tour.flightInfo.ticketBusinessBack === TicketsAvailability.OutOfStock);
    }

    public get areTicketsToInStock(): boolean {
        return !!this.tour && ((this.tour.flightInfo.economyTicketsTo === TicketsAvailability.InStock)
            || (this.tour.flightInfo.ticketBusinessTo === TicketsAvailability.InStock));
    }

    public get areTicketsBackInStock(): boolean {
        return !!this.tour && ((this.tour.flightInfo.economyTicketsBack === TicketsAvailability.InStock)
            || (this.tour.flightInfo.ticketBusinessBack === TicketsAvailability.InStock));
    }

    public get flightsData(): FlightsData {
        return {
            to: this.actualizedData.flightsTo,
            from: this.actualizedData.flightsFrom,
            isChecked: this.actualizedData.isChecked
        } as FlightsData;
    }

    public get flightsStatus(): FlightsStatus {
        if (isUndefined(this.actualizedData.flightsStatus)) {
            return FlightsStatus.Loading;
        }

        return this.isTourSold ? FlightsStatus.NoTickets : this.actualizedData.flightsStatus;
    }


    public get isTourSold(): boolean {
        if (!this.hasTourData) {
            return false;
        }

        const hasDepartTickets = (): boolean => {
            if (!this.hasTourData) {
                return false;
            }
            const ticketsIncluded = this.tour!.flightInfo.ticketsInPrice;
            const hasDepartEconomTicket = this.tour!.flightInfo.economyTicketsTo > 0;
            const hasDepartBusinessTicket = this.tour!.flightInfo.ticketBusinessTo > 0;
            return ticketsIncluded && (hasDepartEconomTicket || hasDepartBusinessTicket);
        };

        const hasReturnTickets = (): boolean => {
            if (!this.hasTourData) {
                return false;
            }
            const ticketsIncluded = this.tour!.flightInfo.ticketsInPrice;
            const hasReturnEconomTicket = this.tour!.flightInfo.economyTicketsBack > 0;
            const hasReturnBusinessTicket = this.tour!.flightInfo.ticketBusinessBack > 0;
            return ticketsIncluded && (hasReturnEconomTicket || hasReturnBusinessTicket);
        };

        const ticketsIncluded = this.tour!.flightInfo.ticketsInPrice;
        return this.tour!.isHotelInStop
            || (!hasDepartTickets() && ticketsIncluded)
            || (!hasReturnTickets() && ticketsIncluded);
    }
}
