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
import { find, isEqual, isUndefined } from 'lodash';
import { UiLazyList } from '../UiLazyList/UiLazyList';
import { UiComponent } from '../UiComponent';
var UiGroupedLazyList = /** @class */ (function (_super) {
    __extends(UiGroupedLazyList, _super);
    function UiGroupedLazyList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            activeGroupId: '0'
        };
        _this.flattenList = _this.makeItemsFlatten(_this.props.groups || []);
        return _this;
    }
    UiGroupedLazyList.prototype.componentWillReceiveProps = function (newProps) {
        if (!isEqual(newProps.groups, this.props.groups)) {
            this.flattenList = this.makeItemsFlatten(newProps.groups || []);
        }
    };
    UiGroupedLazyList.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        var sx = this.styles();
        return (React.createElement("div", { className: cx.root, style: sx.root },
            React.createElement("div", { className: cx.stickyTitle, style: sx.stickyTitleWrapper }, this.retrieveSticker(this.state.activeGroupId)),
            React.createElement(UiLazyList, { bemModifications: this.props.bemModifications, list: this.flattenList.map(function (item) { return ({ height: item.height, component: item.component }); }), maxHeightList: this.props.maxListHeight, scrollTop: this.props.scrollTop, shouldKeepScrollTopAfterListChanged: this.props.shouldKeepScrollTopAfterListChanged, wrapperClass: this.props.wrapperClass, onScroll: function (state) {
                    _this.setActiveGroupId(state.firstVisibleItemId);
                    // eslint-disable-next-line lodash/prefer-lodash-typecheck
                    if (typeof _this.props.onScroll === 'function') {
                        _this.props.onScroll(state.scrollTop);
                    }
                } })));
    };
    UiGroupedLazyList.prototype.classes = function () {
        var baseClass = 'uikit-grouped-lazy-list';
        return {
            root: this.classNames({
                prefix: baseClass,
                additionalClasses: this.props.wrapperClass
            }),
            stickyTitle: this.classNames({
                prefix: baseClass + "__sticky-title",
                modifications: this.props.bemModifications
            }),
            contentWrapper: this.classNames({
                prefix: baseClass + "__content-wrapper"
            })
        };
    };
    UiGroupedLazyList.prototype.styles = function () {
        return {
            root: {
                position: 'relative'
            },
            stickyTitleWrapper: {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                zIndex: 1
            }
        };
    };
    UiGroupedLazyList.prototype.makeItemsFlatten = function (groups) {
        var flattenGroup = function (group) {
            var items = [];
            var addFlattenItem = function (item) {
                items.push({
                    id: item.id,
                    height: item.height,
                    component: item.component
                });
            };
            addFlattenItem(group);
            group.items.map(function (item) { return addFlattenItem(item); });
            return items;
        };
        return groups.reduce(function (result, value) { return result.concat(flattenGroup(value)); }, []);
    };
    UiGroupedLazyList.prototype.retrieveSticker = function (activeGroupId) {
        // eslint-disable-next-line lodash/matches-prop-shorthand
        var foundGroup = find(this.props.groups, function (group) { return group.id === activeGroupId; });
        return foundGroup ? foundGroup.sticker : null;
    };
    UiGroupedLazyList.prototype.setActiveGroupId = function (itemId) {
        var foundGroup = find(this.props.groups, function (group) {
            // eslint-disable-next-line lodash/matches-prop-shorthand
            return group.id === itemId || !isUndefined(find(group.items, function (item) { return item.id === itemId; }));
        });
        this.setState({
            // eslint-disable-next-line no-nested-ternary
            activeGroupId: foundGroup
                ? foundGroup.id
                : this.props.shouldKeepStickerAfterScrollTopFinished
                    // eslint-disable-next-line react/no-access-state-in-setstate
                    ? this.state.activeGroupId
                    : ''
        });
    };
    return UiGroupedLazyList;
}(UiComponent));
export { UiGroupedLazyList };
