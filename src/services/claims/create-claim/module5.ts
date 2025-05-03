/* eslint-disable */
/* eslint-disable prettier/prettier */
import { CreateClaimRequest, createClaimRequestWrapper } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaim/Request';
import { createClaim as _createClaim } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaim';
import { CreateClaimResponse } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaim/Response';
import { Protocols } from 'sletat-api-services/lib/http/HttpClient';

export { createClaimRequestWrapper as createClaimRequestWrapperForModule5 };


export function createClaim(params: CreateClaimRequest): Promise<CreateClaimResponse> {
     return _createClaim(params, { protocol: Protocols.HTTPS })
        .then(response => response)
        .catch((err) => {
            throw err;
        });
}
