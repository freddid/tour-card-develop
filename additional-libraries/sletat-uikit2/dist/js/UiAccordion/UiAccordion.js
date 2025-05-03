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
import { UiBaseMultiContent } from '../UiAdaptiveTabs/UiBaseMultiContent';
var UiAccordion = /** @class */ (function (_super) {
    __extends(UiAccordion, _super);
    function UiAccordion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiAccordion.prototype.render = function () {
        var cx = this.classes();
        return React.createElement("div", { className: cx.root }, this.renderItems());
    };
    UiAccordion.prototype.animateContentAppearance = function (content) {
        return (React.createElement(Motion, { key: "motion-key-" + this.activeIndex, defaultStyle: { opacity: 0 }, style: { opacity: spring(1, { stiffness: this.transitionEnterStiffness }) } }, function (style) { return React.createElement("div", { style: style }, content); }));
    };
    UiAccordion.prototype.classes = function () {
        var _this = this;
        var baseClass = 'uikit-accordion';
        return {
            root: this.classNames({
                prefix: baseClass,
                additionalClasses: this.props.wrapperClass
            }),
            group: this.classNames({
                prefix: baseClass + "__group"
            }),
            groupItem: this.classNames({
                prefix: baseClass + "__group-item"
            }),
            groupContent: this.classNames({
                prefix: baseClass + "__group-content"
            }),
            item: function (activeIndex) {
                return _this.classNames({
                    prefix: baseClass + "__button",
                    modifications: [
                        {
                            active: activeIndex === _this.activeIndex
                        }
                    ]
                });
            },
            itemTitle: this.classNames({
                prefix: baseClass + "__title"
            })
        };
    };
    UiAccordion.prototype.renderItems = function () {
        var _this = this;
        return this.props.items.map(function (item, index) {
            return _this.renderItem(item, index);
        });
    };
    UiAccordion.prototype.renderItem = function (item, index) {
        var _this = this;
        var cx = this.classes();
        var content = function (i) { return (_this.activeIndex === i ? _this.renderContent(i) : null); };
        var getNewIndex = function (i) { return (i === _this.activeIndex ? -1 : i); };
        var itemTitle = (React.createElement("div", { className: cx.groupItem },
            React.createElement("a", { key: index, className: cx.item(index), onClick: function () { return _this.changeActiveIndex(getNewIndex(index)); } },
                React.createElement("span", { className: cx.itemTitle }, item.title))));
        var itemContent = React.createElement("div", { className: cx.groupContent }, content(index));
        return (React.createElement("div", { key: index, className: cx.group },
            itemTitle,
            itemContent));
    };
    Object.defineProperty(UiAccordion.prototype, "transitionEnterStiffness", {
        get: function () {
            return this.props.transitionEnterStiffness || 200;
        },
        enumerable: true,
        configurable: true
    });
    return UiAccordion;
}(UiBaseMultiContent));
export { UiAccordion };
