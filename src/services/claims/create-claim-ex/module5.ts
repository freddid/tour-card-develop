/* eslint-disable */
/* eslint-disable prettier/prettier */
import { CreateClaimRequest } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaim/Request';
import { createClaimEx as _createClaimEx } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaimEx';
import { CreateClaimExResponse } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaimEx/Response';
import { Protocols } from 'sletat-api-services/lib/http/HttpClient';


export function createClaimEx(params: CreateClaimRequest): Promise<CreateClaimExResponse> {
    return _createClaimEx(params, { protocol: Protocols.HTTPS })
        .then(response => response)
        .catch(err => {
            throw err;
        });
}
