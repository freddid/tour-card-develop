/* eslint-disable */
/* eslint-disable prettier/prettier */
import { CreateClaimExLiteParams } from 'sletat-api-services/lib/claims/createClaimExLite/request';
import { createTourOfficeClaimLetsFly as _createTourOfficeClaimLetsFly } from 'sletat-api-services/lib/claims/createTourOfficeClaimLetsFly';
// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import { CLAIMS_AGENT_API_HOST_NAME } from '../../config/api-consts';
import { CreateTourOfficeClaimResponse } from 'sletat-api-services/lib/claims/createTourOfficeClaim/response';


export { Customer as CustomerLite } from 'sletat-api-services/lib/claims/createClaimExLite/models/customer';
export { Tourist as TouristLite } from 'sletat-api-services/lib/claims/createClaimExLite/models/tourist';
export { Gender as GenderLite } from 'sletat-api-services/lib/claims/createClaimExLite/models/gender';
export { CreateClaimExLiteParams as CreateClaimExLiteRequest };


export function createTourOfficeClaimLetsFly(params: CreateClaimExLiteParams): Promise<CreateTourOfficeClaimResponse> {
    return _createTourOfficeClaimLetsFly(params, CLAIMS_AGENT_API_HOST_NAME)
        .then(response => response)
        .catch(err => {
            throw err;
        });
}
