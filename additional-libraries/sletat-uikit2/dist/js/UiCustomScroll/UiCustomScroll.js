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
import { isEqual, isNumber } from 'lodash';
import { UiComponent } from '../UiComponent';
var UiCustomScroll = /** @class */ (function (_super) {
    __extends(UiCustomScroll, _super);
    function UiCustomScroll(props) {
        var _this = _super.call(this, props) || this;
        _this.scrollHandler = function (e) {
            if (!_this.scrollerElem || _this.props.scrollTop === _this.scrollableElem.scrollTop) {
                return;
            }
            _this.scrollerElem.style.top = _this.getScrollerPositionByScrollTop(_this.scrollableElem.scrollTop) + "px";
            if (_this.props.onScroll) {
                _this.props.onScroll({
                    scrollTop: _this.scrollableElem.scrollTop
                });
            }
        };
        _this.mouseDownHandler = function (e) {
            e.preventDefault(); // чтобы не срабатывало выделение
            _this.window.addEventListener('mousemove', _this.mouseMoveHandler);
            _this.window.addEventListener('mouseup', _this.mouseUpHandler);
            _this.trackClientY = _this.trackElem.getBoundingClientRect().top;
            _this.scrollerDeltaY = e.nativeEvent.clientY - _this.scrollerElem.getBoundingClientRect().top;
        };
        _this.mouseMoveHandler = function (e) {
            var top = e.clientY - _this.trackClientY - _this.scrollerDeltaY;
            top = Math.max(0, top);
            top = Math.min(_this.maxPossibleScrollerTop, top);
            _this.scrollableElem.scrollTop = _this.getScrollTopByScrollerPosition(top);
        };
        _this.mouseUpHandler = function (e) {
            _this.window.removeEventListener('mousemove', _this.mouseMoveHandler);
            _this.window.removeEventListener('mouseup', _this.mouseUpHandler);
        };
        _this.state = {
            mounted: false
        };
        return _this;
    }
    UiCustomScroll.prototype.componentDidMount = function () {
        this.nativeScrollerWidth = this.calcWidthScroller();
        this.setState({ mounted: true });
    };
    // TODO selkin: это определённо костыльно, ибо дабл рендер
    // непонятна только причина, ибо вообще componentWillReceiveProps здесь не нужен
    // без него должно нормально работать
    // нужно после определённо это поправить
    UiCustomScroll.prototype.componentWillReceiveProps = function (newProps) {
        if (!isEqual(this.props, newProps)) {
            this.setState({ mounted: false });
        }
    };
    UiCustomScroll.prototype.componentDidUpdate = function () {
        if (!this.state.mounted) {
            this.setState({ mounted: true });
        }
        if (this.scrollableElem &&
            this.scrollerElem &&
            isNumber(this.props.scrollTop) &&
            this.props.scrollTop !== this.scrollableElem.scrollTop) {
            this.scrollerElem.style.top = this.getScrollerPositionByScrollTop(this.props.scrollTop) + "px";
            this.scrollableElem.scrollTop = this.props.scrollTop;
        }
    };
    UiCustomScroll.prototype.renderScroller = function () {
        var _this = this;
        var cx = this.classes();
        var sx = this.styles();
        if (this.state.mounted && !this.hasScrolling) {
            return null;
        }
        return (React.createElement("div", { className: cx.path },
            React.createElement("div", { ref: function (elem) { return (_this.trackElem = elem); }, className: cx.track },
                React.createElement("span", { ref: function (elem) { return (_this.scrollerElem = elem); }, style: sx.scroller, className: cx.scroller, onMouseDown: function (e) { return _this.mouseDownHandler(e); } }))));
    };
    UiCustomScroll.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        var sx = this.styles();
        return (React.createElement("div", { ref: function (elem) { return (_this.rootElem = elem); }, className: cx.root },
            this.renderScroller(),
            React.createElement("div", { ref: function (elem) { return (_this.scrollableElem = elem); }, className: cx.scrollable, style: sx.scrollable, onScroll: function (e) { return _this.scrollHandler(e); } }, this.props.children)));
    };
    UiCustomScroll.prototype.classes = function () {
        return {
            root: this.classNames({
                prefix: 'uikit-custom-scroll',
                additionalClasses: this.props.wrapperClass
            }),
            scrollable: this.classNames({
                prefix: 'uikit-custom-scroll__scrollable'
            }),
            track: this.classNames({
                prefix: 'uikit-custom-scroll__track'
            }),
            path: this.classNames({
                prefix: 'uikit-custom-scroll__path'
            }),
            scroller: this.classNames({
                prefix: 'uikit-custom-scroll__scroller'
            })
        };
    };
    UiCustomScroll.prototype.styles = function () {
        return {
            scrollable: {
                marginRight: this.state.mounted ? "-" + this.nativeScrollerWidth + "px" : 0,
                maxHeight: this.props.maxHeightList + "px"
            },
            scroller: {
                height: this.state.mounted && this.hasScrolling ? this.scrollerHeight + "px" : 0
            }
        };
    };
    Object.defineProperty(UiCustomScroll.prototype, "hasScrolling", {
        // будет ли появляться скроллинг
        get: function () {
            return this.scrollableElem && this.scrollableElem.scrollHeight > this.props.maxHeightList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCustomScroll.prototype, "scrollerHeight", {
        get: function () {
            if (!this.scrollableElem || !this.trackElem) {
                return isNumber(this.props.minHeightScroller) ? this.props.minHeightScroller : 10;
            }
            var height = Math.round((this.props.maxHeightList / this.scrollableElem.scrollHeight) * this.trackElem.offsetHeight);
            return isNumber(this.props.minHeightScroller) && height < this.props.minHeightScroller
                ? this.props.minHeightScroller
                : height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCustomScroll.prototype, "maxPossibleScrollTop", {
        /**
         * максимально возможное положение прокрутки блока
         */
        get: function () {
            return this.scrollableElem.scrollHeight - this.props.maxHeightList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCustomScroll.prototype, "maxPossibleScrollerTop", {
        /**
         * максимальное возможное положение ползунка
         */
        get: function () {
            return this.trackElem.offsetHeight - this.scrollerHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiCustomScroll.prototype, "window", {
        /**
         * для фреймов и т.п.
         */
        get: function () {
            if (!this.rootElem) {
                return window;
            }
            return this.rootElem.ownerDocument.defaultView;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * по значению прокрутки блока определяет необходимое положение ползунка
     */
    UiCustomScroll.prototype.getScrollerPositionByScrollTop = function (scrollTop) {
        var fixedScrollTop = scrollTop > this.maxPossibleScrollTop ? this.maxPossibleScrollTop : scrollTop;
        return Math.round((fixedScrollTop / this.maxPossibleScrollTop) * this.maxPossibleScrollerTop);
    };
    /**
     * по положению ползунка определяет прокрутку для блока
     */
    UiCustomScroll.prototype.getScrollTopByScrollerPosition = function (top) {
        return Math.round((top / this.maxPossibleScrollerTop) * this.maxPossibleScrollTop);
    };
    /**
     * рассчитывает ширину нативного вертикального ползуна
     */
    UiCustomScroll.prototype.calcWidthScroller = function () {
        var testDiv = document.createElement('div');
        var width;
        testDiv.style.border = '0';
        testDiv.style.visibility = 'hidden';
        testDiv.style.overflow = 'scroll';
        document.body.appendChild(testDiv);
        width = testDiv.offsetWidth - testDiv.clientWidth;
        testDiv.parentNode.removeChild(testDiv);
        return width;
    };
    return UiCustomScroll;
}(UiComponent));
export { UiCustomScroll };
