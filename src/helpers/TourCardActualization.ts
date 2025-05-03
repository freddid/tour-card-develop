/* eslint-disable */
/* eslint-disable prettier/prettier */
import { merge, filter } from 'lodash';
import { target } from 'sletat-api-services/lib/types';
import { ActualizationTour, Resource } from 'sletat-api-services/lib/module/tourActualization/models';
import { getPriceByScheme } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/GetPriceByScheme/GetPriceByScheme';
import {
    ActualizePriceRequest
} from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/ActualizePriceRequest';
import { GetClaimsSettingsRequest } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/GetSettings/GetSettings';
import { GetHotelInfoRequest } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfoRequest';
import {
    Request as DetailedActualizationRequest
} from 'sletat-api-services/lib/ModuleApiServices/Main.svc/QueueActualization/Request';
import { FlightItem as Flight, FlightsStatus } from 'sletat-api-services/lib/module/flights/models';
import { Protocols } from 'sletat-api-services/lib/http/HttpClient';
import { PrimaryActualization, PrimaryActualizationData } from '../services/PrimaryActualization';
import { HotelInfo, HotelResultData } from '../services/HotelInfo';
import { TourCardParams, TARGET } from '../types-and-consts';
import { printWarn, printErr } from '../utils';
import { getDefaultFlightData } from '../utils/flights';
import { ClaimsSettings, ClaimsSettingsResultData } from '../services/ClaimsSettings';
import { TourCardServiceError, ServiceType, ErrorStatus } from './TourCardServiceError';
import { CallbackType } from '../types/BaseService';
import { TourActualizedInfo } from './TourActualizedInfo';
import { DetailedActualization, DetailedActualizationData } from '../services/DetailedActualization';

import S from '../stores';
import { flightsPackageParser } from '../services/flights-package-parser';
import { isAvailableRusPassportCountry } from '../utils/isAvailableRusPassportCountry';


export interface LocalFlightsParsedData {
    flightsFrom: Array<Flight>;
    flightsTo: Array<Flight>;
    flightsStatus: FlightsStatus;
    isChecked: boolean;
}
export type OnlinePaymentPrice = {
    price: number;
};

export type ActualizedData = HotelResultData & PrimaryActualizationData & ClaimsSettingsResultData & LocalFlightsParsedData;

export interface TourCardActualizationConfig {
    target?: string;
    isTourOperatorLogoInBuyOnlineFormVisible?: boolean;
}

export class TourCardActualization {

    private primaryActualizationRequest: ActualizePriceRequest;
    private claimsSettingsRequest: GetClaimsSettingsRequest;
    private hotelInfoRequest: GetHotelInfoRequest;
    private detailedActualizationRequest: DetailedActualizationRequest;

    private primaryActualization: PrimaryActualization;
    private hotelInfoLoader: HotelInfo;
    private claimsSettingsLoader: ClaimsSettings;
    private detailedActualization: DetailedActualization;

    private _onStartActualizationCallback: CallbackType<undefined> | null;
    private _onSuccessBasicActualizationCallback: CallbackType<undefined> | null;
    private _onFinishActualizationCallback: CallbackType<ActualizedData> | null;
    private _onFinishHotelInfoLoadingCallback: CallbackType<ActualizedData> | null;
    private _onFinishLoadOnlinePaymentPriceCallback: CallbackType<OnlinePaymentPrice> | null;

    private actualizedData: ActualizedData;
    private _tourActualizedInfo: TourActualizedInfo;
    private _errorMessage: string;

    constructor(params: TourCardParams, config: TourCardActualizationConfig) {
        const getKidsAges = (params: TourCardParams): Array<number> => {
            return filter([params.kid1, params.kid2, params.kid3], (kid) => typeof kid === 'number') as Array<number>;
        };

        this.primaryActualizationRequest = {
            hotelId: -1,
            price: params.price,
            adults: params.adults,
            target: (config.target || TARGET) as target,
            countryId: params.countryId,
            currencyAlias: params.currencyAlias,
            kids: params.kids,
            kidsAges: getKidsAges(params),
            nights: params.nights,
            offerId: params.offerId,
            requestId: params.requestId,
            showcase: false,
            townFromId: params.townFromId,
            townId: params.townId,
            sourceId: params.sourceId,
            vk_group_id: params.vkGroupId ? String(params.vkGroupId) : '0',
        };

        this.claimsSettingsRequest = {
            requestId: params.requestId,
            offerId: params.offerId,
            sourceId: params.sourceId,
            host: window.location.hostname,
            target: (config.target || TARGET) as target
        };

        this.hotelInfoRequest = {
            hotelId: -1,
            target: (config.target || TARGET) as target
        };

        this.detailedActualizationRequest = {
            requestId: params.requestId,
            offerId: params.offerId,
            townFromId: params.townFromId,
            showcase: '0',
            currencyAlias: params.currencyAlias,
            countryId: params.countryId,
            detailed: '1',
            sourceId: params.sourceId,
            command: 'Init',
            target: (config.target || TARGET) as target
        };

        this.primaryActualization = new PrimaryActualization(true);
        this.primaryActualization.onFinish(this.onFinishPrimaryActualization.bind(this));

        this.hotelInfoLoader = new HotelInfo(false);
        this.hotelInfoLoader.onFinish(this.onFinishHotelInfoActualization.bind(this));

        this.claimsSettingsLoader = new ClaimsSettings(false);
        this.claimsSettingsLoader.onFinish(this.onFinishClaimsSettingsActualization.bind(this));

        this.detailedActualization = new DetailedActualization(false);
        this.detailedActualization.onFinish(this.onFinishDetailedActualization.bind(this));

        this.setInitialTourCardStoresParams(params, config);
    }

