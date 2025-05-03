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
import { range } from 'lodash';
import { UiComponent } from '../UiComponent';
import { UiCarousel } from '../UiCarousel/UiCarousel';
import { ThumbnailItem } from './ThumbnailItem';
/**
 * используется как часть компонента UiPhotoGallery
 */
var UiThumbnailsPanel = /** @class */ (function (_super) {
    __extends(UiThumbnailsPanel, _super);
    function UiThumbnailsPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangeSlide = function (index) {
            if (index === _this.state.leftVisibleSlideIndex) {
                return;
            }
            _this.setState({
                leftVisibleSlideIndex: index
            }, function () {
                if (typeof _this.props.onChangeLeftVisibleSlideIndex === 'function') {
                    _this.props.onChangeLeftVisibleSlideIndex(index);
                }
            });
        };
        _this.onSelectSlide = function (index) {
            if (index === _this.state.selectedSlideIndex) {
                return;
            }
            var newLeftVisibleSlideIndex = _this.getVisibleLeftIndexBySelectedIndex(index);
            _this.setState({
                leftVisibleSlideIndex: newLeftVisibleSlideIndex,
                selectedSlideIndex: index
            }, function () {
                if (typeof _this.props.onChangeSelectedSlideIndex === 'function') {
                    _this.props.onChangeSelectedSlideIndex(index);
                }
            });
        };
        _this.state = {
            leftVisibleSlideIndex: _this.getVisibleLeftIndexBySelectedIndex(props.selectedSlideIndex || 0),
            selectedSlideIndex: props.selectedSlideIndex || 0,
            singleSlideWidth: 0
        };
        return _this;
    }
    UiThumbnailsPanel.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            leftVisibleSlideIndex: this.getVisibleLeftIndexBySelectedIndex(nextProps.selectedSlideIndex),
            selectedSlideIndex: nextProps.selectedSlideIndex
        });
    };
    UiThumbnailsPanel.prototype.render = function () {
        var _this = this;
        return (React.createElement(UiCarousel, { slides: this.thumbnailsItems, activeSlideIndex: this.state.leftVisibleSlideIndex, isInfinity: this.props.isInfinity, isSwapping: this.props.isSwapping, slideChangeDuration: this.props.slideChangeDuration, isVisibleDots: false, slidesToShow: this.numVisibleSlides, slidesToScroll: this.props.slidesToScroll, slideMargin: this.props.slideMargin, allowLongSwapping: this.props.allowLongSwapping, isVisibleArrows: this.props.isVisibleArrows, bemModifications: (this.props.bemModifications || []).concat('thumb-panel'), onChangeActiveSlideIndex: this.onChangeSlide, slidesAlignment: this.props.thumbsAlignment, onSlideWidthChange: function (slideWidth) {
                return _this.setState({ singleSlideWidth: slideWidth });
            } }));
    };
    UiThumbnailsPanel.prototype.classes = function () {
        return {};
    };
    Object.defineProperty(UiThumbnailsPanel.prototype, "numVisibleSlides", {
        get: function () {
            return this.props.slidesToShow || 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiThumbnailsPanel.prototype, "countSlides", {
        get: function () {
            return this.props.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiThumbnailsPanel.prototype, "thumbnailsItems", {
        get: function () {
            var _this = this;
            return range(0, this.countSlides).map(function (i) { return (React.createElement(ThumbnailItem, { source: _this.props.source, selectHandler: function () { return _this.onSelectSlide(i); }, selectedIndex: _this.state.selectedSlideIndex, index: i, itemWidth: _this.state.singleSlideWidth, bemModifications: _this.props.bemModifications })); });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * По переданному выбранному индексу слайда возвращает индекс левого слайд во фреймике
     */
    UiThumbnailsPanel.prototype.getVisibleLeftIndexBySelectedIndex = function (selectedIndex) {
        var rightCountInFrame = Math.floor(this.numVisibleSlides / 2);
        var rightSideIndexInFrame = Math.min(this.countSlides - 1, selectedIndex + rightCountInFrame);
        return Math.max(0, rightSideIndexInFrame - this.numVisibleSlides + 1);
    };
    return UiThumbnailsPanel;
}(UiComponent));
export { UiThumbnailsPanel };
