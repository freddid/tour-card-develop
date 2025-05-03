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
import { Component } from 'react';
import { union } from 'lodash';
import { GetBEMClassNames } from 'sletat-common-utils/lib/BEM/BEMClassNames';
var UiComponent = /** @class */ (function (_super) {
    __extends(UiComponent, _super);
    function UiComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * получаем итоговую строку со всеми классами, сложенную из бэм-модификаций, враппер классов и т.д.
     */
    UiComponent.prototype.classNames = function (params) {
        return classNames(params, this.props.bemModifications);
    };
    return UiComponent;
}(Component));
export { UiComponent };
// для использования stateless-компонентами
export function classNames(params, modifications) {
    if (modifications === void 0) { modifications = []; }
    return GetBEMClassNames({
        prefix: params.prefix,
        modifications: union(params.modifications || [], modifications),
        additionalClasses: params.additionalClasses || ''
    });
}
