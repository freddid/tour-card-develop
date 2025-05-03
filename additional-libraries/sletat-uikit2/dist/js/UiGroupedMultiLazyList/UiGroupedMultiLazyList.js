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
import { isFunction } from 'lodash';
import { UiComponent } from '../UiComponent';
import { UiGroupedLazyList } from '../UiGroupedLazyList/UiGroupedLazyList';
import { UiCheckbox } from '../UiCheckbox/UiCheckbox';
/**
 * Один из вариантов использования UiGroupedLazyList
 */
var UiGroupedMultiLazyList = /** @class */ (function (_super) {
    __extends(UiGroupedMultiLazyList, _super);
    function UiGroupedMultiLazyList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiGroupedMultiLazyList.prototype.render = function () {
        return (React.createElement(UiGroupedLazyList, { groups: this.prepareGroupedList(this.props.groups), scrollTop: this.props.scrollTop, maxListHeight: this.props.maxListHeight, onScroll: this.props.onScroll }));
    };
    UiGroupedMultiLazyList.prototype.prepareGroupedList = function (groups) {
        var _this = this;
        var itemId = 0;
        var prepareGroupItems = function (items, group) {
            return items.map(function (item) { return ({
                id: String(itemId++),
                height: item.height,
                component: _this.renderItem(item.data, group)
            }); });
        };
        return groups.map(function (group) { return ({
            id: String(itemId++),
            height: group.height,
            component: _this.renderGroup(group.data),
            sticker: _this.renderSticker(group.data),
            items: prepareGroupItems(group.items, group.data)
        }); });
    };
    UiGroupedMultiLazyList.prototype.renderItem = function (itemData, groupData) {
        var _this = this;
        var cx = this.classes();
        if (isFunction(this.props.renderItem)) {
            return this.props.renderItem(itemData, groupData);
        }
        return (React.createElement("div", { className: cx.item(itemData.isChecked, itemData.isDisabled) },
            React.createElement(UiCheckbox, { id: "item-" + itemData.value, inputName: "" + itemData.label, label: isFunction(this.props.renderItemLabel)
                    ? this.props.renderItemLabel(itemData, groupData)
                    : itemData.label, isDisabled: itemData.isDisabled, isChecked: itemData.isChecked, wrapperClass: this.props.wrapperClass, bemModifications: this.props.bemModifications, onChange: function (state) {
                    itemData.isChecked = state.checked;
                    // Делаем forceUpdate, т.к если не будет происходить ререндер внешней компоненты или
                    // передачи пропсов в UiCheckboxGroupedLazyList, то состояние чекнутого контролла не будет
                    // применено
                    _this.forceUpdate(function () {
                        if (isFunction(_this.props.onChange)) {
                            _this.props.onChange({
                                item: itemData,
                                groupTitle: groupData.label
                            });
                        }
                    });
                } })));
    };
    UiGroupedMultiLazyList.prototype.renderGroup = function (groupData) {
        var cx = this.classes();
        return (React.createElement("div", { className: cx.group }, isFunction(this.props.renderGroupData) ? this.props.renderGroupData(groupData) : groupData.label));
    };
    UiGroupedMultiLazyList.prototype.renderSticker = function (groupData) {
        var cx = this.classes();
        return (React.createElement("div", { className: cx.sticker }, isFunction(this.props.renderStickerData) ? this.props.renderStickerData(groupData) : groupData.label));
    };
    UiGroupedMultiLazyList.prototype.classes = function () {
        var _this = this;
        var baseClass = 'uikit-select';
        return {
            item: function (isSelected, isDisabled) {
                return _this.classNames({
                    prefix: baseClass + "__option",
                    modifications: [{ disabled: isDisabled }, { selected: isSelected }, { 'group-ls': true }]
                });
            },
            group: this.classNames({
                prefix: baseClass + "__group",
                modifications: [{ 'group-ls': true }]
            }),
            sticker: this.classNames({
                prefix: baseClass + "__sticker",
                modifications: [{ 'group-ls': true }]
            })
        };
    };
    return UiGroupedMultiLazyList;
}(UiComponent));
export { UiGroupedMultiLazyList };
