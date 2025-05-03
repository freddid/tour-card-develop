/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as TransitionGroup from 'react-addons-css-transition-group';

import * as classNames from 'classnames';

import { LeadsResponse } from 'sletat-api-services/lib/LeadHubServices/API/Leads/LeadsResponse';
import { currency } from 'sletat-api-services/lib/types';

import { TourCardActualization, OnlinePaymentPrice } from './helpers/TourCardActualization';
import { ErrorStatus, ServiceType, TourCardServiceError } from './helpers/TourCardServiceError';
import { SVGBundle } from './SVGBundle';
import { CardPolyfill, CardUserEvents, SaveTourOrderData } from './CardPolyfill';
import { Module5Config } from './config/Module5Config';
import { TARGET, Target, TourCardParams } from './types-and-consts';
import { TourCardControlPanel } from './TourCardControlPanel';
import { SendEmailOption, SendToPrintOption, SocialSharingOption, ToursComparisionOption } from './TourCardOptions';
import { TourPreview } from './tour/TourPreview';
import { MainTourInfo } from './tour/MainTourInfo';
import { HotelInfo } from './hotel/HotelInfo';
import { TourForms } from './tour/TourForms';
import { logMetric, printErr } from './utils';
import { smoothScrollDefault } from './utils/smoothScroll';
import { Tooltip } from './tour/bad-tour/Tooltip';
import { Line } from './tour/bad-tour/Line';
import { TourActualizedInfo } from './helpers/TourActualizedInfo';
import { observer } from 'mobx-react';
import S from './stores';
import { BaseBuyOnlineParams } from './models/buy-online';
import * as moment from 'moment';
import _ from 'lodash';

import '../css/entry.styl';

export interface CardControllerProps {
    cardPolyfill: CardPolyfill;
    tourCardParams: TourCardParams;
    config: Module5Config;
    onClose: () => void;
}

export interface CardControllerState {
    isActualizationProcess: boolean;
    isActualizationError: boolean;
    isTourNotFound: boolean;
    isBasicActualizationSuccess: boolean;
    isDetailActualizationSuccess: boolean;
    isActualizationFinished: boolean;
    isHotelsLoadedSuccess: boolean | null;
    isTourSoldAlertVisible: boolean;
    isResearchEnabled: boolean;
    hotelInfoTab: number;
    orderFormTab: number;
    onlinePaymentPrice?: number;
}

@observer
export class CardController extends React.Component<CardControllerProps, CardControllerState> {

    private actualizationHelper: TourCardActualization;
    private origDocumentTitle: string;

    constructor(props: CardControllerProps) {
        super(props);

        this.state = this.defaultState;

        this.actualizationHelper = new TourCardActualization(props.tourCardParams, {
            target: props.config.target,
            isTourOperatorLogoInBuyOnlineFormVisible: props.config.isTourOperatorLogoInBuyOnlineFormVisible
        });
        this.actualizationHelper.bindOnStartActualization(() => this.onStartActualization());
        this.actualizationHelper.bindOnSuccessBasicActualization(() => this.onSuccessBasicActualization());
        this.actualizationHelper.bindOnFinishActualization(this.onFinishActualizationCallback.bind(this));
        this.actualizationHelper.bindOnFinishHotelInfoLoading(this.onFinishHotelInfoLoadingCallback.bind(this));
        this.actualizationHelper.bindOnFinishLoadOnlinePaymentPrice(this.onLoadOnlinePaymentPrice.bind(this));
    }
    private get defaultState(): CardControllerState {
        return {
            isActualizationProcess: false,
            isActualizationError: false,
            isTourNotFound: false,
            isBasicActualizationSuccess: false,
            isDetailActualizationSuccess: false,
            isActualizationFinished: false,
            isTourSoldAlertVisible: true,
            isHotelsLoadedSuccess: null,
            hotelInfoTab: 0,
            orderFormTab: (this.props.config.buyingType === 'card' && this.props.config.useOrder) ? 1 : 0,
            isResearchEnabled: _.isBoolean(this.props.config.isResearchEnabled)
                ? this.props.config.isResearchEnabled
                : true
        };
    }

    componentWillMount() {
        logMetric('tourcard-open');
    }

    componentDidMount() {
        if (this.props.config.commentsAvailable) {
            logMetric('tourcard-with_review');
        }
        if (this.props.config.useCard) {
            logMetric('tourcard-with_online');
        }
        this.origDocumentTitle = document.title;
        this.actualizationHelper.actualize();
        // Быстро сетнуть мгт модуль
        S.mainStore.setModuleType(this.props.tourCardParams.moduleType);

        if (S.buyOnlineStore.isMgtModule) {
            S.buyOnlineStore.customerData.setIsMgtModule();
        }

        this.props.cardPolyfill.fire(CardUserEvents.tourCard);
    }

