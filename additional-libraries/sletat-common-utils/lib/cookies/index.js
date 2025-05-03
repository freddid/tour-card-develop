"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @deprecated, из данного пакета функция используется в deprecated-сервисе createLead в sletat-api-services,
 * который в свою очередь используется в sletat-offices, приложении tour-card и в компоненте CallMeButton
 * use js-cookie lib
 */
function cookies(key, value, options) {
    if (options === void 0) { options = {}; }
    if (arguments.length > 1 && String(value) !== '[object Object]') {
        // value = decodeURI(value);
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        value = String(value);
        var newCookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            "; path=" + (options.path ? options.path : '/'),
            options.domain ? ('; domain=' + options.domain + ';') : '',
            options.secure ? '; secure' : ''
        ].join('');
        return (document.cookie = newCookie);
    }
    // key and possibly options given, get cookie...
    options = value || {};
    var result;
    var decode = options.raw ? function (s) {
        return s;
    } : decodeURIComponent;
    result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie);
    return result ? decode(result[1]) : null;
}
exports.cookies = cookies;
