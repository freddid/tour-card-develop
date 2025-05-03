"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapServices = exports.getServices = exports.TourServices2 = void 0;
exports.TourServices2 = {
    ACCOMMODATION: { name: 'проживание', type: 2 },
    MEDICAL_INSURANCE: { name: 'медицинская страховка', type: 3 },
    TRANSFER: { name: 'трансфер', type: 7 },
    EXCURSION: { name: 'экскурсия', type: 8 },
    NO_GO_GUARANTEE: { name: 'страховка от невыезда', type: 12 },
    OPERATOR_LIABILITY: { name: 'страхование ответственности ТО', type: 17 },
    GUIDE: { name: 'услуги гида', type: 18 },
    MEAL: { name: 'питание', type: 19 },
    FUEL_SURCHARGE: { name: 'топл.сбор', type: 20 },
    FLIGHT: { name: 'авиаперелёт', type: 21 }
};
var SERVICES_TYPES = {};
for (var _i = 0, _a = Object.values(exports.TourServices2); _i < _a.length; _i++) {
    var value = _a[_i];
    SERVICES_TYPES[value.type] = value.name;
}
function getServices(resources) {
    var result = {
        included: [],
        notIncluded: []
    };
    if (!resources || !resources.length) {
        return result;
    }
    var includedServices = new Set();
    var notIncludedServices = new Set();
    resources.forEach(function (resource) {
        if (resource.isChecked) {
            if (includedServices.has(resource.type))
                return;
            includedServices.add(resource.type);
        }
        else {
            if (notIncludedServices.has(resource.type))
                return;
            notIncludedServices.add(resource.type);
        }
    });
    // SLT-4115 Если трансфер пришел как isChecked:true и isChecked:false, то должны отображать его как включённый.
    if (includedServices.has(exports.TourServices2.TRANSFER.type) && notIncludedServices.has(exports.TourServices2.TRANSFER.type)) {
        notIncludedServices.delete(exports.TourServices2.TRANSFER.type);
    }
    includedServices.forEach(function (type) {
        var serviceName = SERVICES_TYPES[String(type)];
        if (!serviceName)
            return;
        result.included.push({
            type: type,
            name: serviceName
        });
    });
    notIncludedServices.forEach(function (type) {
        var serviceName = SERVICES_TYPES[String(type)];
        if (!serviceName)
            return;
        result.notIncluded.push({
            type: type,
            name: serviceName
        });
    });
    return result;
}
exports.getServices = getServices;
function wrapServices(services) {
    if (!services || !services.length)
        return [];
    return services.map(function (service) { return ({
        Name: service.name,
        Type: service.type
    }); });
}
exports.wrapServices = wrapServices;
