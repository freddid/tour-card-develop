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
import { Motion, spring } from 'react-motion';
import { UiBaseMultiContent } from './UiBaseMultiContent';
var UiBaseTabs = /** @class */ (function (_super) {
    __extends(UiBaseTabs, _super);
    function UiBaseTabs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiBaseTabs.prototype.render = function () {
        var cx = this.classes();
        return (React.createElement("div", { className: cx.root },
            React.createElement("div", { className: cx.tabsButtons }, this.renderTabsButtons()),
            React.createElement("div", { className: cx.tabContent }, this.renderContent(this.activeIndex || 0))));
    };
    UiBaseTabs.prototype.renderTabsButtons = function () {
        var _this = this;
        var cx = this.classes();
        return this.props.items.map(function (item, index) {
            return (React.createElement("div", { key: "key-tab-" + index, className: cx.tabsButtonsItem(index), onClick: function () { return _this.changeActiveIndex(index); } },
                React.createElement("span", { key: "key-tab-title-" + index, className: cx.tabsButtonsTitle(index) }, item.title)));
        });
    };
    UiBaseTabs.prototype.animateContentAppearance = function (content) {
        return (React.createElement(Motion, { key: "motion-key-" + this.activeIndex, defaultStyle: { opacity: 0 }, style: { opacity: spring(1, { stiffness: this.transitionEnterStiffness }) } }, function (style) { return React.createElement("div", { style: style }, content); }));
    };
    Object.defineProperty(UiBaseTabs.prototype, "transitionEnterStiffness", {
        get: function () {
            return this.props.transitionEnterStiffness || 250;
        },
        enumerable: true,
        configurable: true
    });
    return UiBaseTabs;
}(UiBaseMultiContent));
export { UiBaseTabs };