    componentWillUnmount() {
        document.title = this.origDocumentTitle;
        this.actualizationHelper.unbindAllHandlers();
    }

    private get isOnlinePaymentActive(): boolean {
        const actualizedInfo: TourActualizedInfo | null = this.actualizationHelper.tourActualizedInfo;
        if (!actualizedInfo || !actualizedInfo.hasTourData || !actualizedInfo.claimsSettings) {
            return false;
        }
        // валюта биллинга должна совпадать с переданной валютой в КТ
        let currencyMatched: boolean = actualizedInfo.tourCurrency === actualizedInfo.claimsSettings.currency;
        let useCard: boolean = this.props.config.useCard;

        return currencyMatched && useCard && !actualizedInfo.isTourSold;
    }

    render() {
        const cx = this.classes();
        let content: JSX.Element | Array<JSX.Element> | null = null;

        if (this.state.isBasicActualizationSuccess || this.state.isActualizationFinished) {
            try {
                content = this.renderCardContent();
            } catch (err) {
                printErr(err);
            }
        } else {
            return null;
        }

        return (
            <TransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
                transitionName="tour-card-animate"
            >
                <div key="fade-animate" className={cx.rootWrapper}>
                    <SVGBundle />
                    <div className={cx.card}>
                        {content}
                    </div>
                </div>
            </TransitionGroup>
        );
    }

