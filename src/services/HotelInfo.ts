/* eslint-disable */
/* eslint-disable prettier/prettier */
import { getHotelInfo } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfo';
import { GetHotelInfoResponse, IHotelInfo } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfoResponse';
import { GetHotelInfoRequest } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfoRequest';
import { Protocols } from 'sletat-api-services/lib/http/HttpClient';

import { BaseService } from '../types/BaseService';
import { TourCardServiceError, ServiceType, AvailableTypeError } from '../helpers/TourCardServiceError';


export interface HotelResultData {
    hotelInfo: IHotelInfo;
}

export class HotelInfo extends BaseService {

    callService(request: GetHotelInfoRequest): Promise<HotelResultData | void> {
        
        return getHotelInfo(request, { protocol: Protocols.HTTPS })
            .then((response: GetHotelInfoResponse) => {
                if (typeof this.onFinishCallback === 'function') {
                    this.onFinishCallback(null, this.extractHotelData(response));
                }
                return this.extractHotelData(response);
            })
            .catch((err: AvailableTypeError) => {
                err = new TourCardServiceError(err, ServiceType.GetHotelsInfo);
                if (typeof this.onFinishCallback === 'function') {
                    this.onFinishCallback(err as TourCardServiceError);
                }

                if (this.shouldThrowError) {
                    throw err;
                }
            });
    }

    private extractHotelData(response: GetHotelInfoResponse): HotelResultData {
        return {
            hotelInfo: response.hotelInfo
        };
    }
}
