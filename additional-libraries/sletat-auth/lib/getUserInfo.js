"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canUseDOM_1 = require("sletat-common-utils/lib/canUseDOM");
var userInfo_1 = require("./userInfo");
function getUserInfo() {
    return window.userInfo && window.userInfo.getState();
}
exports.getUserInfo = getUserInfo;
function getIsomorphicUserInfo() {
    return canUseDOM_1.canUseDOM
        ? getUserInfo()
        : userInfo_1.emptyUserInfo;
}
exports.getIsomorphicUserInfo = getIsomorphicUserInfo;
