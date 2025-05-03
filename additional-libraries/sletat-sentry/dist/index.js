var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as Raven from 'raven-js';
import { removeChangeListener } from 'sletat-auth/lib/removeChangeListener';
import { addChangeListener } from 'sletat-auth/lib/addChangeListener';
import { canUserAuth } from 'sletat-auth/lib/canUserAuth';
import { getUserInfo } from 'sletat-auth/lib/getUserInfo';
/**
 * TODO selkin: строковые enum поддерживаются с 2.4 версии TS.
 * увы, но сейчас не все проекты на сайте использует TS 2.4 и выше
 * из-за этого сделал через кастинг, но после нужно будет сделать через строковый enum нормально
 */
export var DSNType;
(function (DSNType) {
    DSNType[DSNType["mainSiteCloud"] = 'https://0a2b2bfb6013486ebb44c51258ebac52@sentry.io/277394'] = "mainSiteCloud";
    DSNType[DSNType["mobileSiteCloud"] = 'https://9e1ac06effdb403cb4d0a7ebbde3967f@sentry.io/277490'] = "mobileSiteCloud";
    DSNType[DSNType["okAppCloud"] = 'https://f63891df990f4507b5b28ddc86753786@sentry.io/277491'] = "okAppCloud";
    DSNType[DSNType["tourmometrCloud"] = 'https://8b219bedf5c147b8b609d20339fa8d46@sentry.io/277492'] = "tourmometrCloud";
})(DSNType || (DSNType = {}));
// SLT-2360 - список ошибок сторонних приложений,
// которые нужно игнорировать, ибо они прилетают очень часто
var ISSUES_TO_IGNORE = [
    'document.getElementsByClassName.ToString is not a function',
    'Can\'t find variable: yndx_svtn_e',
    'Set is not defined',
    'NO_DATA_ALLOWED_ERR',
    'Cannot read property \'zoom\' of null',
    'Blocked a frame with origin "https://sletat.ru" from accessing a frame with origin "https://8530831.fls.doubleclick.net"',
    'Can\'t find variable: fieldset',
    'diableNightMode is not defined',
    'removeNightMode is not defined',
    'Can\'t find variable: mrAddCustomDoubleClickHandler',
    'Unable to get property \'setPosition\' of undefined or null reference',
    'Can\'t find variable: OperaIce'
];
export function init(params) {
    if (canUserAuth()) {
        trackingAuthHandler();
    }
    return Raven.config(params.dsn, {
        ignoreErrors: ISSUES_TO_IGNORE
    })
        .setTagsContext({
        hostname: location.hostname
    })
        .setRelease(params.release || '')
        .setEnvironment(params.environment || 'production')
        .install();
}
export function logInfo(msg, opts) {
    if (opts === void 0) { opts = {}; }
    return Raven.captureMessage(msg, __assign({}, opts, { level: 'info' }));
}
export function logWarning(msg, opts) {
    if (opts === void 0) { opts = {}; }
    return Raven.captureMessage(msg, __assign({}, opts, { level: 'warning' }));
}
export function logError(ex, opts) {
    return Raven.captureException(ex, opts ? opts : undefined);
}
export function startTrackingAuth() {
    if (canUserAuth()) {
        addChangeListener(trackingAuthHandler);
    }
}
export function stopTrackingAuth() {
    if (canUserAuth()) {
        removeChangeListener(trackingAuthHandler);
    }
}
function trackingAuthHandler() {
    var userInfo = getUserInfo();
    Raven.setUserContext(!userInfo.id ? {} : {
        username: userInfo.userName,
        id: userInfo.id,
        email: userInfo.email
    });
}
