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
import { UiAdaptiveComponent } from '../UiAdaptiveComponent';
// tslint:disable-next-line:deprecation
import { UiLoader } from '../UiLoader/UiLoader';
export var TabStatus;
(function (TabStatus) {
    TabStatus[TabStatus["notYetLoaded"] = 0] = "notYetLoaded";
    TabStatus[TabStatus["isVisible"] = 1] = "isVisible";
    TabStatus[TabStatus["isNotVisible"] = 2] = "isNotVisible";
})(TabStatus || (TabStatus = {}));
/**
 * TODO selkin: компонент был добавлен специально для одного единичного случая - для tripadvisor фрейма
 * PostMessage которого некорректно возвращает высоту фрейма. Из-за этого и был
 * добавлен этот компонент. Его лучше вынести в КТ модуля 5.0, ибо случай единичный
 * Если нужны табы, то лучше использовать UiHorizontalTabs
 */
var UiHorizontalDynamicTabs = /** @class */ (function (_super) {
    __extends(UiHorizontalDynamicTabs, _super);
    function UiHorizontalDynamicTabs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UiHorizontalDynamicTabs.prototype, "activeIndex", {
        get: function () {
            return this.props.activeIndex || 0;
        },
        enumerable: true,
        configurable: true
    });
    UiHorizontalDynamicTabs.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        var sx = this.styles();
        var renderLoader = function () {
            if (_this.isWholeContentLoaded()) {
                return null;
            }
            return (React.createElement("div", null,
                React.createElement(UiLoader, { text: _this.props.loadingText || '', bemModifications: _this.props.bemModifications })));
        };
        var renderContent = function () {
            if (_this.isWholeContentLoaded() && _this.isEmpty()) {
                return _this.props.emptyWarning;
            }
            if (_this.isWholeContentLoaded() && _this.isOnlyOneTab()) {
                return React.createElement("div", null, _this.props.items.filter(function (item) { return item.status === TabStatus.isVisible; })[0].content);
            }
            return (React.createElement("div", null,
                React.createElement("div", { className: cx.tabsButtons, style: sx.tabsButtons }, _this.renderTabsButtons()),
                React.createElement("div", { className: cx.tabContent, style: sx.tabsContents }, _this.renderTabsContent())));
        };
        return (React.createElement("div", { className: cx.root },
            renderLoader(),
            renderContent()));
    };
    UiHorizontalDynamicTabs.prototype.renderTabsButtons = function () {
        var _this = this;
        var cx = this.classes();
        return this.props.items.map(function (item, index) {
            return (React.createElement("div", { key: "key-tab-" + index, className: cx.tabsButtonsItem(index), onClick: function () { return _this.props.onChangeActiveIndex(index); } },
                React.createElement("span", { key: "key-tab-title-" + index, className: cx.tabsButtonsTitle(index) }, item.title)));
        });
    };
    UiHorizontalDynamicTabs.prototype.renderTabsContent = function () {
        var cx = this.classes();
        var sx = this.styles();
        return this.props.items.map(function (item, index) {
            return (React.createElement("div", { key: "content-" + index + "-key", className: cx.tabContentItem(index), style: sx.tabContent(index) }, item.content));
        });
    };
    UiHorizontalDynamicTabs.prototype.classes = function () {
        var _this = this;
        var baseClass = 'uikit-tabs';
        var isWholeContentLoaded = this.isWholeContentLoaded();
        return {
            root: this.classNames({
                prefix: baseClass,
                additionalClasses: this.props.wrapperClass
            }),
            tabsButtons: this.classNames({
                prefix: baseClass + "__header",
                modifications: [
                    {
                        hidden: !isWholeContentLoaded
                    }
                ]
            }),
            tabsButtonsItem: function (itemIndex) {
                return _this.classNames({
                    prefix: baseClass + "__button",
                    modifications: [
                        {
                            active: itemIndex === _this.activeIndex
                        }
                    ]
                });
            },
            tabsButtonsTitle: function (itemIndex) {
                return _this.classNames({
                    prefix: baseClass + "__title",
                    modifications: [
                        {
                            active: itemIndex === _this.activeIndex
                        }
                    ]
                });
            },
            tabContent: this.classNames({
                prefix: baseClass + "__content",
                modifications: [
                    {
                        hidden: !isWholeContentLoaded
                    }
                ]
            }),
            tabContentItem: function (itemIndex) {
                return _this.classNames({
                    prefix: baseClass + "__content__item",
                    modifications: [
                        {
                            active: itemIndex === _this.activeIndex
                        }
                    ]
                });
            }
        };
    };
    UiHorizontalDynamicTabs.prototype.styles = function () {
        var _this = this;
        var isWholeContentLoaded = this.isWholeContentLoaded();
        return {
            tabsButtons: {
                display: isWholeContentLoaded ? '' : 'none'
            },
            tabsContents: {
                visibility: isWholeContentLoaded ? '' : 'hidden'
            },
            tabContent: function (index) {
                return {
                    display: _this.activeIndex === index ? '' : 'none'
                };
            }
        };
    };
    UiHorizontalDynamicTabs.prototype.isWholeContentLoaded = function () {
        return this.props.items.every(function (item) { return item.status !== TabStatus.notYetLoaded; });
    };
    UiHorizontalDynamicTabs.prototype.isOnlyOneTab = function () {
        return this.props.items.filter(function (item) { return item.status === TabStatus.isVisible; }).length === 1;
    };
    UiHorizontalDynamicTabs.prototype.isEmpty = function () {
        return this.props.items.every(function (item) { return item.status === TabStatus.isNotVisible; });
    };
    return UiHorizontalDynamicTabs;
}(UiAdaptiveComponent));
export { UiHorizontalDynamicTabs };
