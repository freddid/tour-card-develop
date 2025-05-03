/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable-next-line:no-unused-variable */
import React from 'react';

import { RequiredTourFormFields } from 'sletat-module-settings/dist/js/module6/model';
import { saveTourOrder, saveTourOrderWithFlight } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/SaveTourOrder/SaveTourOrder';
import { createLead } from 'sletat-api-services/lib/LeadHubServices/API/Leads/Leads';
import { LeadsResponse } from 'sletat-api-services/lib/LeadHubServices/API/Leads/LeadsResponse';
import { SaveTourOrderRequest } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/SaveTourOrder/SaveTourOrderRequest';
import { WrappedCreateClaimRequest } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaim/Request';
import { currency, target } from 'sletat-api-services/lib/types';
import { Protocols } from 'sletat-api-services/lib/http/HttpClient';
import { TourOrderFormSubmittedData, TourOrderForm } from './TourOrderForm';
import { SaveTourOrderData } from '../../CardPolyfill';
import { FormNotificationsHandler, NotificationTypes } from '../FormNotificationsHandler';
import { logMetric, printErr } from '../../utils';
import stores from '../../stores';
import { observer } from 'mobx-react';


export interface TourOrderProps {
    requestId: number;
    sourceId: number;
    offerId: number;
    numAdults: number;
    numKids: number;
    tourDepartDate: string | null;
    tourArrivalDate: string | null;
    tourPrice: number;
    tourNumNights: number | null;
    tourHotelName: string | null;
    tourNameOfSPO: string | null;
    tourResortName: string | null;
    tourHotelMealName: string | null;
    tourHotelStarsName: string | null;
    tourOperatorName: string | null;
    tourCountryId: number | null;
    tourDepartureCityId: number | null;
    tourHotelId: number | null;
    tourHotelMealId: number | null;
    tourResortId: number | null;
    tourHotelStarsId: number | null;
    countryName: string;
    cityName: string;
    currency: currency;
    target: target;
    privacyPolicyLink: string;
    statementOfPersonalDataLink: string;
    useManyOffices: boolean;
    leadHubToken: string | null;
    officeId: number | undefined;
    onSubmit: () => void;
    onSuccess: (request: SaveTourOrderData | LeadsResponse) => void;
    onError: (error: string) => void;
    tourFormRequiredFields: RequiredTourFormFields,
}

export interface TourOrderState {
    formKey: string;
}

@observer
export class TourOrder extends React.Component<TourOrderProps, TourOrderState> {

    private notificationsHandler: FormNotificationsHandler;

