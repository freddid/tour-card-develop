"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTourCardInfo = void 0;
var GetSettings_1 = require("../../ClaimApiServices/Main.svc/GetSettings/GetSettings");
var ActualizePrice_1 = require("./ActualizePrice/ActualizePrice");
var GetActualizationResultAsync_1 = require("./GetActualizationResult/GetActualizationResultAsync");
var GetHotelInfo_1 = require("./GetHotelInfo/GetHotelInfo");
function getTourCardInfo(params) {
    // Сначала пытаемся получить базовую информацию по туру.
    return Promise.all([
        (0, ActualizePrice_1.actualizePrice)(params),
        (0, GetHotelInfo_1.getHotelInfo)(getGetHotelInfoRequest(params)),
        (0, GetSettings_1.getClaimsSettings)(getGetClaimsSettingsRequest(params))
    ])
        .then(function (array) {
        return {
            actualization: array[0],
            hotelInfo: array[1],
            claimsSettings: array[2]
        };
        // Если базовая актуализация не прошла, то даже не пытаемся начиловать сервис детальной актуализации.
    })
        .then(function (baseInfo) {
        var actualization = baseInfo.actualization, hotelInfo = baseInfo.hotelInfo, claimsSettings = baseInfo.claimsSettings;
        if (actualization.isError || !actualization.isFound) {
            return {
                actualization: actualization,
                hotelInfo: hotelInfo,
                claimsSettings: claimsSettings,
                detailActualization: null
            };
        }
        return {
            actualization: actualization,
            hotelInfo: hotelInfo,
            claimsSettings: claimsSettings,
            detailActualization: (0, GetActualizationResultAsync_1.getActualizationResultAsync)(params, params)
        };
    });
}
exports.getTourCardInfo = getTourCardInfo;
function getGetHotelInfoRequest(params) {
    var result = {
        // @ts-ignore
        hotelId: params.hotelId
    };
    // @ts-ignore
    if (params.userId) {
        // @ts-ignore
        result.userId = params.userId;
    }
    // @ts-ignore
    if (params.target) {
        // @ts-ignore
        result.target = params.target;
    }
    return result;
}
function getGetClaimsSettingsRequest(params) {
    var result = {
        // @ts-ignore
        host: params.host,
        // @ts-ignore
        requestId: params.requestId,
        // @ts-ignore
        sourceId: params.sourceId,
        // @ts-ignore
        offerId: params.offerId
    };
    // @ts-ignore
    if (params.target) {
        // @ts-ignore
        result.target = params.target;
    }
    return result;
}
