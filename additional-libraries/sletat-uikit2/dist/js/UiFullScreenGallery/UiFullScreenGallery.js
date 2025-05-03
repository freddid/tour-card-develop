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
import { UiComponent } from '../UiComponent';
import { UiThumbnailsPanel } from '../UiThumbnailsPanel/UiThumbnailsPanel';
import { ArrowIcon } from '../UiCarousel/ArrowIcon';
import { CloseIcon } from '../UiPhotoGallery/CloseIcon';
/**
 * используется как часть компонента UiPhotoGallery
 */
var UiFullScreenGallery = /** @class */ (function (_super) {
    __extends(UiFullScreenGallery, _super);
    function UiFullScreenGallery(props) {
        var _this = _super.call(this, props) || this;
        _this.containerElem = null;
        _this.onChangeActiveSlideHandler = function (selectedSlideIndex) {
            if (_this.state.activeSlideIndex === selectedSlideIndex) {
                return;
            }
            _this.setState({ activeSlideIndex: selectedSlideIndex });
            if (typeof _this.props.onChangeActiveSlideHandler === 'function') {
                _this.props.onChangeActiveSlideHandler(selectedSlideIndex);
            }
        };
        _this.onNextHandler = function (e) {
            var nextSlideIndex = _this.state.activeSlideIndex + 1;
            var countImages = _this.countImages;
            var isInfinity = _this.isInfinity;
            var isFinish = nextSlideIndex >= countImages;
            if (isInfinity && isFinish) {
                nextSlideIndex = 0;
            }
            if (nextSlideIndex === _this.state.activeSlideIndex || (!isInfinity && isFinish)) {
                return;
            }
            _this.setState({ activeSlideIndex: nextSlideIndex }, function () {
                if (typeof _this.props.onChangeActiveSlideHandler === 'function') {
                    _this.props.onChangeActiveSlideHandler(nextSlideIndex);
                }
            });
        };
        _this.onPrevHandler = function (e) {
            var prevSlideIndex = _this.state.activeSlideIndex - 1;
            var isFinish = prevSlideIndex < 0;
            var isInfinity = _this.isInfinity;
            if (isInfinity && isFinish) {
                prevSlideIndex = _this.countImages - 1;
            }
            if (prevSlideIndex === _this.state.activeSlideIndex || (!isInfinity && isFinish)) {
                return;
            }
            _this.setState({ activeSlideIndex: prevSlideIndex }, function () {
                if (typeof _this.props.onChangeActiveSlideHandler === 'function') {
                    _this.props.onChangeActiveSlideHandler(prevSlideIndex);
                }
            });
        };
        _this.onCloseButtonHandler = function (e) {
            if (typeof _this.props.onCloseHandler === 'function') {
                _this.props.onCloseHandler(_this.state.activeSlideIndex);
            }
        };
        _this.state = {
            activeSlideIndex: props.activeSlideIndex || 0,
            mounted: false
        };
        return _this;
    }
    UiFullScreenGallery.prototype.componentWillReceiveProps = function (nextProps) {
        if (typeof nextProps.activeSlideIndex === 'number' &&
            nextProps.activeSlideIndex !== this.state.activeSlideIndex) {
            this.setState({
                activeSlideIndex: nextProps.activeSlideIndex
            });
        }
    };
    UiFullScreenGallery.prototype.componentDidMount = function () {
        this.setState({ mounted: true });
    };
    UiFullScreenGallery.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        return (React.createElement("div", { className: cx.root, ref: function (elem) { return (_this.containerElem = elem); } }, this.renderGalleryContent()));
    };
    UiFullScreenGallery.prototype.renderGalleryContent = function () {
        if (!this.state.mounted) {
            return null;
        }
        var cx = this.classes();
        return (React.createElement("div", { className: cx.content },
            this.renderImageContainer(),
            this.renderCloseButton(),
            this.renderArrows(),
            this.renderThumbnails()));
    };
    UiFullScreenGallery.prototype.renderCloseButton = function () {
        var cx = this.classes();
        return (React.createElement("button", { className: cx.closeButton, onClick: this.onCloseButtonHandler },
            React.createElement(CloseIcon, null)));
    };
    UiFullScreenGallery.prototype.renderArrows = function () {
        if (!this.moreThanOnePhoto || this.props.images.isVisibleArrows === false) {
            return null;
        }
        var cx = this.classes();
        return (React.createElement("div", { className: cx.arrowsContainer },
            React.createElement("button", { className: cx.leftArrow, onClick: this.onPrevHandler },
                React.createElement(ArrowIcon, { width: 27, height: 46 })),
            React.createElement("button", { className: cx.rightArrow, onClick: this.onNextHandler },
                React.createElement(ArrowIcon, { width: 27, height: 46 }))));
    };
    UiFullScreenGallery.prototype.renderThumbnails = function () {
        if (!this.moreThanOnePhoto) {
            return null;
        }
        var cx = this.classes();
        return (React.createElement("div", { className: cx.thumbnailsContainer },
            React.createElement("div", { className: cx.thumbnails },
                React.createElement(UiThumbnailsPanel, { source: this.props.thumbnails.source, count: this.countImages, selectedSlideIndex: this.state.activeSlideIndex, isInfinity: this.props.thumbnails.isInfinity, isSwapping: this.props.thumbnails.isSwapping, slideChangeDuration: this.props.thumbnails.slideChangeDuration, slidesToShow: this.props.thumbnails.slidesToShow, slidesToScroll: this.props.thumbnails.slidesToScroll, slideMargin: this.props.thumbnails.slideMargin, allowLongSwapping: this.props.thumbnails.allowLongSwapping, isVisibleArrows: this.props.thumbnails.isVisibleArrows, onChangeSelectedSlideIndex: this.onChangeActiveSlideHandler, bemModifications: (this.props.bemModifications || []).concat('full-screen') }))));
    };
    UiFullScreenGallery.prototype.renderImageContainer = function () {
        var cx = this.classes();
        return (React.createElement("div", { className: cx.imageContainer },
            React.createElement("div", { className: cx.imageSlide }, this.props.images.source({
                width: this.containerElem ? this.containerElem.offsetWidth : 0,
                i: this.state.activeSlideIndex,
                selectedIndex: this.state.activeSlideIndex
            }))));
    };
    UiFullScreenGallery.prototype.classes = function () {
        var baseClass = 'uikit-gallery-full-screen';
        return {
            root: this.classNames({
                prefix: baseClass,
                additionalClasses: this.props.wrapperClass
            }),
            content: this.classNames({
                prefix: baseClass + "__content"
            }),
            closeButton: this.classNames({
                prefix: baseClass + "__close"
            }),
            imageContainer: this.classNames({
                prefix: baseClass + "__img-container"
            }),
            arrowsContainer: this.classNames({
                prefix: baseClass + "__arrows-container"
            }),
            thumbnailsContainer: this.classNames({
                prefix: baseClass + "__thumbnails-container"
            }),
            thumbnails: this.classNames({
                prefix: baseClass + "__thumbnails"
            }),
            leftArrow: this.classNames({
                prefix: baseClass + "__arrow",
                modifications: [
                    {
                        left: true,
                        disabled: this.prevIsDisabled
                    }
                ]
            }),
            rightArrow: this.classNames({
                prefix: baseClass + "__arrow",
                modifications: [
                    {
                        right: true,
                        disabled: this.nextIsDisabled
                    }
                ]
            }),
            imageSlide: this.classNames({
                prefix: baseClass + "__img-slide"
            }),
            image: this.classNames({
                prefix: baseClass + "__image"
            })
        };
    };
    Object.defineProperty(UiFullScreenGallery.prototype, "isInfinity", {
        get: function () {
            return !!this.props.images.isInfinity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiFullScreenGallery.prototype, "moreThanOnePhoto", {
        get: function () {
            return this.countImages > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiFullScreenGallery.prototype, "countImages", {
        get: function () {
            return this.props.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiFullScreenGallery.prototype, "nextIsDisabled", {
        get: function () {
            return !this.isInfinity && this.state.activeSlideIndex >= this.countImages - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiFullScreenGallery.prototype, "prevIsDisabled", {
        get: function () {
            return !this.isInfinity && this.state.activeSlideIndex <= 0;
        },
        enumerable: true,
        configurable: true
    });
    return UiFullScreenGallery;
}(UiComponent));
export { UiFullScreenGallery };
