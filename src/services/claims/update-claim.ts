/* eslint-disable */
/* eslint-disable prettier/prettier */
import { updateClaim as _updateClaim } from 'sletat-api-services/lib/claims/updateClaim';
import { UpdateClaimParams } from 'sletat-api-services/lib/claims/updateClaim/request';
import { UpdateClaimResponse } from 'sletat-api-services/lib/claims/updateClaim/response';
// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import { CLAIMS_HOST_NAME } from '../../config/api-consts';


export function updateClaim(params: UpdateClaimParams): Promise<UpdateClaimResponse> {
    return _updateClaim({ host: CLAIMS_HOST_NAME })(params)
        .then(response => response)
        .catch(err => {
            throw err;
        });
}