    constructor(props: TourOrderProps) {
        super(props);

        this.state = {
            formKey: this.formKeyGen()
        };
        this.notificationsHandler = new FormNotificationsHandler();
        this.notificationsHandler.bindOnShowNotification(() => this.forceUpdate());
        this.notificationsHandler.bindOnHideNotification(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.notificationsHandler.unbindOnShowNotification();
        this.notificationsHandler.unbindOnHideNotification();
    }

    render() {
        if (this.notificationsHandler.isVisibleNotification) {
            return this.notificationsHandler.renderVisibleNotification();
        }

        return (
            <TourOrderForm
                key={this.state.formKey}
                useManyOffices={this.props.useManyOffices}
                officeId={this.props.officeId}
                target={this.props.target}
                privacyPolicyLink={this.props.privacyPolicyLink}
                statementOfPersonalDataLink={this.props.statementOfPersonalDataLink}
                onSubmit={(submittedData: TourOrderFormSubmittedData) => this.onSubmitHandler(submittedData)}
                requiredFields={this.props.tourFormRequiredFields}
            />
        );
    }

    private createClaimOrder(state: TourOrderFormSubmittedData): void {
        const { selectedFlight } = stores.flightOfferStore;
        const request = {
            requestId: this.props.requestId,
            sourceId: this.props.sourceId,
            offerId: this.props.offerId,
            officeId: !!state.officeId ? state.officeId : null,
            countryName: this.props.countryName,
            cityFromName: this.props.cityName,
            currencyAlias: this.props.currency,
            referrer: String(window.location),
            userName: state.name || '',
            email: state.email || '',
            phone: state.phone || '',
            comment: state.comment || '',
            flight: selectedFlight,
        };

        const tourOrderRequest = {
            request,
            cityName: state.cityId ? state.cityName : null
        } as SaveTourOrderData;

        this.props.onSubmit();
        this.notificationsHandler.showNotification(NotificationTypes.Processing);

        !!selectedFlight ?
            saveTourOrderWithFlight(request as SaveTourOrderRequest, { protocol: Protocols.HTTPS })
                .then((response: WrappedCreateClaimRequest) => this.onSuccessHandler(tourOrderRequest))
                .catch((err: string) => this.onErrorHandler(err)) :
            saveTourOrder(request as SaveTourOrderRequest, { protocol: Protocols.HTTPS })
                .then((response: WrappedCreateClaimRequest) => this.onSuccessHandler(tourOrderRequest))
                .catch((err: string) => this.onErrorHandler(err));
    }

    private sendOrderToLeadHub(state: TourOrderFormSubmittedData): void {
        const request = {
            sourceToken: this.props.leadHubToken as string,
            name: state.name || '',
            email: state.email || '',
            phone: state.phone || '',
            agencyOfficeId: state.officeId,
            requestInfo: state.comment || '',
            leadTourDetails: {
                tourRequestId: this.props.requestId,
                tourOfferId: this.props.offerId,
                tourSourceId: this.props.sourceId,
                currencyName: this.props.currency,
                adults: this.props.numAdults,
                childs: this.props.numKids,
                currencyId: null,
                countryToName: this.props.countryName,
                departureCityName: this.props.cityName,
                checkInDate: this.props.tourDepartDate,
                checkOutDate: this.props.tourArrivalDate,
                price: this.props.tourPrice,
                nights: this.props.tourNumNights,
                hotelName: this.props.tourHotelName,
                tourName: this.props.tourNameOfSPO,
                resortName: this.props.tourResortName,
                mealName: this.props.tourHotelMealName,
                starName: this.props.tourHotelStarsName,
                tourOperatorName: this.props.tourOperatorName,
                tourOperatorId: this.props.sourceId,
                countryToId: this.props.tourCountryId,
                departureCityId: this.props.tourDepartureCityId,
                hotelId: this.props.tourHotelId,
                mealId: this.props.tourHotelMealId,
                resortId: this.props.tourResortId,
                starId: this.props.tourHotelStarsId
            }
        };
        this.props.onSubmit();
        this.notificationsHandler.showNotification(NotificationTypes.Processing);
        createLead(request, { protocol: Protocols.HTTPS })
            .then((response: LeadsResponse) => this.onSuccessHandler(response))
            .catch((err) => this.onErrorHandler(err));
    }

    private onSubmitHandler(state: TourOrderFormSubmittedData): void {
        // MODULES-993 при наличии токена отправлять заявку напрямую в leadhub
        if (this.props.leadHubToken) {
            this.sendOrderToLeadHub(state);
        } else {
            this.createClaimOrder(state);
        }
    };

    private onSuccessHandler(tourOrderRequest: SaveTourOrderData | LeadsResponse): void {
        logMetric('tourcard-order_success');
        this.props.onSuccess(tourOrderRequest);
        this.notificationsHandler.showNotification(NotificationTypes.Success, 'Ваша заявка успешно отправлена!');
        this.setState({ formKey: this.formKeyGen() } as TourOrderState);
    }

    private onErrorHandler(err: string | Error): void {
        let message: string = typeof err === 'string' ? err : err.message;
        this.props.onError(message);
        printErr(err);
        this.notificationsHandler.showNotification(NotificationTypes.Fail, `К сожалению, произошла ошибка: \n${message}`);
    }

    private formKeyGen(): string {
        return `tour-order-form-${Math.random().toFixed(6)}`;
    }
}
