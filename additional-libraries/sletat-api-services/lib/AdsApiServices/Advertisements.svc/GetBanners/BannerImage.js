"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerImage = void 0;
var removeProtocolFromURL_1 = require("sletat-common-utils/lib/removeProtocolFromURL");
var BannerImage = /** @class */ (function () {
    function BannerImage(data) {
        this.id = data.Id;
        this.url = (0, removeProtocolFromURL_1.removeProtocolFromURL)(data.Url);
        this.extension = data.Extension;
        this.width = data.Width;
        this.height = data.Height;
    }
    return BannerImage;
}());
exports.BannerImage = BannerImage;
