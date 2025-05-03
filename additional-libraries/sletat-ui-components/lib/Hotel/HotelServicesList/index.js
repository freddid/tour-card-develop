Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = require("react");
/* tslint:enable:no-unused-variable */
var lodash_1 = require("lodash");
var BEMClassNames_1 = require("sletat-common-utils/lib/BEM/BEMClassNames");
var Icon_1 = require("../../Icon");
require("./index.styl");
function HotelServicesList(props) {
    var wrapperClass = props.wrapperClass, bemModifications = props.bemModifications, svgIconHeight = props.svgIconHeight, svgIconWidth = props.svgIconWidth;
    return (React.createElement("ul", { className: getServicesListClassName(wrapperClass, bemModifications) }, lodash_1.map(props.facilities, function (facilityGroup, index) {
        return (React.createElement("li", { key: index, className: getServicesGroupItemClassName(bemModifications) },
            React.createElement("span", { className: getServicesGroupItemIconClassName(bemModifications) },
                React.createElement(Icon_1.Icon, { glyph: "#icon-" + getFacilityIconName(facilityGroup.name), width: svgIconWidth, height: svgIconHeight })),
            React.createElement("div", { className: getServicesGroupDescriptionClassName(bemModifications) },
                React.createElement("p", { className: getServicesGroupItemTitleClassName(bemModifications) }, facilityGroup.name + ":"),
                React.createElement("ul", { className: getServicesGroupListOfFacilitiesClassName(bemModifications) }, lodash_1.map(facilityGroup.facilities, function (facility, index) {
                    return (React.createElement("li", { key: index }, facility.name));
                })))));
    })));
}
exports.HotelServicesList = HotelServicesList;
/**
 * Получаем название иконки в зависимости от типа услуги.
 */
function getFacilityIconName(category) {
    return {
        'бизнес-услуги': 'business',
        'здоровье и красота': 'beauty',
        'интернет': 'internet',
        'общие услуги': 'main-services',
        'отдых на воде': 'water-recreation',
        'парковка': 'parking',
        'питание': 'meal',
        'пляж': 'beach',
        'пляжная линия': 'beach',
        'развлечения': 'rest',
        'спорт': 'sport',
        'транспорт': 'transport',
        'удобства в номерах': 'sofa',
        'услуги для детей': 'for-children',
        'услуги по чистке одежды': 'cleaning',
        'курение': 'smoking',
        'специальные номера': 'lux-room',
        'тип отеля': 'hotel-type',
        'тип пляжа': 'beach',
        'бассейн': 'pool',
        'премии и сертификаты': 'awards',
    }[category.toLowerCase()];
}
function getServicesListClassName(wrapperClass, bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'hotel-services',
        additionalClasses: wrapperClass || "",
        modifications: bemModifications || []
    });
}
function getServicesGroupItemClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'hotel-services__item',
        modifications: bemModifications || []
    });
}
function getServicesGroupItemIconClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'hotel-services__icon',
        modifications: bemModifications || []
    });
}
function getServicesGroupDescriptionClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'hotel-services__description',
        modifications: bemModifications || []
    });
}
function getServicesGroupItemTitleClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'hotel-services__title',
        modifications: bemModifications || []
    });
}
function getServicesGroupListOfFacilitiesClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'hotel-services__list',
        modifications: bemModifications || []
    });
}
