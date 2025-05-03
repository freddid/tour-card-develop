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
import { UiAdaptiveComponent } from '../UiAdaptiveComponent';
export var DotsModes;
(function (DotsModes) {
    DotsModes[DotsModes["Default"] = 0] = "Default";
    DotsModes[DotsModes["Alternative"] = 1] = "Alternative";
})(DotsModes || (DotsModes = {}));
var UiDots = /** @class */ (function (_super) {
    __extends(UiDots, _super);
    function UiDots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UiDots.prototype, "numActiveDots", {
        get: function () {
            return typeof this.props.numActiveDots === 'number' ? this.props.numActiveDots : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiDots.prototype, "numDotsToScroll", {
        get: function () {
            return typeof this.props.numDotsToScroll === 'number' ? this.props.numDotsToScroll : 1;
        },
        enumerable: true,
        configurable: true
    });
    UiDots.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        var numDots = this.props.mode === DotsModes.Alternative ? this.props.numDots / this.numDotsToScroll : this.props.numDots;
        var dots = range(numDots).map(function (idx) { return _this.renderDot(idx); });
        return (React.createElement("div", { className: cx.root, onTouchMove: function (e) { return _this.preventDefault(e); } }, dots));
    };
    UiDots.prototype.onDotClick = function (e, index) {
        this.preventDefault(e);
        if (this.props.mode === DotsModes.Alternative) {
            index *= this.numDotsToScroll;
        }
        if (typeof this.props.onDotClick === 'function') {
            this.props.onDotClick(index);
        }
    };
    UiDots.prototype.renderDot = function (index) {
        var _this = this;
        var cx = this.classes();
        return (React.createElement("span", { key: index, className: cx.dot(index), onTouchStart: function (e) { return _this.onDotClick(e, index); }, onTouchMove: function (e) { return _this.preventDefault(e); }, onTouchEnd: function (e) { return _this.preventDefault(e); }, onClick: function (e) { return _this.onDotClick(e, index); } }));
    };
    UiDots.prototype.classes = function () {
        var _this = this;
        var baseClass = 'uikit-carousel-dots';
        var isDotActive = function (idx) {
            if (_this.props.mode === DotsModes.Alternative) {
                return idx === Math.ceil(_this.props.activeIndex / _this.numDotsToScroll);
            }
            return idx >= _this.props.activeIndex && idx < _this.props.activeIndex + _this.numActiveDots;
        };
        return {
            root: this.classNames({
                prefix: baseClass,
                additionalClasses: this.props.wrapperClass
            }),
            dot: function (idx) {
                return _this.classNames({
                    prefix: baseClass + "__dot",
                    modifications: [
                        {
                            active: isDotActive(idx)
                        }
                    ]
                });
            }
        };
    };
    UiDots.prototype.preventDefault = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    return UiDots;
}(UiAdaptiveComponent));
export { UiDots };
