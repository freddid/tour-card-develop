/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable */
import * as React from 'react';
import { Component, EventHandler } from 'react';
import * as classNames from 'classnames';

import { RequiredTourFormFields } from 'sletat-module-settings/dist/js/module6/model';
import { PrepaymentSchema } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/GetSettings/PrepaymentSchema';
import { LeadsResponse } from 'sletat-api-services/lib/LeadHubServices/API/Leads/LeadsResponse';
import { currency, target } from 'sletat-api-services/lib/types';
import { UiHorizontalTabs } from 'sletat-uikit2/dist/js/UiHorizontalTabs';
import { MultiContentChangeState, UiMultiContentItem } from 'sletat-uikit2/dist/js/UiAdaptiveTabs/UiBaseMultiContent';
import { TourService } from 'sletat-api-services/lib/module/tourActualization/models';
import { TourOrder } from '../forms/TourOrder';
import { BuyOnline } from '../forms/BuyOnline';
import { AgencyContactBanner } from '../AgencyContactBanner';
import { SaveTourOrderData } from '../CardPolyfill';
import { AgencyContact } from '../config/Module5Config';
import { MODULE6_TARGET } from '../types-and-consts';
import { TourActualizationState } from '../models/actualization';
import { BaseBuyOnlineParams } from '../models/buy-online';


export interface TourFormsProps {
    areIncludedFlightTickets: boolean;
    requestId: number;
    sourceId: number;
    offerId: number;
    useManyOffices: boolean;
    orderFormTab: number;
    tourPrice: number;
    tourDepartDate: string | null;
    tourArrivalDate: string | null;
    tourNumNights: number | null;
    tourHotelName: string | null;
    tourNameOfSPO: string | null;
    tourResortName: string | null;
    tourHotelMealName: string | null;
    tourHotelMealDescription: string | null;
    tourHotelRoomTypeDescription: string | null;
    tourHotelStarsName: string | null;
    tourOperatorName: string | null;
    tourCountryId: number | null;
    tourDepartureCityId: number | null;
    tourHotelId: number | null;
    tourHotelMealId: number | null;
    tourResortId: number | null;
    tourHotelStarsId: number | null;
    tourIncludes: Array<TourService>;
    tourActualization: TourActualizationState;
    onlinePaymentIsActive: boolean;
    onlinePaymentPrice: number | null;
    countryName: string;
    cityName: string;
    currency: currency;
    numAdults: number;
    numKids: number;
    isTwoStepsHoldingMode: boolean;
    usePlasticCard: boolean;
    useOrder: boolean;
    prepaymentSchemas: Array<PrepaymentSchema>;
    priceModifierSchemeId: string | null;
    officeId: number | undefined;
    agencyContact: AgencyContact | undefined;
    offerAgreementLink: string | undefined;
    privacyPolicyLink: string | undefined;
    statementOfPersonalDataLink: string | undefined;
    leadHubToken: string | null;
    tourFormRequiredFields: RequiredTourFormFields;
    target: target;
    onChangeActive: (index: number) => void;
    onClose: EventHandler<any>;
    fireBookingErrorHandler: (error: string) => void;
    fireBookingClickHandler: () => void;
    fireBookingSubmitHandler: (request: SaveTourOrderData | LeadsResponse) => void;
    fireBuyingErrorHandler: (error: string) => void;
    fireBuyingSubmitHandler: (request: BaseBuyOnlineParams) => void;
    fireBuyingClickHandler: () => void;
}


export class TourForms extends Component<TourFormsProps> {

    private buyOnlineTitle = 'Онлайн покупка';
    private tourOrderTitle = 'Заявка';

    render() {
        if (!this.props.onlinePaymentIsActive && !this.props.useOrder) {
            return null;
        }

        const cx = this.classes();

        if (!this.props.onlinePaymentIsActive) {
            return this.renderSingleForm(
                this.tourOrderTitle,
                this.renderTourOrderForm()
            );
        } else if (!this.props.useOrder) {
            return this.renderSingleForm(
                this.buyOnlineTitle,
                this.renderBuyOnlineForm()
            );
        }

        const getTabItems = () => {
            const tabItems: Array<UiMultiContentItem> = [];

            if (this.props.useOrder) {
                tabItems.push({
                    title: this.tourOrderTitle,
                    content: this.renderTourOrderForm()
                });
            }

            if (this.props.usePlasticCard) {
                tabItems.unshift({
                    title: this.buyOnlineTitle,
                    content: this.renderBuyOnlineForm()
                });
            }

            return tabItems;
        };

        return (
            <UiHorizontalTabs
                activeIndex={this.props.orderFormTab}
                items={getTabItems()}
                shouldAnimate={true}
                transitionEnterStiffness={100}
                bemModifications={[cx.hotelForms]}
                onChange={(state: MultiContentChangeState) => this.props.onChangeActive(state.index)}
            />
        );
    }

    renderSingleForm(title: string, content: JSX.Element): JSX.Element {
        return (
            <div className="form-container">
                <h2 className="form-container__title">
                    {title}
                </h2>
                <div className="form-container__content">
                    {content}
                </div>
            </div>
        );
    }

