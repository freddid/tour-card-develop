var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import { isUndefined, debounce, range } from 'lodash';
import { UiComponent } from '../UiComponent';
import { UiThumbnailsPanel } from '../UiThumbnailsPanel/UiThumbnailsPanel';
import { UiCarousel } from '../UiCarousel/UiCarousel';
import { UiFullScreenGallery } from '../UiFullScreenGallery/UiFullScreenGallery';
import { ZoomIcon } from './ZoomIcon';
/**
 * задача: MODULES-866
 *
 * TODO selkin: что можно улучшить:
 * - добавить hotkeys для ряда действий (закрыть полноэкранный режим, листание)
 * - добавить swapping для touch устройств слайдеру в полноэкранном режиме
 */
var UiPhotoGallery = /** @class */ (function (_super) {
    __extends(UiPhotoGallery, _super);
    function UiPhotoGallery(props) {
        var _this = _super.call(this, props) || this;
        _this.resizeListenerHandler = debounce(function () { return _this.forceUpdate(); }, 200);
        _this.state = {
            fullScreenModeIsActive: false,
            activeSlideIndex: props.activeSlideIndex || 0,
            mounted: false,
            galleryContainerWidth: 0
        };
        return _this;
    }
    UiPhotoGallery.prototype.componentDidMount = function () {
        this.setState({ mounted: true });
        this.bindListenerOnWindowResize();
    };
    UiPhotoGallery.prototype.componentWillUnmount = function () {
        this.unbindListenerOnWindowResize();
    };
    UiPhotoGallery.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        return (React.createElement("div", { className: cx.root, ref: function (elem) { return (_this.containerElem = elem); } }, this.renderGallery()));
    };
    UiPhotoGallery.prototype.renderCarouselCounter = function () {
        if (typeof this.props.carouselImages.renderGalleryCounter !== 'function') {
            return null;
        }
        var cx = this.classes();
        var activeSlideIndex = this.state.activeSlideIndex;
        return (React.createElement("div", { className: cx.galleryCounter }, this.props.carouselImages.renderGalleryCounter({ activeSlideIndex: activeSlideIndex, countImages: this.countImages })));
    };
    UiPhotoGallery.prototype.renderCarouselThumbnails = function () {
        var _this = this;
        if (!this.carouselThumbnailsIsAvailable ||
            !this.props.carouselThumbnails ||
            (!!this.props.carouselThumbnails && this.countImages <= 1)) {
            return null;
        }
        return (React.createElement(UiThumbnailsPanel, { source: this.props.carouselThumbnails.source, count: this.props.count, selectedSlideIndex: this.state.activeSlideIndex, isInfinity: this.props.carouselThumbnails.isInfinity, isSwapping: this.props.carouselThumbnails.isSwapping, slideChangeDuration: this.props.carouselThumbnails.slideChangeDuration, slidesToShow: this.props.carouselThumbnails.slidesToShow, slidesToScroll: this.props.carouselThumbnails.slidesToScroll, slideMargin: this.props.carouselThumbnails.slideMargin, allowLongSwapping: this.props.carouselThumbnails.allowLongSwapping, isVisibleArrows: this.props.carouselThumbnails.isVisibleArrows, onChangeSelectedSlideIndex: function (index) {
                _this.setState({ activeSlideIndex: index });
            }, thumbsAlignment: this.props.carouselThumbnails.thumbsAlignment, bemModifications: this.props.bemModifications }));
    };
    UiPhotoGallery.prototype.renderFullScreenMode = function () {
        var _this = this;
        if (!this.fullScreenModeIsAvailable ||
            !this.state.fullScreenModeIsActive ||
            !this.props.fullScreenModeImages ||
            !this.props.fullScreenModeThumbnails) {
            return null;
        }
        return (React.createElement(UiFullScreenGallery, { images: {
                source: this.props.fullScreenModeImages.source,
                isVisibleArrows: this.props.fullScreenModeImages.isVisibleArrows,
                isInfinity: this.props.fullScreenModeImages.isInfinity
            }, count: this.props.count, thumbnails: {
                source: this.props.fullScreenModeThumbnails.source,
                isInfinity: this.props.fullScreenModeThumbnails.isInfinity,
                isSwapping: this.props.fullScreenModeThumbnails.isSwapping,
                slideChangeDuration: this.props.fullScreenModeThumbnails.slideChangeDuration,
                slidesToShow: this.props.fullScreenModeThumbnails.slidesToShow,
                slidesToScroll: this.props.fullScreenModeThumbnails.slidesToScroll,
                slideMargin: this.props.fullScreenModeThumbnails.slideMargin,
                allowLongSwapping: this.props.fullScreenModeThumbnails.allowLongSwapping,
                isVisibleArrows: this.props.fullScreenModeThumbnails.isVisibleArrows
            }, activeSlideIndex: this.state.activeSlideIndex, onCloseHandler: function (index) {
                _this.setState({ fullScreenModeIsActive: false });
            }, onChangeActiveSlideHandler: function (index) {
                _this.setState({ activeSlideIndex: index });
            }, bemModifications: this.props.bemModifications }));
    };
    UiPhotoGallery.prototype.renderFullScreenButton = function () {
        var _this = this;
        if (!this.fullScreenModeIsAvailable) {
            return null;
        }
        var cx = this.classes();
        return (React.createElement("button", { className: cx.fullScreenButton, onClick: function () {
                _this.setState({ fullScreenModeIsActive: true });
            } },
            React.createElement(ZoomIcon, null)));
    };
    UiPhotoGallery.prototype.renderGallery = function () {
        var _this = this;
        if (!this.state.mounted) {
            return null;
        }
        var cx = this.classes();
        return (React.createElement("div", { className: cx.gallery },
            React.createElement("div", { className: cx.carousel },
                this.renderCarouselCounter(),
                this.renderFullScreenButton(),
                React.createElement(UiCarousel, { slides: this.getCarouselImages(), activeSlideIndex: this.state.activeSlideIndex, isVisibleDots: this.showDots, dotsMode: this.props.carouselDotsMode, isInfinity: this.carouselImagesIsInfinity, isVisibleArrows: this.carouselArrowsIsVisible, bemModifications: this.props.bemModifications, shouldUpdateOnResize: false, isSwapping: this.props.carouselIsSwapping, allowLongSwapping: this.props.carouselAllowLongSwapping, onChangeActiveSlideIndex: function (index) {
                        _this.setState({ activeSlideIndex: index });
                    }, onSlideWidthChange: function (width) {
                        return _this.setState({ galleryContainerWidth: width });
                    } })),
            this.renderFullScreenMode(),
            this.renderCarouselThumbnails()));
    };
    UiPhotoGallery.prototype.classes = function () {
        var baseClass = 'uikit-gallery';
        return {
            root: this.classNames({
                prefix: baseClass,
                additionalClasses: this.props.wrapperClass
            }),
            fullScreenButton: this.classNames({
                prefix: baseClass + "__fullscreen-btn"
            }),
            gallery: this.classNames({
                prefix: baseClass + "__container"
            }),
            galleryCounter: this.classNames({
                prefix: baseClass + "__counter"
            }),
            carousel: this.classNames({
                prefix: baseClass + "__carousel"
            }),
            previewPanel: this.classNames({
                prefix: baseClass + "__preview-panel"
            }),
            loader: this.classNames({
                prefix: baseClass + "__loader"
            })
        };
    };
    Object.defineProperty(UiPhotoGallery.prototype, "shouldUpdateOnResize", {
        get: function () {
            return !!this.props.shouldUpdateOnResize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiPhotoGallery.prototype, "showDots", {
        get: function () {
            return !!this.props.showCarouselDots && !this.carouselThumbnailsIsAvailable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiPhotoGallery.prototype, "countImages", {
        get: function () {
            return this.props.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiPhotoGallery.prototype, "carouselArrowsIsVisible", {
        get: function () {
            return !isUndefined(this.props.carouselImages) ? !!this.props.carouselImages.isVisibleArrows : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiPhotoGallery.prototype, "carouselImagesIsInfinity", {
        get: function () {
            return !isUndefined(this.props.carouselImages.isInfinity) ? !!this.props.carouselImages.isInfinity : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiPhotoGallery.prototype, "carouselThumbnailsIsAvailable", {
        get: function () {
            return !isUndefined(this.props.carouselThumbnailsIsAvailable)
                ? !!this.props.carouselThumbnailsIsAvailable
                : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiPhotoGallery.prototype, "fullScreenModeIsAvailable", {
        get: function () {
            return !isUndefined(this.props.fullScreenModeIsAvailable) ? !!this.props.fullScreenModeIsAvailable : true;
        },
        enumerable: true,
        configurable: true
    });
    UiPhotoGallery.prototype.getCarouselImages = function () {
        var _this = this;
        var countImages = this.countImages;
        return range(0, countImages).map(function (i) {
            return _this.props.carouselImages.source({
                width: _this.state.galleryContainerWidth,
                i: i,
                selectedIndex: _this.state.activeSlideIndex
            });
        });
    };
    UiPhotoGallery.prototype.bindListenerOnWindowResize = function () {
        if (this.shouldUpdateOnResize) {
            window.addEventListener('resize', this.resizeListenerHandler);
        }
    };
    UiPhotoGallery.prototype.unbindListenerOnWindowResize = function () {
        if (this.shouldUpdateOnResize) {
            window.removeEventListener('resize', this.resizeListenerHandler);
        }
    };
    return UiPhotoGallery;
}(UiComponent));
export { UiPhotoGallery };
