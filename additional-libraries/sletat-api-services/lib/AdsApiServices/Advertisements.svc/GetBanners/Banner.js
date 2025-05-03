"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
var BannerImage_1 = require("./BannerImage");
var Banner = /** @class */ (function () {
    function Banner(data) {
        this.bannerId = data.BannerId;
        this.image = data.Image ? new BannerImage_1.BannerImage(data.Image) : null;
        this.alternativeImage = data.AlternativeImage ? new BannerImage_1.BannerImage(data.AlternativeImage) : null;
        this.bannerScript = data.BannerScript;
        this.redirectUrl = data.RedirectUrl;
        this.bannerTypeId = data.BannerTypeId;
        this.bannerTypeName = data.BannerTypeName;
    }
    return Banner;
}());
exports.Banner = Banner;