    public get tourActualizedInfo(): TourActualizedInfo | null {
        return this._tourActualizedInfo || null;
    }

    public get errorMessage(): string {
        return this._errorMessage || '';
    }

    public actualize(): Promise<any> {
        this.onStartActualizationCallback();
        return Promise.all([
            Promise.all([
                this.primaryActualization.callService(this.primaryActualizationRequest),
                this.claimsSettingsLoader.callService(this.claimsSettingsRequest)
            ]).then((serviceResponses: any) => {
                this.onSuccessBasicActualizationCallback();
                this.hotelInfoLoader.callService(merge({}, this.hotelInfoRequest, {
                    hotelId: (this.tourActualizedInfo as TourActualizedInfo).tourHotelId
                }));

                /**
                 * детальную актуализацию делаем только если для этого есть
                 * соотвествующий флаг в первичной актуализации
                 */
                return serviceResponses[0].isDetailedExists
                    ? this.detailedActualization.callService(this.detailedActualizationRequest, this.primaryActualizationRequest)
                    : this.detailedActualization.makeServiceCompleted();
            }),
        ]).catch((err: TourCardServiceError) => {
            /**
             * критичная нештатная ошибка только одна - когда первичная актуализация
             * закончилась ошибкой. это приводит к окончанию всей актуализации.
             * все прочие некритичные ошибки сервисов логируются в своих колбэках
             */
            if (err.serviceType === ServiceType.ActualizePrice || err.status === ErrorStatus.TourNotFound) {
                printWarn('Первичная актуализация завершилась ошибкой или тур не был найден!');
            } else {
                printWarn('Произошла критическая ошибка при запросе к сервисам!');
                printErr(err);
            }
        });
    }

    public bindOnStartActualization(callback: CallbackType<undefined>): void {
        this._onStartActualizationCallback = callback;
    }

    public bindOnSuccessBasicActualization(callback: CallbackType<undefined>): void {
        this._onSuccessBasicActualizationCallback = callback;
    }

    public bindOnFinishActualization(callback: CallbackType<ActualizedData>): void {
        this._onFinishActualizationCallback = callback;
    }

    public bindOnFinishHotelInfoLoading(callback: CallbackType<ActualizedData>): void {
        this._onFinishHotelInfoLoadingCallback = callback;
    }

    public bindOnFinishLoadOnlinePaymentPrice(callback: CallbackType<OnlinePaymentPrice>): void {
        this._onFinishLoadOnlinePaymentPriceCallback = callback;
    }

    public onStartActualizationCallback(): void {
        if (!!this._onStartActualizationCallback) {
            this._onStartActualizationCallback(null);
        }
    }

    public loadOnlinePaymentPrice(price: number, priceModifierSchemeId: string): Promise<number> {
        return new Promise((resolve, reject) => {
            const params = {
                tourPrice: price,
                host: location.hostname,
                priceModifierSchemeId,
                target: 'module-5.0' as any
            };

            getPriceByScheme(params, { protocol: Protocols.HTTPS }).then((response) => {
                if (!!this._onFinishLoadOnlinePaymentPriceCallback) {
                    this._onFinishLoadOnlinePaymentPriceCallback(null, { price: response.price });
                }
            });
        });
    }

    public onSuccessBasicActualizationCallback(): void {
        if (!!this._onSuccessBasicActualizationCallback) {
            this._onSuccessBasicActualizationCallback(null);
        }
    }

    public onFinishActualizationCallback(err: TourCardServiceError | null, data?: ActualizedData): void {
        if (!!this._onFinishActualizationCallback) {
            this._onFinishActualizationCallback(err, data);
        }
    }

