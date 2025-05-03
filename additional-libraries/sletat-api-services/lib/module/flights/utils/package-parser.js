"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightsPackageParser = void 0;
var tslib_1 = require("tslib");
var groupBy_1 = tslib_1.__importDefault(require("lodash/groupBy"));
var isNumber_1 = require("../../../utils/isNumber");
var models_1 = require("../../tourActualization/models");
var types_1 = require("../../../types");
var parser_1 = require("./parser");
function flightsPackageParser(parsingData, shouldGetLastTransferArrivalDateOnly) {
    if (shouldGetLastTransferArrivalDateOnly === void 0) { shouldGetLastTransferArrivalDateOnly = true; }
    var flightsResources = parsingData.resources
        .filter(function (res) {
        return [models_1.ResourceTypes.flightTo, models_1.ResourceTypes.flightFrom, models_1.ResourceTypes.transferFlight].includes(res.type);
    })
        .filter(function (res) {
        return ((0, isNumber_1.isNumber)(res.linkGroupsId) &&
            res.surchargeCurrencyId === types_1.CurrencyId[parsingData.actualizedTour.currency]) ||
            res.isChecked;
    });
    var groupedFlightsResources = (0, groupBy_1.default)(flightsResources, 'linkGroupsId');
    return Object.keys(groupedFlightsResources).map(function (linkGroupId) {
        return (0, parser_1.flightsParser)(tslib_1.__assign(tslib_1.__assign({}, parsingData), { resources: groupedFlightsResources[linkGroupId] }), { isMultiFlights: true, shouldGetLastTransferArrivalDateOnly: shouldGetLastTransferArrivalDateOnly });
    });
}
exports.flightsPackageParser = flightsPackageParser;
