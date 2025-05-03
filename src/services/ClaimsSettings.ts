/* eslint-disable */
/* eslint-disable prettier/prettier */
import {
    getClaimsSettings,
    GetClaimsSettingsRequest,
    GetClaimsSettingsResponse
} from 'sletat-api-services/lib/ClaimApiServices/Main.svc/GetSettings/GetSettings';
import { Protocols } from 'sletat-api-services/lib/http/HttpClient';

import { BaseService } from '../types/BaseService';
import { TourCardServiceError, ServiceType, AvailableTypeError } from '../helpers/TourCardServiceError';


export interface ClaimsSettingsResultData {
    claimsSettings: GetClaimsSettingsResponse;
}

export class ClaimsSettings extends BaseService {

    callService(request: GetClaimsSettingsRequest): Promise<ClaimsSettingsResultData | void> {
        return getClaimsSettings(request, { protocol: Protocols.HTTPS })
            .then((response: GetClaimsSettingsResponse) => {
                if (typeof this.onFinishCallback === 'function') {
                    this.onFinishCallback(null, this.extractClaimsData(response));
                }
                return this.extractClaimsData(response);
            })
            .catch((err: AvailableTypeError) => {
                err = new TourCardServiceError(err, ServiceType.GetSettings);
                if (typeof this.onFinishCallback === 'function') {
                    this.onFinishCallback(err as TourCardServiceError);
                }

                if (this.shouldThrowError) {
                    throw err;
                }
            });
    }

    private extractClaimsData(response: GetClaimsSettingsResponse): ClaimsSettingsResultData {
        return {
            claimsSettings: response
        };
    }
}
