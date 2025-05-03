/* eslint-disable */
/* eslint-disable prettier/prettier */
import {
    getActualizationResultAsync,
    GetActualizationResultAsyncResponse
} from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetActualizationResult/GetActualizationResultAsync';
import { Request } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/QueueActualization/Request';
import {
    ActualizationTour
} from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/ActualizePriceResponse';
import {
    ActualizePriceRequest
} from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/ActualizePriceRequest';
import { ActualizeOilTax } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/OilTaxes';
import { ResourceData, Resource } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/Resources';
import { ActualizePriceVisaFee } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/VisaFees';
import { Protocols } from 'sletat-api-services/lib/http/HttpClient';

import { BaseService } from '../types/BaseService';
import {
    TourCardServiceError, ServiceType, AvailableTypeError
} from '../helpers/TourCardServiceError';
import { Services } from 'sletat-api-services/lib/module/tourActualization/models';


export interface DetailedActualizationData {
    oilTaxes: Array<ActualizeOilTax>;
    resourceData: Array<ResourceData>;
    resources: Array<Resource>;
    services: Services;
    visaFees: Array<ActualizePriceVisaFee>;
    tour?: ActualizationTour;
}

export class DetailedActualization extends BaseService {

    private static NOT_EXIST_TOUR_DATA_MESSAGE = 'Не удалось уточнить данные по туру!';
    private static NOT_EXIST_ACTUALIZATION_MESSAGE = 'Детальная актуализация не существует!';

    callService(request: Request, params: ActualizePriceRequest): Promise<DetailedActualizationData | void> {
        return getActualizationResultAsync(request, params, { protocol: Protocols.HTTPS })
            .then((response: GetActualizationResultAsyncResponse) => {
                if (!response.actualizationResult.tour) {
                    throw new TourCardServiceError(
                        DetailedActualization.NOT_EXIST_TOUR_DATA_MESSAGE,
                        ServiceType.DetailedActualization
                    );
                }
                if (typeof this.onFinishCallback === 'function') {
                    this.onFinishCallback(null, this.extractDetailedActualizationData(response));
                }
                return this.extractDetailedActualizationData(response);
            })
            .catch((err: AvailableTypeError) => {
                err = new TourCardServiceError(err, ServiceType.DetailedActualization);
                if (typeof this.onFinishCallback === 'function') {
                    this.onFinishCallback(err as TourCardServiceError);
                }
                if (this.shouldThrowError) {
                    throw err;
                }
            });
    }

    // MODULES-969: если первичная актуализация вернула isDetailedExists: false, то
    // детальную актуализацию сразу завершаем, не делая запрос
    makeServiceCompleted(): Promise<null> {
        let err = new TourCardServiceError(
            new Error(DetailedActualization.NOT_EXIST_ACTUALIZATION_MESSAGE),
            ServiceType.DetailedActualization
        );
        if (typeof this.onFinishCallback === 'function') {
            this.onFinishCallback(err as TourCardServiceError);
        }
        return this.shouldThrowError ? Promise.reject(err) : Promise.resolve(null);
    }

    private extractDetailedActualizationData(response: GetActualizationResultAsyncResponse): DetailedActualizationData {
        return {
            oilTaxes: response.actualizationResult.oilTaxes,
            resourceData: response.actualizationResult.resourceData,
            resources: response.actualizationResult.resources,
            services: response.actualizationResult.services,
            visaFees: response.actualizationResult.visaFees,
            tour: response.actualizationResult.tour
        };
    }
}
