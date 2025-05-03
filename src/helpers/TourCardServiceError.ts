/* eslint-disable */
/* eslint-disable prettier/prettier */
'use strict';

import { isError } from 'lodash';

export enum ServiceType {
    ActualizePrice,
    GetSettings,
    GetHotelsInfo,
    DetailedActualization,
    PriceByScheme
}

export enum ErrorStatus {
    TourNotFound,
    Default
}

export type AvailableTypeError = TourCardServiceError | Error | string;

export class TourCardServiceError extends Error {

    public status: ErrorStatus;
    public serviceType: ServiceType;

    constructor(err: AvailableTypeError, serviceType: ServiceType, status: ErrorStatus = ErrorStatus.Default) {
        if (err instanceof TourCardServiceError) {
            return err;
        } else if (isError(err)) {
            return new TourCardServiceError((err as Error).message, serviceType, status);
        }

        super(err as string);
        this.name = 'TourCardServiceError';
        this.serviceType = serviceType;
        this.status = status;

        // для V8
        if (typeof (Error as any).captureStackTrace === 'function') {
            (Error as any).captureStackTrace(this, this.constructor);
        }
    }
}