    renderCardContent(): Array<JSX.Element> {
        const cx = this.classes();
        const actualizedInfo: TourActualizedInfo | null = this.actualizationHelper.tourActualizedInfo;
        const cardBlock = () => {
            if (!actualizedInfo || !actualizedInfo.hasTourData) {
                return null;
            }

            S.flightOfferStore.setActualizedInfo(actualizedInfo);

            const renderHotelInfo = () => {
                if (!actualizedInfo.hasHotelInfo) {
                    return null;
                }

                return (
                    <HotelInfo
                        isMGTModule={S.buyOnlineStore.isMgtModule}
                        activeTabIndex={this.state.hotelInfoTab}
                        currentWeather={actualizedInfo.hotelInfoCurrentWeather || []}
                        hotelAirportDistance={actualizedInfo.hotelInfoAirportDistance}
                        hotelCategory={actualizedInfo.hotelInfoStarName}
                        hotelDescription={actualizedInfo.hotelInfoNoParseDescription}
                        hotelFacilities={actualizedInfo.hotelInfoFacilities || []}
                        hotelId={actualizedInfo.hotelInfoId}
                        hotelLatitude={actualizedInfo.hotelInfoLatitude}
                        hotelLongitude={actualizedInfo.hotelInfoLongitude}
                        hotelName={actualizedInfo.hotelInfoName}
                        isCommentsAvailable={this.props.config.commentsAvailable}
                        isHotelActualizationSuccess={this.state.isHotelsLoadedSuccess}
                        isTripAdvisorCommentsEnabled={this.props.config.isTripAdvisorCommentsEnabled}
                        numHotelRooms={actualizedInfo.hotelInfoNumRooms}
                        numImages={actualizedInfo.hotelInfoNumImages}
                        punyCode={this.props.config.punycodeHostname}
                        target={(this.props.config.target || TARGET) as Target}
                        onActiveTabChange={(index: number) => this.setState({ hotelInfoTab: index } as any)}
                        onSelectHotelReviews={() => this.props.cardPolyfill.fire(CardUserEvents.hotelReviewsSelected)}
                    />
                );
            };
            return (
                <div>
                    <div className={cx.cardBlockTop}>
                        <TourPreview
                            target={(this.props.config.target || TARGET) as Target}
                            buttonBuyHandler={this.onBuyOnlineButtonClick}
                            buttonOrderHandler={this.onTourOrderButtonClick}
                            currency={actualizedInfo.tourCurrency}
                            fakeDiscount={this.props.config.fakeDiscount}
                            hotelId={actualizedInfo.tourHotelId}
                            imagePreviewHandler={this.onImagePreviewClick}
                            isActualizationProcess={this.state.isActualizationProcess}
                            isActualizationSuccess={this.state.isDetailActualizationSuccess}
                            isHotelLoadedSuccess={!!this.state.isHotelsLoadedSuccess}
                            numAdults={actualizedInfo.tourNumAdults}
                            numHotelPhotos={actualizedInfo.tourHotelPhotoCount}
                            numKids={actualizedInfo.tourNumKids}
                            numNights={actualizedInfo.tourNumNights ?? 0}
                            onlinePaymentIsActive={this.isOnlinePaymentActive}
                            onlinePaymentPrice={this.state.onlinePaymentPrice}
                            selectedArrivalCountryId={actualizedInfo.tourCountryId || 0}
                            tourDepartDate={moment(actualizedInfo.tourDepartDate,"DD.MM.YYYY")}
                            tourIncludesTickets={actualizedInfo.tourIncludesTickets}
                            tourPrice={actualizedInfo.tourPrice}
                            useFakeDiscount={this.props.config.useFakeDiscount}
                            useOrder={this.props.config.useOrder}
                            usePersonPrice={this.props.config.usePricePerson}
                        />
                        <MainTourInfo
                            target={(this.props.config.target || TARGET) as Target}
                            areIncludedFlightTickets={actualizedInfo.tourIncludesTickets}
                            areNoPlacesInHotel={!!actualizedInfo.areNoPlacesInHotel}
                            areTicketsBackInStock={actualizedInfo.areTicketsBackInStock}
                            areTicketsBackOutOfStock={actualizedInfo.areTicketsBackOutOfStock}
                            areTicketsToInStock={actualizedInfo.areTicketsToInStock}
                            areTicketsToOutOfStock={actualizedInfo.areTicketsToOutOfStock}
                            arrivalDate={actualizedInfo.tourArrivalDate}
                            cityName={actualizedInfo.tourCityName}
                            countryName={actualizedInfo.tourCountryName}
                            departDate={actualizedInfo.tourDepartDate}
                            flightsData={actualizedInfo.flightsData}
                            flightsStatus={actualizedInfo.flightsStatus}

                            hotelAccommodationDescription={actualizedInfo.tourHotelAccommodationDescription}
                            hotelCategory={actualizedInfo.tourHotelStarsName}
                            hotelId={actualizedInfo.hotelInfoId}
                            hotelMealDescription={actualizedInfo.tourHotelMealDescription}
                            hotelMealName={actualizedInfo.tourHotelMealName}
                            hotelName={actualizedInfo.tourHotelName}
                            hotelRating={actualizedInfo.tourHotelRating}
                            hotelRoomId={actualizedInfo.tourHotelRoomId}
                            hotelRoomType={actualizedInfo.tourHotelRoomType}
                            isActualizationProcess={this.state.isActualizationProcess}
                            isCombinedTour={actualizedInfo.isCombinedTour}
                            isDetailActualizationSuccess={this.state.isDetailActualizationSuccess}
                            nameOfSPO={actualizedInfo.tourNameOfSPO}
                            numAdults={actualizedInfo.tourNumAdults ?? 0}
                            numKids={actualizedInfo.tourNumKids ?? 0}
                            numNights={actualizedInfo.tourNumNights ?? 0}
                            placesInHotelExtendedInfo={actualizedInfo.placesInHotelExtendedInfo}
                            resortName={actualizedInfo.tourResortName}
                            sletatTourId={actualizedInfo.tourId}
                            tourIncludes={S.includedServicesStore.included}
                            tourNotIncludes={S.includedServicesStore.notIncluded}
                        />
                    </div>
                    <div className={cx.cardHotelDesc}>
                        {renderHotelInfo()}
                    </div>
                    <div className={cx.cardHotelForms}>
                        <TourForms
                            areIncludedFlightTickets={actualizedInfo.tourIncludesTickets}
                            agencyContact={this.props.config.agencyContact1}
                            cityName={actualizedInfo.tourCityName || ''}
                            countryName={actualizedInfo.tourCountryName || ''}
                            currency={actualizedInfo.tourCurrency as currency}
                            fireBookingClickHandler={() => this.props.cardPolyfill.fire(CardUserEvents.bookingClick)}
                            fireBuyingClickHandler={() => this.props.cardPolyfill.fire(CardUserEvents.buyingClick)}
                            fireBuyingErrorHandler={() => this.props.cardPolyfill.fire(CardUserEvents.buyingError)}
                            fireBuyingSubmitHandler={(request: BaseBuyOnlineParams) => this.props.cardPolyfill.fire(CardUserEvents.buyingSubmit, request)}
                            isTwoStepsHoldingMode={actualizedInfo.isTwoStepsHoldingMode}
                            leadHubToken={this.props.config.leadHubToken}
                            numAdults={actualizedInfo.tourNumAdults ?? 0}
                            numKids={actualizedInfo.tourNumKids ?? 0}
                            offerAgreementLink={this.props.config.offerAgreementLink || ''}
                            offerId={this.props.tourCardParams.offerId}
                            officeId={this.props.config.officeId}
                            onlinePaymentIsActive={this.isOnlinePaymentActive}
                            onlinePaymentPrice={this.state.onlinePaymentPrice || null}
                            orderFormTab={this.state.orderFormTab}
                            prepaymentSchemas={actualizedInfo.prepaymentSchemas}
                            priceModifierSchemeId={this.props.config.priceModifierSchemeId || null}
                            privacyPolicyLink={this.props.config.privacyPolicyLink || ''}
                            statementOfPersonalDataLink={this.props.config.statementOfPersonalDataLink || ''}
                            requestId={this.props.tourCardParams.requestId}
                            sourceId={this.props.tourCardParams.sourceId}
                            target={(this.props.config.target || TARGET) as Target}
                            tourArrivalDate={actualizedInfo.tourArrivalDate}
                            tourCountryId={actualizedInfo.tourCountryId}
                            tourDepartDate={actualizedInfo.tourDepartDate}
                            tourDepartureCityId={actualizedInfo.tourDepartureCityId}
                            tourFormRequiredFields={this.props.tourCardParams.tourFormRequiredFields}
                            tourHotelId={actualizedInfo.tourHotelId}
                            tourHotelMealDescription={actualizedInfo.tourHotelMealDescription}
                            tourHotelMealId={actualizedInfo.tourHotelMealId}
                            tourHotelMealName={actualizedInfo.tourHotelMealName}
                            tourHotelName={actualizedInfo.tourHotelName}
                            tourHotelRoomTypeDescription={actualizedInfo.tourHotelAccommodationDescription}
                            tourHotelStarsId={actualizedInfo.tourHotelStarsId}
                            tourHotelStarsName={actualizedInfo.tourHotelStarsName}
                            tourIncludes={S.includedServicesStore.included}
                            tourNameOfSPO={actualizedInfo.tourNameOfSPO}
                            tourNumNights={actualizedInfo.tourNumNights}
                            tourOperatorName={actualizedInfo.tourOperatorName}
                            tourPrice={actualizedInfo.tourPrice ?? 0}
                            tourResortId={actualizedInfo.tourResortId}
                            tourResortName={actualizedInfo.tourResortName}
                            useManyOffices={this.props.config.useManyOffices}
                            useOrder={this.props.config.useOrder}
                            usePlasticCard={this.props.config.useCard && !actualizedInfo.isTourSold}
                            fireBookingErrorHandler={(error: string) => {
                                this.props.cardPolyfill.fire(CardUserEvents.bookingError, { message: error });
                            }}
                            fireBookingSubmitHandler={(request: SaveTourOrderData | LeadsResponse) => {
                                const actualizationStatus = this.state.isDetailActualizationSuccess ? 'success' : 'fail';
                                this.logChangePriceMetric(actualizationStatus, 'tourcard-order_success');
                                this.props.cardPolyfill.fire(CardUserEvents.bookingSubmit, request);
                            }}
                            tourActualization={{
                                isActualizationInProcess: this.state.isActualizationProcess,
                                isActualizationSuccess: this.state.isDetailActualizationSuccess
                            }}
                            onChangeActive={(index: number) => this.setState({ orderFormTab: index } as any)}
                            onClose={this.props.onClose}
                        />
                    </div>
                </div>
            );
        };

        const showTourOptions = !this.state.isTourNotFound && !this.state.isActualizationError;

        return [
            this.renderCardControlPanel(showTourOptions),
            <div key="card-wrapper-key" className={cx.cardWrapper}>
                {this.renderAlert()}
                {cardBlock()}
            </div>
        ];
    }