    renderTourOrderForm(): JSX.Element {
        const cx = this.classes();
        const renderAgencyContact = () => {
            const contact: AgencyContact | undefined = this.props.agencyContact;

            if (!contact || !contact.logo && !contact.email && !contact.phone && !contact.header && !contact.content) {
                return null;
            }

            return (
                <div className={cx.agency}>
                    <AgencyContactBanner
                        isModule6={this.props.target === MODULE6_TARGET}
                        bannerData={contact}
                    />
                </div>
            );
        };

        return (
            <div
                id="sletat-tour-card-order-form-container"
                className={cx.root}
                key="tab-1"
            >
                <div className={cx.form}>
                    <p className={cx.text}>
                        Заявка ни к чему вас не обязывает и не является бронированием.
                        Получив заявку, наш менеджер уточнит наличие и свяжется с вами.
                    </p>
                    <TourOrder
                        requestId={this.props.requestId}
                        sourceId={this.props.sourceId}
                        offerId={this.props.offerId}
                        countryName={this.props.countryName}
                        cityName={this.props.cityName}
                        currency={this.props.currency}
                        officeId={this.props.officeId}
                        numAdults={this.props.numAdults}
                        numKids={this.props.numKids}
                        tourDepartDate={this.props.tourDepartDate}
                        tourArrivalDate={this.props.tourArrivalDate}
                        tourPrice={this.props.onlinePaymentPrice || this.props.tourPrice}
                        tourNumNights={this.props.tourNumNights}
                        tourHotelName={this.props.tourHotelName}
                        tourNameOfSPO={this.props.tourNameOfSPO}
                        tourResortName={this.props.tourResortName}
                        tourHotelMealName={this.props.tourHotelMealName}
                        tourHotelStarsName={this.props.tourHotelStarsName}
                        tourOperatorName={this.props.tourOperatorName}
                        tourCountryId={this.props.tourCountryId}
                        tourDepartureCityId={this.props.tourDepartureCityId}
                        tourHotelId={this.props.tourHotelId}
                        tourHotelMealId={this.props.tourHotelMealId}
                        tourResortId={this.props.tourResortId}
                        tourHotelStarsId={this.props.tourHotelStarsId}
                        useManyOffices={this.props.useManyOffices}
                        leadHubToken={this.props.leadHubToken}
                        target={this.props.target}
                        privacyPolicyLink={this.props.privacyPolicyLink || ''}
                        statementOfPersonalDataLink={this.props.statementOfPersonalDataLink || ''}
                        onSubmit={() => this.props.fireBookingClickHandler()}
                        onSuccess={(request: SaveTourOrderData | LeadsResponse) => this.props.fireBookingSubmitHandler(request)}
                        onError={(err: string) => this.props.fireBookingErrorHandler(err)}
                        tourFormRequiredFields={this.props.tourFormRequiredFields}
                    />
                </div>
                {renderAgencyContact()}
            </div>
        );
    }

    renderBuyOnlineForm(): JSX.Element {
        return (
            <div
                id="sletat-tour-card-buy-online-form-container"
                key="tab-2"
            >
                <BuyOnline
                    areIncludedFlightTickets={this.props.areIncludedFlightTickets}
                    requestId={this.props.requestId}
                    sourceId={this.props.sourceId}
                    offerId={this.props.offerId}
                    tourData={{
                        price: this.props.tourPrice,
                        priceCurrency: this.props.currency,
                        departureDate: this.props.tourDepartDate,
                        arrivalDate: this.props.tourArrivalDate,
                        tourNumNights: this.props.tourNumNights,
                        arrivalCountryName: this.props.countryName,
                        departureCityName: this.props.cityName,
                        resortName: this.props.tourResortName,
                        hotelName: this.props.tourHotelName,
                        hotelStarsName: this.props.tourHotelStarsName,
                        hotelMealTypeDescription: this.props.tourHotelMealDescription,
                        hotelRoomTypeDescription: this.props.tourHotelRoomTypeDescription,
                        tourOperatorName: this.props.tourOperatorName,
                        includedServices: this.props.tourIncludes,
                        adultsCount: this.props.numAdults,
                        kidsCount: this.props.numKids
                    }}
                    tourActualization={this.props.tourActualization}
                    priceModifierSchemeId={this.props.priceModifierSchemeId}
                    isTwoStepPayment={this.props.isTwoStepsHoldingMode}
                    prepaymentSchemas={this.props.prepaymentSchemas}
                    offerAgreementLink={this.props.offerAgreementLink || ''}
                    privacyPolicyLink={this.props.privacyPolicyLink || ''}
                    statementOfPersonalDataLink={this.props.statementOfPersonalDataLink || ''}
                    onError={(err: string) => this.props.fireBuyingErrorHandler(err)}
                    onSubmit={() => this.props.fireBuyingClickHandler()}
                    onSuccess={(request: BaseBuyOnlineParams) => this.props.fireBuyingSubmitHandler(request)}
                />
            </div>
        );
    }

    private classes() {
        const BASE_CLASS = 'tour-request';

        return {
            root: classNames({
                [BASE_CLASS]: true
            }),
            form: classNames({
                [`${BASE_CLASS}__form`]: true
            }),
            text: classNames({
                [`${BASE_CLASS}__text`]: true
            }),
            agency: classNames({
                [`${BASE_CLASS}__agency`]: true
            }),
            hotelForms: classNames({
                'hotel-forms': this.props.orderFormTab !== 0,
                'hotel-forms-online': this.props.orderFormTab === 0
            }),
        };
    }
}
