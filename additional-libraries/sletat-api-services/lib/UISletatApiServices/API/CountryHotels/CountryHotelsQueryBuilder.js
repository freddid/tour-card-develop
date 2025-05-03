"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryHotelsQueryBuilder = void 0;
var FROM_ZERO_TO_NINE = '0-9';
var SEARCH_BY_NAME_WHERE_FIRST_SYMBOL_IS_NUMBER = "substring(OriginalName, 0, 1) ge '0' and substring(OriginalName, 0, 1) le '9' or substring(Name, 0, 1) ge '0' and substring(Name, 0, 1) le '9'";
var getQueryForStringSearch = function (str) {
    var query;
    if (str === FROM_ZERO_TO_NINE) {
        query = SEARCH_BY_NAME_WHERE_FIRST_SYMBOL_IS_NUMBER;
    }
    else if (str.length !== 0) {
        if (str.length === 1) {
            query = "(startswith(tolower(OriginalName), tolower('".concat(str, "')) or startswith(tolower(Name), tolower('").concat(str, "')))");
        }
        else {
            query = "(indexof(tolower(OriginalName), tolower('".concat(str, "')) ne -1 or indexof(tolower(Name), tolower('").concat(str, "')) ne -1)");
        }
    }
    return query;
};
var getQueryForResortIDSearch = function (id) {
    var query = '';
    if (id) {
        query = "ResortId eq ".concat(id);
    }
    return query;
};
var getQueryForHotelCategoryIDSearch = function (id) {
    var query = '';
    if (id) {
        query = "Category/Id eq ".concat(id);
    }
    return query;
};
/**
 * @deprecated в пользу src/ui/find-hotels/utils/query-builder
 */
var CountryHotelsQueryBuilder = function (resortID, categoryID, str) {
    return [
        getQueryForStringSearch(str),
        getQueryForResortIDSearch(resortID),
        getQueryForHotelCategoryIDSearch(categoryID)
    ]
        .filter(function (val) { return !!val; })
        .join(' and ');
};
exports.CountryHotelsQueryBuilder = CountryHotelsQueryBuilder;