    renderCardControlPanel(showOptions = true): JSX.Element {
        const isVisibleCompare: boolean = !_.isUndefined(this.props.config.isVisibleCompare)
            ? this.props.config.isVisibleCompare
            : true;
        const actualizedInfo: TourActualizedInfo | null = this.actualizationHelper.tourActualizedInfo;
        const isVisibleSharing: boolean = !_.isUndefined(this.props.config.isSocialNetworkSharingEnabled)
            ? this.props.config.isSocialNetworkSharingEnabled
            : true;

        const getOptions = () => {
            if (showOptions) {
                return [
                    <SendEmailOption
                        key="send-email-key"
                        isVisible={false}
                    />,
                    <SendToPrintOption
                        key="send-to-print-key"
                        isVisible={false}
                    />,
                    <SocialSharingOption
                        key="social-sharing-key"
                        isVisible={isVisibleSharing}
                        tourArrivalDate={actualizedInfo && actualizedInfo.tourArrivalDate || ''}
                        tourCityName={actualizedInfo && actualizedInfo.tourCityName || ''}
                        tourCountryName={actualizedInfo && actualizedInfo.tourCountryName || ''}
                        tourCurrency={actualizedInfo && actualizedInfo.tourCurrency || 'RUB'}
                        tourDepartDate={actualizedInfo && actualizedInfo.tourDepartDate || ''}
                        tourNameOfSPO={actualizedInfo && actualizedInfo.tourNameOfSPO || ''}
                        tourPrice={actualizedInfo && actualizedInfo.tourPrice || 0}
                    />,
                    <ToursComparisionOption
                        key="tours-comparision-key"
                        card={this.props.cardPolyfill}
                        isVisible={isVisibleCompare}
                        tourComparisonData={{
                            requestId: this.props.tourCardParams.requestId,
                            sourceId: this.props.tourCardParams.sourceId,
                            offerId: this.props.tourCardParams.offerId,
                            tourId: actualizedInfo && actualizedInfo.tourId || -1
                        }}
                    />
                ];
            }

            return [];
        };

        return (
            <TourCardControlPanel
                key="tour-card-control-panel-key"
                tourCardOptions={getOptions()}
                onClose={() => {
                    const actualizationStatus = this.state.isDetailActualizationSuccess ? 'success' : 'fail';
                    this.logChangePriceMetric(actualizationStatus, 'tourcard-close');
                    this.props.onClose();
                }}
            />
        );
    }

