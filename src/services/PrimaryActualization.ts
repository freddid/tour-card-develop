/* eslint-disable */
/* eslint-disable prettier/prettier */
import { actualizePrice } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/ActualizePrice';
import {
    ActualizePriceResponse,
    ActualizationTour
} from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/ActualizePriceResponse';
import { ActualizeOilTax } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/OilTaxes';
import { ResourceData, Resource } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/Resources';
import { ActualizePriceVisaFee } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/VisaFees';
import {
    ActualizePriceRequest
} from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/ActualizePriceRequest';
import { Protocols } from 'sletat-api-services/lib/http/HttpClient';

import { BaseService } from '../types/BaseService';
import { TourCardServiceError, ServiceType, ErrorStatus, AvailableTypeError } from '../helpers/TourCardServiceError';
import { Services } from 'sletat-api-services/lib/module/tourActualization/models';


export interface PrimaryActualizationData {
    oilTaxes: Array<ActualizeOilTax>;
    resourceData: Array<ResourceData>;
    resources: Array<Resource>;
    visaFees: Array<ActualizePriceVisaFee>;
    isDetailedExists: boolean;
    tour?: ActualizationTour | null;
    basicSletatTourId?: number | null;
    basicTourPrice?: number | null;
    services?: Services | null;
}

export class PrimaryActualization extends BaseService {

    private static NOT_FOUND_MESSAGE = 'Тур не найден';

    callService(request: ActualizePriceRequest): Promise<PrimaryActualizationData | void> {
        return actualizePrice(request, { protocol: Protocols.HTTPS })
            .then((response: ActualizePriceResponse) => {
                if (!response.isFound) {
                    throw new TourCardServiceError(
                        PrimaryActualization.NOT_FOUND_MESSAGE,
                        ServiceType.ActualizePrice,
                        ErrorStatus.TourNotFound
                    );
                } else if (!!response.errorMessage) {
                    throw new TourCardServiceError(response.errorMessage, ServiceType.ActualizePrice);
                } else {
                    if (typeof this.onFinishCallback === 'function') {
                        this.onFinishCallback(null, this.extractActualizedData(response));
                    }
                }
                return this.extractActualizedData(response);
            })
            .catch((err: AvailableTypeError) => {
                err = new TourCardServiceError(err, ServiceType.ActualizePrice);
                if (typeof this.onFinishCallback === 'function') {
                    this.onFinishCallback(err as TourCardServiceError);
                }

                if (this.shouldThrowError) {
                    throw err;
                }
            });
    }

    private extractActualizedData(response: ActualizePriceResponse): PrimaryActualizationData {
        return {
            oilTaxes: response.oilTaxes || [],
            resourceData: response.resourceData || [],
            resources: response.resources || [],
            visaFees: response.visaFees || [],
            tour: response.tour || null,
            isDetailedExists: response.isDetailedExists,
            basicSletatTourId: !!response.tour ? response.tour.sletatTourId : null,
            basicTourPrice: !!response.tour ? (response.tour.fullPrice || response.tour.price) : null,
            services: response?.services || null,
        };
    }
}
