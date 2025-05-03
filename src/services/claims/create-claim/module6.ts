/* eslint-disable */
/* eslint-disable prettier/prettier */
import { CreateClaimParams } from 'sletat-api-services/lib/claims/createClaim/request';
import { createClaim as _createClaim } from 'sletat-api-services/lib/claims/createClaim';
import { CreateClaimResponse } from 'sletat-api-services/lib/claims/createClaim/response';
// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import { CLAIMS_HOST_NAME } from '../../../config/api-consts';
import { MODULE6_TARGET } from '../../../types-and-consts';


export function createClaim(params: CreateClaimParams): Promise<CreateClaimResponse> {
    return _createClaim({ host: CLAIMS_HOST_NAME, target: MODULE6_TARGET })(params)
        .then(response => response)
        .catch(err => {
            throw err;
        });
}