    renderAlert(): JSX.Element | null {
        const cx = this.classes();
        const actualizedInfo: TourActualizedInfo | null = this.actualizationHelper.tourActualizedInfo;

        if (this.state.isTourNotFound || this.state.isActualizationError) {
            return (
                <div className={cx.tourFailed}>
                    <Tooltip
                        isTourSold={false}
                        shouldShowResearchButton={this.state.isResearchEnabled}
                        onSimilarToursRequest={() => {
                            if (this.state.isResearchEnabled) {
                                this.onStartSimilarSearchHandler(this.props.tourCardParams);
                            }
                        }}
                    />
                </div>
            );
        } else if (actualizedInfo && actualizedInfo.hasTourData && actualizedInfo.isTourSold) {
            return (
                <div className={cx.tourFailed}>
                    {this.state.isTourSoldAlertVisible &&
                        <Tooltip
                            isTourSold={true}
                            shouldShowResearchButton={this.state.isResearchEnabled}
                            onShowTourInfo={() => this.setState({ isTourSoldAlertVisible: false } as CardControllerState)}
                            onSimilarToursRequest={() => {
                                if (this.state.isResearchEnabled) {
                                    this.onStartSimilarSearchHandler(this.props.tourCardParams);
                                }
                            }}
                        />
                    }
                    <Line onSimilarToursRequest={() => this.onStartSimilarSearchHandler(this.props.tourCardParams)} />
                </div>
            );
        }

        return null;
    }

    private onStartActualization() {
        this.setState(_.merge({}, this.defaultState, { isActualizationProcess: true } as CardControllerState));
        S.flightOfferStore.setActualizationStatus(
           {
            ...S.flightOfferStore.actualizationStatus,
            isActualizationInProgress: true,
          }
        );
        S.flightOfferStore.ui.increaseActualizationProgress(_.random(1, 5));
    }

    private onSuccessBasicActualization() {
        const actualizedInfo: TourActualizedInfo = (this.actualizationHelper.tourActualizedInfo as TourActualizedInfo);
        this.setState({ isBasicActualizationSuccess: true } as CardControllerState);
        if (this.props.config.useTitle) {
            document.title = `${actualizedInfo.tourHotelName} / ${actualizedInfo.tourCountryName}`;
        }
        this.loadOnlinePaymentPrice();
        S.flightOfferStore.ui.increaseActualizationProgress(_.random(10, 30));
    }

