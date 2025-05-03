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
import { isEqual } from 'lodash';
import { UiComponent } from '../UiComponent';
import { UiCustomScroll } from '../UiCustomScroll/UiCustomScroll';
var UiLazyList = /** @class */ (function (_super) {
    __extends(UiLazyList, _super);
    function UiLazyList(props) {
        var _this = _super.call(this, props) || this;
        _this.onScroll = function (state) {
            if (state.scrollTop !== _this.state.scrollTop) {
                _this.setState({ scrollTop: state.scrollTop }, function () {
                    if (typeof _this.props.onScroll === 'function') {
                        _this.props.onScroll({
                            scrollTop: state.scrollTop,
                            firstVisibleItemId: String(_this.firstVisibleItemIndex)
                        });
                    }
                });
            }
        };
        _this.state = {
            scrollTop: _this.props.scrollTop || 0
        };
        _this.wrappedList = _this.wrapListItems(_this.props.list);
        return _this;
    }
    UiLazyList.prototype.componentWillReceiveProps = function (newProps) {
        if (!isEqual(this.props.list, newProps.list)) {
            this.wrappedList = this.wrapListItems(newProps.list);
        }
        // TODO: пока оставил такое условие, но это не совсем правильно.. нужно подумать над другим решением
        if (this.props.list.length !== newProps.list.length && !this.props.shouldKeepScrollTopAfterListChanged) {
            this.setState({ scrollTop: 0 });
        }
        if (this.props.scrollTop !== newProps.scrollTop) {
            this.setState({ scrollTop: newProps.scrollTop });
        }
    };
    UiLazyList.prototype.render = function () {
        var cx = this.classes();
        return (React.createElement("div", { className: cx.root },
            React.createElement(UiCustomScroll, { maxHeightList: this.props.maxHeightList, minHeightScroller: this.minHeightScroller, scrollTop: this.state.scrollTop, onScroll: this.onScroll, bemModifications: this.props.bemModifications },
                React.createElement("div", { className: cx.contentWrapper },
                    this.renderTopGap(),
                    this.renderItems(),
                    this.renderBottomGap()))));
    };
    UiLazyList.prototype.renderItems = function () {
        return this.getElementsRange(this.firstVisibleItemIndex, this.lastVisibleItemIndex + 1).map(function (item) { return item.component; });
    };
    UiLazyList.prototype.renderTopGap = function () {
        var sx = this.styles();
        return React.createElement("div", { key: 'key:lazy-list:top-gap', className: this.classes().topGap, style: sx.topGap() });
    };
    UiLazyList.prototype.renderBottomGap = function () {
        var sx = this.styles();
        return React.createElement("div", { key: 'key:lazy-list:bottom-gap', className: this.classes().bottomGap, style: sx.bottomGap() });
    };
    UiLazyList.prototype.classes = function () {
        return {
            root: this.classNames({
                prefix: 'uikit-lazy-list',
                modifications: [
                    {
                        'no-scroll': this.props.maxHeightList > this.frameHeight
                    }
                ],
                additionalClasses: this.props.wrapperClass
            }),
            wrappedItem: this.classNames({
                prefix: 'uikit-lazy-list__wrapped-item',
                modifications: this.props.bemModifications || []
            }),
            contentWrapper: this.classNames({
                prefix: 'uikit-lazy-list__content'
            }),
            topGap: this.classNames({
                prefix: 'uikit-lazy-list__top-gap'
            }),
            bottomGap: this.classNames({
                prefix: 'uikit-lazy-list__bottom-gap'
            })
        };
    };
    UiLazyList.prototype.styles = function () {
        var _this = this;
        return {
            topGap: function () { return ({
                height: _this.topGapHeight + "px"
            }); },
            bottomGap: function () { return ({
                height: _this.bottomGapHeight + "px"
            }); },
            wrappedItem: function (height) { return ({
                height: height + "px",
                overflow: 'hidden',
                boxSizing: 'border-box'
            }); }
        };
    };
    UiLazyList.prototype.wrapListItems = function (list) {
        var cx = this.classes();
        var sx = this.styles();
        var wrapItem = function (item, id) { return ({
            height: item.height,
            component: (React.createElement("div", { key: "item-" + id, className: cx.wrappedItem, style: sx.wrappedItem(item.height) }, item.component))
        }); };
        return (list || []).map(function (item, idx) { return wrapItem(item, String(idx)); });
    };
    Object.defineProperty(UiLazyList.prototype, "list", {
        get: function () {
            return this.wrappedList || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiLazyList.prototype, "minHeightScroller", {
        get: function () {
            return this.props.minHeightScroller || 20;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiLazyList.prototype, "topGapHeight", {
        get: function () {
            return this.getItemsHeight(this.getElementsBeforeIndex(this.firstVisibleItemIndex));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiLazyList.prototype, "fullHeight", {
        get: function () {
            return this.getItemsHeight(this.list);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiLazyList.prototype, "frameHeight", {
        get: function () {
            return Math.min(this.props.maxHeightList, this.fullHeight);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiLazyList.prototype, "bottomGapHeight", {
        get: function () {
            return this.getItemsHeight(this.getElementsAfterIndex(this.lastVisibleItemIndex));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiLazyList.prototype, "firstVisibleItemIndex", {
        get: function () {
            var index = 0;
            var height = 0;
            for (; index < this.list.length; index++) {
                height += this.list[index].height;
                if (height > this.state.scrollTop) {
                    break;
                }
            }
            return this.list.length - 1 > index ? index : this.list.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiLazyList.prototype, "lastVisibleItemIndex", {
        get: function () {
            var firstIndex = this.firstVisibleItemIndex;
            var index = firstIndex;
            var height = this.list.length ? this.list[firstIndex].height - (this.state.scrollTop - this.topGapHeight) : 0;
            while (height < this.frameHeight && index < this.list.length - 1) {
                index++;
                height += this.list[index].height;
            }
            return index;
        },
        enumerable: true,
        configurable: true
    });
    UiLazyList.prototype.getElementsBeforeIndex = function (elementIndex) {
        return this.getElementsRange(0, elementIndex);
    };
    UiLazyList.prototype.getElementsAfterIndex = function (elementIndex) {
        return this.getElementsRange(elementIndex + 1, this.list.length);
    };
    UiLazyList.prototype.getElementsRange = function (fromIndex, toIndex) {
        return this.list.slice(fromIndex, toIndex);
    };
    UiLazyList.prototype.getItemsHeight = function (items) {
        return items.reduce(function (height, item) { return height + item.height; }, 0);
    };
    return UiLazyList;
}(UiComponent));
export { UiLazyList };
