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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import { isUndefined, isNumber, debounce } from 'lodash';
import { UiHorizontalTabs } from '../UiHorizontalTabs/UiHorizontalTabs';
import { UiAccordion } from '../UiAccordion/UiAccordion';
import { UiBaseMultiContent } from './UiBaseMultiContent';
var UiAdaptiveTabs = /** @class */ (function (_super) {
    __extends(UiAdaptiveTabs, _super);
    function UiAdaptiveTabs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resizeListenerHandler = debounce(function () { return _this.forceUpdate(); }, 200);
        return _this;
    }
    UiAdaptiveTabs.prototype.componentDidMount = function () {
        this.bindListenerOnWindowResize();
    };
    UiAdaptiveTabs.prototype.componentWillUnmount = function () {
        this.unbindListenerOnWindowResize();
    };
    UiAdaptiveTabs.prototype.render = function () {
        var cx = this.classes();
        return React.createElement("div", { className: cx.root }, this.renderContent());
    };
    UiAdaptiveTabs.prototype.classes = function () {
        var baseClass = 'uikit-tabs-wrapper';
        return {
            root: this.classNames({
                prefix: baseClass,
                additionalClasses: this.props.wrapperClass
            })
        };
    };
    UiAdaptiveTabs.prototype.renderContent = function () {
        return this.isAdaptive ? this.renderAccordion() : this.renderTabs();
    };
    Object.defineProperty(UiAdaptiveTabs.prototype, "isAdaptive", {
        get: function () {
            var isAdaptive = isUndefined(this.props.isAdaptive) || this.props.isAdaptive;
            return isAdaptive && document.documentElement.clientWidth < this.minAdaptiveWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiAdaptiveTabs.prototype, "minAdaptiveWidth", {
        get: function () {
            return isNumber(this.props.minAdaptiveWidth) ? this.props.minAdaptiveWidth : 760;
        },
        enumerable: true,
        configurable: true
    });
    UiAdaptiveTabs.prototype.renderTabs = function () {
        return React.createElement(UiHorizontalTabs, __assign({}, this.props));
    };
    UiAdaptiveTabs.prototype.renderAccordion = function () {
        return React.createElement(UiAccordion, __assign({}, this.props));
    };
    UiAdaptiveTabs.prototype.bindListenerOnWindowResize = function () {
        window.addEventListener('resize', this.resizeListenerHandler);
    };
    UiAdaptiveTabs.prototype.unbindListenerOnWindowResize = function () {
        window.removeEventListener('resize', this.resizeListenerHandler);
    };
    return UiAdaptiveTabs;
}(UiBaseMultiContent));
export { UiAdaptiveTabs };