    private onFinishActualizationCallback(err: TourCardServiceError | null) {
        if (!err) {
            this.setState({
                isDetailActualizationSuccess: true,
                isActualizationProcess: false,
                isActualizationFinished: true
            } as CardControllerState);
            S.flightOfferStore.setActualizationStatus({
                isActualizationCompleted: true,
                isActualizationInProgress: false,
                isDetailedFailed: false,
            });
            this.loadOnlinePaymentPrice();
        } else if (err.status === ErrorStatus.TourNotFound) {
            this.setState({
                isTourNotFound: true,
                isActualizationProcess: false,
                isActualizationFinished: true
            } as CardControllerState);
            S.flightOfferStore.setActualizationStatus({
                isActualizationCompleted: true,
                isActualizationInProgress: false,
                isDetailedFailed: true,
            });
        } else if (err.serviceType === ServiceType.DetailedActualization) {
            this.setState({
                isDetailActualizationSuccess: false,
                isActualizationProcess: false,
                isActualizationFinished: true
            } as CardControllerState);
            S.flightOfferStore.setActualizationStatus({
                isActualizationCompleted: true,
                isActualizationInProgress: false,
                isDetailedFailed: true,
            });
        } else {
            this.setState({
                isActualizationError: true,
                isActualizationProcess: false,
                isActualizationFinished: true
            } as CardControllerState);
        }
        this.logChangePriceMetric(!err ? 'success' : 'fail', 'tourcard-actualize');
        S.flightOfferStore.ui.increaseActualizationProgress(_.random(20, 30));
    }

    private onFinishHotelInfoLoadingCallback(err: TourCardServiceError | null) {
        if (!err) {
            this.setState({ isHotelsLoadedSuccess: true } as CardControllerState);
        } else {
            this.setState({ isHotelsLoadedSuccess: false } as CardControllerState);
        }
        S.flightOfferStore.ui.increaseActualizationProgress(_.random(20, 30));
    }

    private loadOnlinePaymentPrice(): void {
        if (!this.actualizationHelper || !this.actualizationHelper.tourActualizedInfo) {
            return;
        }

        const tourPrice = this.actualizationHelper.tourActualizedInfo.tourPrice as number;

        if (this.props.config.priceModifierSchemeId && this.props.config.useCard) {
            this.actualizationHelper.loadOnlinePaymentPrice(tourPrice, this.props.config.priceModifierSchemeId)
                .then((onlinePaymentPrice: number) => {
                    this.setState({ onlinePaymentPrice } as CardControllerState);
                });
        }
    }

    private onLoadOnlinePaymentPrice(err: TourCardServiceError | null, data?: OnlinePaymentPrice): void {
        if (!err && data) {
            this.setState({ onlinePaymentPrice: data.price } as CardControllerState);
        }
    }

    private logChangePriceMetric(status: string, title: string) {
        const data: any = { status };
        const actualizedInfo = this.actualizationHelper.tourActualizedInfo;
        if (actualizedInfo && actualizedInfo.diffPricePercentAfterActualization) {
            data.changeprice = `${actualizedInfo.diffPricePercentAfterActualization}%`;
        }
        logMetric(title, data);
    }

    private onStartSimilarSearchHandler = (tourParams: TourCardParams) => {
        this.props.cardPolyfill.startSimilarSearch(tourParams);
        this.props.onClose();
    }

    private onImagePreviewClick = (event: React.SyntheticEvent<any>, target: Target) => {
        this.setState({ hotelInfoTab: 0 } as CardControllerState, () => {
            smoothScrollDefault('tour-preview-slider', target);
        });
        event.preventDefault();
    }

    private onTourOrderButtonClick = (event: React.SyntheticEvent<any>, target: Target) => {
        this.setState({ orderFormTab: 1 } as CardControllerState, () => {
            smoothScrollDefault('sletat-tour-card-order-form-container', target);
        });
        event.preventDefault();
    }

    private onBuyOnlineButtonClick = (event: React.SyntheticEvent<any>, target: Target) => {
        this.setState({ orderFormTab: 0 } as CardControllerState, () => {
            smoothScrollDefault('sletat-tour-card-buy-online-form-container', target);
        });
        event.preventDefault();
    }

    private classes() {
        return {
            rootWrapper: classNames({
                'card-wrapper': true
            }),
            card: classNames({
                'card': true
            }),
            cardWrapper: classNames({
                'card__wrapper': true
            }),
            cardBlockTop: classNames({
                'card__block-top': true
            }),
            cardHotelDesc: classNames({
                'card__hotel-description': true
            }),
            cardHotelForms: classNames({
                'card__hotel-forms': true
            }),
            tourFailed: classNames({
                'tour-failed': true
            })
        };
    }
}
