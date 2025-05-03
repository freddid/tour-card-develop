/* eslint-disable */
/* eslint-disable prettier/prettier */
import {
    Customer as Module5Customer,
    Tourist as Module5Tourist,
    CreateClaimRequest,
    WrappedCreateClaimRequest
} from 'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaim/Request';

import {
    CreateClaimResponse as Module5ClaimResponse
} from 'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaim/Response';

import {
    CreateClaimExResponse as Module5ClaimExResponse
} from 'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaimEx/Response';

import {
    Customer as Module6Customer,
    Tourist as Module6Tourist,
} from 'sletat-api-services/lib/claims/models/create-claim';

import { CreateClaimParams as Module6ClaimRequest } from 'sletat-api-services/lib/claims/createClaim/request';
import { CreateClaimExParams as Module6ClaimExRequest } from 'sletat-api-services/lib/claims/createClaimEx/request';

import { CreateClaimResponse as Module6ClaimResponse } from 'sletat-api-services/lib/claims/createClaim/response';
import { CreateClaimExResponse as Module6ClaimExResponse } from 'sletat-api-services/lib/claims/createClaimEx/response';

export {
    Module5Customer, Module5Tourist,
    Module6Customer, Module6Tourist,
    CreateClaimRequest as Module5ClaimRequest,
    Module5ClaimResponse,
    Module5ClaimExResponse,
    Module6ClaimRequest,
    Module6ClaimExRequest,
    Module6ClaimResponse,
    Module6ClaimExResponse,
    WrappedCreateClaimRequest as WrappedCreateClaimRequestForModule5
};
export {
    AffiliateProgram,
    Gender,
    Title
} from 'sletat-api-services/lib/claims/models/create-claim';
