"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTemplatesResponse = exports.getGetTemplatesResponseData = void 0;
var Template_1 = require("./Template");
function getGetTemplatesResponseData(data) {
    return {
        templates: (0, Template_1.makeTemplates)(data.templates)
    };
}
exports.getGetTemplatesResponseData = getGetTemplatesResponseData;
var GetTemplatesResponse = /** @class */ (function () {
    function GetTemplatesResponse() {
    }
    return GetTemplatesResponse;
}());
exports.GetTemplatesResponse = GetTemplatesResponse;
