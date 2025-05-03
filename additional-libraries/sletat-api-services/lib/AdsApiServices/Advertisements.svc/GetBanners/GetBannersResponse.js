"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGetBannersResponseData = void 0;
var Banner_1 = require("./Banner");
var getGetBannersResponseData = function (data) { return ({
    banners: data.map(function (banner) { return new Banner_1.Banner(banner); })
}); };
exports.getGetBannersResponseData = getGetBannersResponseData;
