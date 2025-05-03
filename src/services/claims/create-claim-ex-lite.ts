/* eslint-disable */
/* eslint-disable prettier/prettier */
import { CreateClaimExLiteParams } from 'sletat-api-services/lib/claims/createClaimExLite/request';
import { createClaimExLite as _createClaimExLite } from 'sletat-api-services/lib/claims/createClaimExLite';
import { CreateClaimExLiteResponse } from 'sletat-api-services/lib/claims/createClaimExLite/response';
// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import { CLAIMS_HOST_NAME } from '../../config/api-consts';


export { Customer as CustomerLite } from 'sletat-api-services/lib/claims/createClaimExLite/models/customer';
export { Tourist as TouristLite } from 'sletat-api-services/lib/claims/createClaimExLite/models/tourist';
export { Gender as GenderLite } from 'sletat-api-services/lib/claims/createClaimExLite/models/gender';
export { CreateClaimExLiteParams as CreateClaimExLiteRequest };


export interface CreateClaimExLiteLocalSettings {
    target: string;
}

export function createClaimExLite(settings: CreateClaimExLiteLocalSettings, params: CreateClaimExLiteParams): Promise<CreateClaimExLiteResponse> {
    return _createClaimExLite(params, { host: CLAIMS_HOST_NAME, target: settings.target })
        .then(response => response)
        .catch(err => {
            throw err;
        });
}
