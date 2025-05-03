/* eslint-disable */
/* eslint-disable prettier/prettier */
import { CreateClaimExParams } from 'sletat-api-services/lib/claims/createClaimEx/request';
import { createClaimEx as _createClaimEx } from 'sletat-api-services/lib/claims/createClaimEx';
import { CreateClaimExResponse } from 'sletat-api-services/lib/claims/createClaimEx/response';
// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import { CLAIMS_HOST_NAME } from '../../../config/api-consts';
import { MODULE6_TARGET } from '../../../types-and-consts';


export function createClaimEx(params: CreateClaimExParams): Promise<CreateClaimExResponse> {
    return _createClaimEx(params, { host: CLAIMS_HOST_NAME, target: MODULE6_TARGET })
        .then(response => response)
        .catch(err => {
            throw err;
        });
}
