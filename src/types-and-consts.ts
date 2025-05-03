/* eslint-disable */
/* eslint-disable prettier/prettier */
import { CSSProperties } from 'react';
import { currency, target } from 'sletat-api-services/lib/types';
import { RequiredTourFormFields } from 'sletat-module-settings/dist/js/module6/model';
import { ModuleTypes } from './models/module';
export { target as Target };


/**
 * Значение параметра target в серсиах.
 * @type {string}
 */
export const TARGET = 'module-5.0' as target;
export const MODULE6_TARGET = 'module-6.0' as target;

export const MODULE_TARGET_PARAM_KEY = 'sletat_module_target';

export const MODULE_CLAIM_KIND_KEY = 'sletat_claim_kind';

export enum ClaimKind {
    Online = 'online',
    FromUrl = 'from-url'
}

/**
 * Идентификатор iframe-контейнера.
 * @type {string}
 */
export const IFRAME_ID = 'sletat-tour-card-iframe';

/**
 * Дефолтные стили iframe-компонента.
 * @type {{position: string; top: number; left: number; width: string; height: string; zIndex: number}}
 */
export const DEFAULT_IFRAME_STYLES: CSSProperties = {
    position: /iPad|iPhone|iPod/i.test(navigator.userAgent) ? 'absolute' : 'fixed',
    top: 0,

    // SLT-3900 Баг со скроллом в Chrome
    left: -1,
    width: 'calc(100% + 1px)',

    height: '100%',
    zIndex: 100000001
};

/**
 * Тип определяющий параметры тура.
 */
export interface TourCardParams {
    adults: number;
    countryId: number;
    currencyAlias: currency;
    kid1: number;
    kid2: number;
    kid3: number;
    kids: number;
    nights: number;
    offerId: number;
    price: number;
    requestId: number;
    sourceId: number;
    townId: number;
    townFromId: number;
    vkGroupId: number;
    tourFormRequiredFields: RequiredTourFormFields;
    moduleType: ModuleTypes | null;
    flightId: number | null;
}

/**
 * Возможные состояния актуализации.
 */
export enum ActualizationStatus {
    done = 0,
    unknown = 1,
    progress = 2,
    notFound = 3
}

/**
 * Состояние загрузки
 */
export enum LoadingState {
    notYetLoaded,
    success,
    fail,
    loading
}
