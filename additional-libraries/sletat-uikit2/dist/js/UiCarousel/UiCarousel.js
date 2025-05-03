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
import { range, isUndefined, debounce } from 'lodash';
import { Motion, spring } from 'react-motion';
import { UiAdaptiveComponent } from '../UiAdaptiveComponent';
import { SliderListener, SwipeActions } from '../utils/touch';
import { UiDots, DotsModes } from './UiDots';
import { UiArrow, ArrowType } from './UiArrow';
export var AlignmentMode;
(function (AlignmentMode) {
    AlignmentMode["Centered"] = "centered";
    AlignmentMode["Left"] = "left";
})(AlignmentMode || (AlignmentMode = {}));
var UiCarousel = /** @class */ (function (_super) {
    __extends(UiCarousel, _super);
    function UiCarousel(props) {
        var _this = _super.call(this, props) || this;
        _this.containerRef = null;
        _this.containerWidth = 0;
        _this.resizeListenerHandler = debounce(function () { return _this.forceUpdate(); }, 200);
        _this.mouseUpHandler = function (event) {
            document.removeEventListener('mousemove', _this.mouseMoveHandler);
            document.removeEventListener('mouseup', _this.mouseUpHandler);
            _this.sliderListener.handleTouchEnd(event, false);
        };
        _this.mouseMoveHandler = function (event) {
            _this.sliderListener.handleTouchMove(event, false);
        };
        _this.state = {
            activeSlideIndex: _this.props.activeSlideIndex || 0,
            offsetDuringSwipe: 0,
            isComponentMounted: false,
        };
        _this.sliderListener = new SliderListener();
        _this.sliderListener.bindCallbackOnSwipe(function (state) { return _this.onTouchSwipe(state); });
        _this.sliderListener.bindCallbackOnSliderMove(function (offset) { return _this.onTouchSliderMove(offset); });
        return _this;
    }
    UiCarousel.prototype.componentDidMount = function () {
        this.bindListenerOnWindowResize();
        this.setState({ isComponentMounted: true });
    };
    UiCarousel.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.activeSlideIndex !== this.props.activeSlideIndex) {
            this.setState({ activeSlideIndex: newProps.activeSlideIndex });
        }
    };
    UiCarousel.prototype.componentDidUpdate = function () {
        if (this.containerRef && this.containerWidth !== this.containerRef.offsetWidth) {
            this.containerWidth = this.containerRef.offsetWidth;
            if (typeof this.props.onSlideWidthChange === 'function') {
                this.props.onSlideWidthChange(Math.floor(this.singleSlideWidth));
            }
        }
    };
    UiCarousel.prototype.componentWillUnmount = function () {
        this.unbindListenerOnWindowResize();
    };
    Object.defineProperty(UiCarousel.prototype, "isSwapping", {
        get: function () {
            return isUndefined(this.props.isSwapping) || !!this.props.isSwapping;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "isMouseSwapping", {
        get: function () {
            return isUndefined(this.props.isMouseSwapping) || !!this.props.isMouseSwapping;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "allowLongSwapping", {
        get: function () {
            return isUndefined(this.props.allowLongSwapping) || !!this.props.allowLongSwapping;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "slideChangeDuration", {
        get: function () {
            return typeof this.props.slideChangeDuration === 'number' ? this.props.slideChangeDuration : 250;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "slideMargin", {
        get: function () {
            return typeof this.props.slideMargin === 'number' ? this.props.slideMargin : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "slidesToShow", {
        get: function () {
            return typeof this.props.slidesToShow === 'number' ? this.props.slidesToShow : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "slidesToScroll", {
        get: function () {
            return typeof this.props.slidesToScroll === 'number' ? this.props.slidesToScroll : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "contentContainerWidth", {
        get: function () {
            return this.containerRef ? this.containerRef.offsetWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "singleSlideWidth", {
        get: function () {
            return (this.contentContainerWidth - this.slideMargin * this.slidesToShow * 2) / this.slidesToShow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "singleSlideWidthWithMargin", {
        get: function () {
            return this.singleSlideWidth + this.slideMargin * 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "fullContentWidth", {
        get: function () {
            return this.props.slides.length * this.singleSlideWidthWithMargin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "activeSlideIndex", {
        get: function () {
            return this.state.activeSlideIndex;
        },
        set: function (value) {
            this.setState({
                activeSlideIndex: value,
                offsetDuringSwipe: 0
            });
            if (this.props.onChangeActiveSlideIndex) {
                this.props.onChangeActiveSlideIndex(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "slidesLessThanVisible", {
        get: function () {
            return this.props.slides.length < this.slidesToShow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "slidesLessOrEqualThanVisible", {
        get: function () {
            return this.props.slides.length <= this.slidesToShow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "contentLeftOffset", {
        get: function () {
            if (this.slidesLessThanVisible && this.isSlidesAlignmentCentered) {
                return Math.round(this.contentContainerWidth - this.fullContentWidth) / 2;
            }
            return -(this.singleSlideWidthWithMargin * this.state.activeSlideIndex) + this.state.offsetDuringSwipe;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "isVisibleDots", {
        get: function () {
            return isUndefined(this.props.isVisibleDots) || !!this.props.isVisibleDots;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "dotsMode", {
        get: function () {
            return this.props.dotsMode === undefined ? DotsModes.Default : this.props.dotsMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "isVisibleArrows", {
        get: function () {
            return (!this.slidesLessOrEqualThanVisible &&
                (isUndefined(this.props.isVisibleArrows) || !!this.props.isVisibleArrows));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCarousel.prototype, "shouldUpdateOnResize", {
        get: function () {
            return !!this.props.shouldUpdateOnResize;
        },
        enumerable: true,
        configurable: true
    });
    UiCarousel.prototype.onSlideClick = function () {
        if (this.props.allowScrollSlideOnClick) {
            return this.swipeNext();
        }
    };
    UiCarousel.prototype.onTouchStart = function (event) {
        if (this.isSwapping) {
            this.sliderListener.handleTouchStart(event, true);
        }
    };
    UiCarousel.prototype.onTouchMove = function (event) {
        if (this.isSwapping) {
            this.sliderListener.handleTouchMove(event, true);
        }
    };
    UiCarousel.prototype.onTouchEnd = function (event) {
        if (this.isSwapping) {
            this.sliderListener.handleTouchEnd(event, true);
        }
    };
    UiCarousel.prototype.onMouseDown = function (event) {
        if (this.isMouseSwapping) {
            this.sliderListener.handleTouchStart(event, false);
            document.addEventListener('mouseup', this.mouseUpHandler);
            document.addEventListener('mousemove', this.mouseMoveHandler);
        }
    };
    UiCarousel.prototype.onTouchSwipe = function (state) {
        var isSwipeBack = state.action === SwipeActions.SwipeBack;
        var numPagesToScroll = Math.ceil(state.offset.left / (this.singleSlideWidthWithMargin * this.slidesToScroll));
        if (!this.allowLongSwapping) {
            numPagesToScroll = numPagesToScroll > 0 ? 1 : 0;
        }
        if (isSwipeBack) {
            numPagesToScroll = -numPagesToScroll;
        }
        var newSlideIndex = numPagesToScroll * this.slidesToScroll + this.activeSlideIndex;
        this.swipeTo(newSlideIndex);
    };
    UiCarousel.prototype.onTouchSliderMove = function (offset) {
        var buffer = 100; // буфер "резинового" отступа в самом начале и конце слайдера при свайпе
        var offsetDuringSwipe = offset.left;
        var moveLeft = offsetDuringSwipe < 0;
        var leftSideLimit = !moveLeft && this.contentLeftOffset + offsetDuringSwipe - buffer > 0;
        var sumLeftOffset = Math.abs(this.contentLeftOffset) + Math.abs(offsetDuringSwipe);
        var rightSideLimit = moveLeft && this.fullContentWidth - this.contentContainerWidth - sumLeftOffset + buffer < 0;
        var isOffsetDuringSwipeLimit = !this.allowLongSwapping && Math.abs(offset.left) > this.slidesToScroll * this.singleSlideWidthWithMargin;
        if (!leftSideLimit && !rightSideLimit && !isOffsetDuringSwipeLimit) {
            this.setState({ offsetDuringSwipe: offsetDuringSwipe });
        }
    };
    UiCarousel.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        var content = this.state.isComponentMounted && this.props.slides.length ? this.renderSlidesContent() : null;
        return (React.createElement("div", { className: cx.root },
            React.createElement("div", { className: cx.contentContainer, onTouchStart: function (event) { return _this.onTouchStart(event); }, onTouchMove: function (event) { return _this.onTouchMove(event); }, onTouchEnd: function (event) { return _this.onTouchEnd(event); }, onMouseDown: function (event) {
                    _this.onMouseDown(event);
                } },
                this.renderLeftArrow(),
                React.createElement("div", { ref: function (ref) { return (_this.containerRef = ref); }, className: cx.wrapContent }, content),
                this.renderRightArrow(),
                this.renderDots())));
    };
    UiCarousel.prototype.renderSlidesContent = function () {
        var _this = this;
        var cx = this.classes();
        var sx = this.styles();
        var content = range(0, this.props.slides.length).map(function (index) { return _this.renderSlide(index); });
        return (React.createElement(Motion, { key: 'slides-content-key', style: sx.slidesContent }, function (_a) {
            var width = _a.width, left = _a.left;
            return (React.createElement("div", { className: cx.content, style: { width: width, left: left } }, content));
        }));
    };
    UiCarousel.prototype.renderSlide = function (index) {
        var _this = this;
        var cx = this.classes();
        var sx = this.styles();
        return (React.createElement(Motion, { key: index, style: sx.slide(index) }, function (_a) {
            var width = _a.width, opacity = _a.opacity;
            return (React.createElement("div", { className: cx.slide, style: {
                    width: width,
                    opacity: opacity,
                    marginRight: _this.slideMargin,
                    marginLeft: _this.slideMargin
                }, onClick: function () { return _this.onSlideClick(); } }, _this.props.slides[index]));
        }));
    };
    UiCarousel.prototype.renderLeftArrow = function () {
        var _this = this;
        if (!this.isVisibleArrows) {
            return null;
        }
        // const lastPageId = this.props.slides.length - this.slidesToShow;
        return (React.createElement(UiArrow, { key: 'left-arrow-key', arrowSvg: this.props.arrowSvg, type: ArrowType.Left, onClick: function () { return _this.swipePrev(); }, disabled: !this.props.isInfinity && this.activeSlideIndex <= 0, bemModifications: this.props.bemModifications }));
    };
    UiCarousel.prototype.renderRightArrow = function () {
        var _this = this;
        var lastPageId = this.props.slides.length - this.slidesToShow;
        if (!this.isVisibleArrows) {
            return null;
        }
        return (React.createElement(UiArrow, { key: 'right-arrow-key', arrowSvg: this.props.arrowSvg, type: ArrowType.Right, onClick: function () { return _this.swipeNext(); }, disabled: !this.props.isInfinity && this.activeSlideIndex >= lastPageId, bemModifications: this.props.bemModifications }));
    };
    UiCarousel.prototype.renderDots = function () {
        var _this = this;
        if (!this.isVisibleDots) {
            return null;
        }
        return (React.createElement(UiDots, { numDots: this.props.slides.length, activeIndex: this.activeSlideIndex, numActiveDots: this.slidesToShow, numDotsToScroll: this.slidesToScroll, onDotClick: function (dotIndex) { return _this.changeSlideIndex(dotIndex); }, mode: this.dotsMode, bemModifications: this.props.bemModifications }));
    };
    UiCarousel.prototype.classes = function () {
        var baseClass = 'uikit-carousel';
        return {
            root: this.classNames({
                prefix: baseClass,
                additionalClasses: this.props.wrapperClass
            }),
            contentContainer: this.classNames({
                prefix: baseClass + "__container"
            }),
            wrapContent: this.classNames({
                prefix: baseClass + "__wrap-content"
            }),
            content: this.classNames({
                prefix: baseClass + "__content"
            }),
            slide: this.classNames({
                prefix: baseClass + "__slide"
            }),
            loader: this.classNames({
                prefix: baseClass + "__loader"
            })
        };
    };
    UiCarousel.prototype.styles = function () {
        var _this = this;
        return {
            slidesContent: {
                width: this.fullContentWidth,
                left: spring(this.contentLeftOffset, { stiffness: this.slideChangeDuration, damping: 24 })
            },
            slide: function (index) {
                return {
                    width: _this.singleSlideWidth,
                    opacity: spring(_this.isSlideActive(index) ? 1 : 0.3)
                };
            }
        };
    };
    Object.defineProperty(UiCarousel.prototype, "isSlidesAlignmentCentered", {
        get: function () {
            return isUndefined(this.props.slidesAlignment) || this.props.slidesAlignment === AlignmentMode.Centered;
        },
        enumerable: true,
        configurable: true
    });
    UiCarousel.prototype.bindListenerOnWindowResize = function () {
        if (this.shouldUpdateOnResize) {
            window.addEventListener('resize', this.resizeListenerHandler);
        }
    };
    UiCarousel.prototype.unbindListenerOnWindowResize = function () {
        if (this.shouldUpdateOnResize) {
            window.removeEventListener('resize', this.resizeListenerHandler);
        }
    };
    UiCarousel.prototype.isSlideActive = function (slideIndex) {
        var endSlideIdx = this.activeSlideIndex + this.slidesToShow;
        return slideIndex >= this.activeSlideIndex && slideIndex < endSlideIdx;
    };
    UiCarousel.prototype.swipeNext = function () {
        this.swipeTo(this.activeSlideIndex + this.slidesToScroll);
    };
    UiCarousel.prototype.swipePrev = function () {
        this.swipeTo(this.activeSlideIndex - this.slidesToScroll);
    };
    UiCarousel.prototype.changeSlideIndex = function (slideIndex) {
        var lastPageId = this.props.slides.length - this.slidesToShow;
        if (slideIndex > lastPageId) {
            slideIndex = lastPageId;
        }
        this.activeSlideIndex = slideIndex;
    };
    UiCarousel.prototype.swipeTo = function (slideIndex) {
        var lastPageId = this.props.slides.length - this.slidesToShow;
        if (slideIndex < 0) {
            if (slideIndex + this.slidesToScroll > 0) {
                slideIndex = 0;
            }
            else {
                slideIndex = this.props.isInfinity ? lastPageId : 0;
            }
        }
        else if (slideIndex > lastPageId) {
            if (lastPageId + this.slidesToScroll > slideIndex) {
                slideIndex = lastPageId;
            }
            else {
                slideIndex = this.props.isInfinity ? 0 : lastPageId;
            }
        }
        this.activeSlideIndex = slideIndex;
    };
    return UiCarousel;
}(UiAdaptiveComponent));
export { UiCarousel };
