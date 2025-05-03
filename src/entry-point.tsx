/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { IFrameComponent } from 'sletat-ui-components/lib/IFrame/IFrame';
import { currency } from 'sletat-api-services/lib/types';
import { getIntegerFromString } from 'sletat-common-utils/lib/parse/fromString';

import { CardController } from './CardController';
import { CardPolyfill, DestroyOptions } from './CardPolyfill';
import { Module5Config } from './config/Module5Config';
import { STYLES_PATH } from './config/general-constants';
import {
    getBodyOverflow,
    getPageSettingsForIOS,
    setBodyOverflowHidden,
    setPageSettingsForIOS,
    returnPreviousBodyOverflow,
    returnPreviousPageSettingsForIOS
} from './body-overflow';
import { TourCardParams, IFRAME_ID, DEFAULT_IFRAME_STYLES } from './types-and-consts';
import { MetricLogger } from './utils';
import { ModuleTypes } from './models/module';

export interface EntryPointParams {
    tourCardParams: TourCardParams;
    themeName: string;
    config: Module5Config;
}

interface TourCardActions {
    destroy: (options?: DestroyOptions) => void;
}

interface TransportObject {
    cardPolyFill: CardPolyfill;
    cardActions: TourCardActions;
}

export const CONTAINER_ID = 'sletat-tour-card-container';


// [MODULES-852] Раньше для работы виджета от twitter нужен был доп. скрипт:
// { src: '//platform.twitter.com/js/button.adb0849e84c310377153816f932c5b36.js', charset: 'utf-8', async: true }
// сейчас он выпилен, т.к в настоящее время из-за него не появляется соответствующая кнопка шаринга.

export function entryPoint(params: EntryPointParams) {
    // Перестраховываемся!
    params.tourCardParams = getCorrectTourCardParams(params.tourCardParams);
    // Мерзкий костыль для применения таргета только с МП6.0, т.к с 5-ки был хардкод
    if (!params.config.useTarget) {
        delete params.config['target'];
    }

    // TODO: dmtrv Нужно и конфиг перепроверять!
    return new Promise((resolve, reject) => {
        if (!params || !params.tourCardParams || !params.config) {
            reject(new Error('Отсутствуют или некорректные параметры инициализации!'));
        }

        // TODO: dmtrv Нужен компонент попапа.
        const container = createContainer();
        const cardPolyFill = new CardPolyfill(container);
        window.document.body.appendChild(container);
        const bodyOverflow = getBodyOverflow();
        const pageSettingsForIOS = getPageSettingsForIOS();
        setBodyOverflowHidden();
        setPageSettingsForIOS();
        initializeYandexMetrika(params.config.yandexMetrika || null);

        const transportObject: TransportObject = {
            cardPolyFill,
            cardActions: {
                destroy: (options: DestroyOptions) => {
                    cardPolyFill.destroy(options);
                    unmountComponentAtNode(container);
                    returnPreviousBodyOverflow(bodyOverflow);
                    returnPreviousPageSettingsForIOS(pageSettingsForIOS);
                    removeContainer();
                }
            }
        };
        
        render(
            <IFrameComponent
                id={IFRAME_ID}
                data-target={params.config.target}
                scripts={[
                    { src: '//connect.ok.ru/connect.js', charset: 'windows-1251', async: true },
                ]}
                styleSheets={getStyles(params.themeName).concat(params.config.files || []).
                    map(style => process.env.NODE_ENV != "production" ? `${style}?t=${new Date().getTime()}` : style)}
                style={DEFAULT_IFRAME_STYLES}
                inlineHeadStyles={params.config.customStyles}
                frameBorder={'no'}
            >
                <CardController
                    tourCardParams={params.tourCardParams}
                    // Быстрое переключение конфига
                    config={params.config}
                    cardPolyfill={cardPolyFill}
                    onClose={() => transportObject.cardActions.destroy({ clearHash: true })}
                />
            </IFrameComponent>,
            container
        );
        resolve(transportObject);
    });
}

const NAMESPACE_NAME = 'sletat';
const namespace = ((window as any)[NAMESPACE_NAME] = ((window as any)[NAMESPACE_NAME] || {}));
/* tslint:disable-next-line:no-string-literal */
namespace['TourCard'] = entryPoint;

function getCorrectTourCardParams(params: any): TourCardParams {
    return {
        adults: getIntegerFromString(String(params.adults || '')) || 0,
        countryId: getIntegerFromString(String(params.countryId || '')) || 0,
        currencyAlias: String(params.currency) as currency,
        kid1: getIntegerFromString(String(params.kid1 || '')) || 0,
        kid2: getIntegerFromString(String(params.kid2 || '')) || 0,
        kid3: getIntegerFromString(String(params.kid3 || '')) || 0,
        kids: getIntegerFromString(String(params.kids || '')) || 0,
        nights: getIntegerFromString(String(params.nights || '')) || 0,
        offerId: getIntegerFromString(String(params.offerId || '')) || 0,
        price: getIntegerFromString(String(params.price || '')) || 0,
        requestId: getIntegerFromString(String(params.requestId || '')) || 0,
        sourceId: getIntegerFromString(String(params.sourceId || '')) || 0,
        townId: getIntegerFromString(String(params.townId || '')) || 0,
        townFromId: getIntegerFromString(String(params.townFromId || '')) || 0,
        vkGroupId: getIntegerFromString(String(params.vkGroupId || '')) || 0,
        tourFormRequiredFields: getIntegerFromString(String(params.tourFormRequiredFields || '')) || 0,
        moduleType: params.moduleType ? String(params.moduleType) as ModuleTypes : null,
        flightId: getIntegerFromString(String(params.flightId || '')) || 0,
    };
}

function createContainer() {
    const container = window.document.createElement('div');
    container.id = CONTAINER_ID;
    return container;
}

function removeContainer() {
    const container = window.document.getElementById(CONTAINER_ID);
    if (!!container) {
        (container.parentNode as Node).removeChild(container);
    }
}

function transformTheme(themeName: string) {
    const postfix = '_dec2015';

    // обрубим постфикс для модерн-тем
    let foundIndex: number = themeName.indexOf(postfix);
    let withoutPrefix: string = foundIndex === -1
        ? themeName
        : themeName.slice(0, foundIndex);

    switch (withoutPrefix) {
        case 'franchise_default':
            return 'franchise';

        case 'newyear':
            return 'default';

        default:
            return withoutPrefix;
    }
}

function getStyles(theme: string): Array<string> {
    let styles = [
        `https://markup.sletat.ru/css/common.min.css`,
        `${STYLES_PATH}main.css`
    ];

    theme = transformTheme(theme);

    styles.push(`${STYLES_PATH}theme/${theme}.css`);
    return styles;
}

function initializeYandexMetrika(metrika: MetricLogger | null): void {
    if (!metrika) {
        return;
    }
    (window as any)['metrikaLogger'] = metrika;
}
