import { CreateClaimExLiteParams } from 'sletat-api-services/lib/claims/createClaimExLite/request';
import { createTourOfficeClaim as _createTourOfficeClaim } from 'sletat-api-services/lib/claims/createTourOfficeClaim';
import { CreateTourOfficeClaimResponse } from 'sletat-api-services/lib/claims/createTourOfficeClaim/response';
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

export function createTourOfficeClaim(
  settings: CreateClaimExLiteLocalSettings,
  params: CreateClaimExLiteParams,
): Promise<CreateTourOfficeClaimResponse> {
  return _createTourOfficeClaim(params, {
    host: CLAIMS_HOST_NAME,
    target: settings.target,
  })
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
}
