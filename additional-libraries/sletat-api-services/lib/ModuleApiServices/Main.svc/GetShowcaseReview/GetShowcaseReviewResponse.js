"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGetShowcaseReviewResponseData = void 0;
var Showcase_1 = require("./Showcase");
function getGetShowcaseReviewResponseData(data) {
    return {
        showcases: (0, Showcase_1.getShowcases)(data)
    };
}
exports.getGetShowcaseReviewResponseData = getGetShowcaseReviewResponseData;
