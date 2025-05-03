/* eslint-disable */
/* eslint-disable prettier/prettier */
'use strict';

import { TourCardServiceError } from '../helpers/TourCardServiceError';


export type CallbackType<T> = (err: TourCardServiceError | null, data?: T) => void;

export abstract class BaseService {

    onFinishCallback: CallbackType<any>;

    constructor(protected shouldThrowError = true) {
        this.shouldThrowError = shouldThrowError;
    }

    onFinish(callback: CallbackType<any>) {
        this.onFinishCallback = callback;
    }

    abstract callService(request: any, params?: any): Promise<any>;
}
