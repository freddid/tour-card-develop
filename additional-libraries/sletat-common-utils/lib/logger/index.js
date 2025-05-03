"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var format_1 = __importDefault(require("date-fns/format"));
var isUndefined_1 = __importDefault(require("lodash/isUndefined"));
var Logger = /** @class */ (function () {
    function Logger(settings) {
        if (settings) {
            this.settings = settings;
        }
    }
    Logger.prototype.info = function (message) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (process.env.NODE_ENV === 'production' || !this.isLoggerActive) {
            return;
        }
        var markerStyle = [
            'font-weight: bold',
            'color: #afafaf'
        ].join(';');
        var timeStyle = [
            'color: #888888'
        ].join(';');
        var prefStyle = [
            'color: #7a7a7a',
            'font-size: 15px'
        ].join(';');
        var msgStyle = [
            'color: #afafaf',
            'font-size: 15px'
        ].join(';');
        var payload = data.length ? data : '';
        console.log(this.buildMessage('I', message), markerStyle, timeStyle, prefStyle, msgStyle, payload);
    };
    Logger.prototype.debug = function (message) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (process.env.NODE_ENV === 'production' || !this.isLoggerActive) {
            return;
        }
        var markerStyle = [
            'font-weight: bold',
            'color: #4c7a9b'
        ].join(';');
        var timeStyle = [
            'color: #222222'
        ].join(';');
        var prefStyle = [
            'color: #073670',
            'font-size: 15px'
        ].join(';');
        var msgStyle = [
            'color: #4275b7',
            'font-size: 15px'
        ].join(';');
        var payload = data.length ? data : '';
        console.log(this.buildMessage('D', message), markerStyle, timeStyle, prefStyle, msgStyle, payload);
    };
    Logger.prototype.warn = function (message) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (process.env.NODE_ENV === 'production' || !this.isLoggerActive) {
            return;
        }
        var markerStyle = [
            'font-weight: bold',
            'color: #ed631e'
        ].join(';');
        var timeStyle = [
            'color: #222222'
        ].join(';');
        var prefStyle = [
            'color: #dd4900',
            'font-size: 15px'
        ].join(';');
        var msgStyle = [
            'color: #ef5a23',
            'font-size: 15px'
        ].join(';');
        var payload = data.length ? data : '';
        console.log(this.buildMessage('W', message), markerStyle, timeStyle, prefStyle, msgStyle, payload);
    };
    Object.defineProperty(Logger.prototype, "msgPref", {
        get: function () {
            if (!this.settings || !this.settings.messagePrefix) {
                return '';
            }
            return this.settings.messagePrefix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "isLoggerActive", {
        get: function () {
            if (!this.settings || isUndefined_1.default(this.settings.isLoggerActive)) {
                return true;
            }
            return !!this.settings.isLoggerActive;
        },
        enumerable: true,
        configurable: true
    });
    Logger.prototype.buildMessage = function (type, text) {
        return "%c[" + type + "] %c(" + format_1.default(new Date(), 'HH:mm:ss.SSS') + ")  %c" + this.msgPref + "%c" + text;
    };
    return Logger;
}());
exports.Logger = Logger;
