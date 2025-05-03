"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTemplates = void 0;
var getTemplate = function (data) {
    return {
        departureCityName: data.departureCity,
        departureCityID: data.departureCityId,
        ID: data.id,
        name: data.name
    };
};
var makeTemplates = function (templates) {
    return templates.map(function (template) { return getTemplate(template); });
};
exports.makeTemplates = makeTemplates;