    public onFinishHotelInfoLoadingCallback(err: TourCardServiceError | null, data?: ActualizedData): void {
        if (!!this._onFinishHotelInfoLoadingCallback) {
            this._onFinishHotelInfoLoadingCallback(err, data);
        }
    }

    public unbindAllHandlers(): void {
        this._onStartActualizationCallback = null;
        this._onSuccessBasicActualizationCallback = null;
        this._onFinishActualizationCallback = null;
        this._onFinishHotelInfoLoadingCallback = null;
        this._onFinishLoadOnlinePaymentPriceCallback = null;
    }

    private onFinishPrimaryActualization(err: TourCardServiceError | null, data?: PrimaryActualizationData): void {
        if (!err) {
            const defaultFlightData = getDefaultFlightData({
                actualizedTour: (data!.tour as any),
                resourceData: data!.resourceData,
                resources: data!.resources as Array<Resource>
            });
            this.actualizedData = merge({}, this.actualizedData, data, {
                flightsTo: defaultFlightData.to,
                flightsFrom: defaultFlightData.from,
                flightsStatus: FlightsStatus.Loading
            });
            this._tourActualizedInfo = new TourActualizedInfo(this.actualizedData);
            
        } else {
            if (err.status === ErrorStatus.TourNotFound) {
                this._errorMessage = err.message;
                printWarn(`PriceActualization: ${this._errorMessage}`);
            }
            this.onFinishActualizationCallback(err);
        }
    }

    private onFinishClaimsSettingsActualization(err: TourCardServiceError | null, data?: ClaimsSettingsResultData): void {
        if (!err) {
            this.actualizedData = merge({}, this.actualizedData, data);
            this._tourActualizedInfo = new TourActualizedInfo(this.actualizedData);
        } else {
            printWarn(`ClaimsSettings: ${err.message}`);
        }
    }

    private onFinishHotelInfoActualization(err: TourCardServiceError | null, data?: HotelResultData): void {
        if (!err) {
            this.actualizedData = merge({}, this.actualizedData, data);
            this._tourActualizedInfo = new TourActualizedInfo(this.actualizedData);
            this.onFinishHotelInfoLoadingCallback(null, this.actualizedData);
        } else {
            printWarn(`HotelInfo: ${err.message}`);
            this.onFinishHotelInfoLoadingCallback(err);
        }
    }

    private onFinishDetailedActualization(err: TourCardServiceError | null, data?: DetailedActualizationData): void {
        const finishActualization = (err: TourCardServiceError | null) => {
            if (err) {
                printWarn(`DetailedActualization: ${err.message}`);
                this.onFinishActualizationCallback(err);
            } else {
                this.onFinishActualizationCallback(null, this.actualizedData);
            }
        };

        this.actualizedData = merge({}, this.actualizedData, data);

        try {
            const flightsPackages = flightsPackageParser(
                {
                  resources: this.actualizedData!.resources! as Array<Resource>,
                  resourceData: this.actualizedData!.resourceData!,
                  actualizedTour: this.actualizedData!.tour as ActualizationTour,
                },
                false,
              );
            S.flightOfferStore.initFlights(flightsPackages);
            this._tourActualizedInfo = new TourActualizedInfo(this.actualizedData, !err);
            S.includedServicesStore.initServices(this.actualizedData.services!, this._tourActualizedInfo.tourIncludesTickets);
            finishActualization(err);
        } catch (flightsError) {
            // Пока что оставил эту историю с мержем, но возможно это уже не понадобится
            this.actualizedData = merge({}, this.actualizedData, data, {
                flightsStatus: flightsError.status || FlightsStatus.NotConcrete
            });
            this._tourActualizedInfo = new TourActualizedInfo(this.actualizedData, !err);
            finishActualization(err);
        }
    }

    private setInitialTourCardStoresParams(params: TourCardParams, config: TourCardActualizationConfig): void {
        S.mainStore.setModuleTarget(config.target || TARGET);
        S.mainStore.setTourSearchParams({
            requestId: params.requestId,
            sourceId: params.sourceId,
            offerId: params.offerId
        });
        S.mainStore.setNumAdults(params.adults);
        S.mainStore.setNumKids(params.kids);
        S.mainStore.setKidsAges([params.kid1, params.kid2, params.kid3]);
        S.mainStore.setCountryId(params.countryId);
        S.mainStore.setIsNoInternationalPassportNeed(
            isAvailableRusPassportCountry(params.countryId)
        );
        S.mainStore.setIsTourOperatorLogoInBuyOnlineFormVisibleInConfig(
            Boolean(config.isTourOperatorLogoInBuyOnlineFormVisible)
        );
    }
}
