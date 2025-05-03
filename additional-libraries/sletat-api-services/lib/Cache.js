"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.get = exports.has = exports.CacheTypes = void 0;
var tslib_1 = require("tslib");
var lscache = tslib_1.__importStar(require("lscache"));
var models_1 = require("sletat-common-utils/lib/models");
var Cache = new models_1.Dictionary();
var CacheTypes;
(function (CacheTypes) {
    CacheTypes[CacheTypes["Local"] = 0] = "Local";
    CacheTypes[CacheTypes["Dictionary"] = 1] = "Dictionary";
})(CacheTypes = exports.CacheTypes || (exports.CacheTypes = {}));
/**
 * Функция проверяющая наличие данных в кеше.
 */
function has(key, time, useLocalStorage) {
    if (useLocalStorage) {
        return lscache.get(key) != null;
    }
    var data = Cache.get(key);
    var now = new Date().getTime();
    return data != null && now <= data[0] + time;
}
exports.has = has;
/**
 * Функция получения данных их кеша.
 */
function get(key, useLocalStorage) {
    if (useLocalStorage) {
        return new Promise(function (resolve) { return resolve(lscache.get(key)); });
    }
    return new Promise(function (resolve) { return resolve(Cache.get(key)[1]); });
}
exports.get = get;
/**
 * Функция добавления данных в кеш.
 *
 * Ключ в виде: "lscache-http://uidev.sletat.ru/api/wheretobuy/offices{"$filter":"IsPaid"}"
 *
 * В Dictionary хранятся в виде:
 * | key, [save_timestamp, data] |
 */
function add(key, data, time, useLocalStorage) {
    if (useLocalStorage) {
        lscache.set(key, data, time / 60 / 1000);
    }
    else {
        Cache.set(key, [new Date().getTime(), data]);
    }
}
exports.add = add;
