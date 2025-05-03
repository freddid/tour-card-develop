"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Составляем итоговую строку классов по бэм методологии.
 * prefix - основна класса, конкатенируется с каждым элементом массива modifications
 * additionalClasses - не совсем по бэму, но добавляем любой произвольный класс, не добавляя к нему модификаторы
 * modifications - массив с дополнительными классами-модификаторами
 */
function GetBEMClassNames(params) {
    var classNameBemModificators = [params.prefix].concat(addModificationsToPrefix(params.prefix, params.modifications || []));
    if (params.additionalClasses) {
        return classNameBemModificators.join(' ') + ' ' + params.additionalClasses;
    }
    else {
        return classNameBemModificators.join(' ');
    }
}
exports.GetBEMClassNames = GetBEMClassNames;
function addModificationsToPrefix(prefix, mods) {
    var classes = [];
    prefix = (prefix.length !== 0) ? prefix + '_' : '';
    if (mods !== undefined && mods.length !== 0) {
        var modsNumber = mods.length;
        for (var index = 0; index < modsNumber; index++) {
            var currentMod = mods[index];
            if (typeof currentMod === 'string' && currentMod.length !== 0) {
                classes.push(prefix + mods[index]);
            }
            if (typeof currentMod === 'object') {
                for (var key in currentMod) {
                    if (currentMod[key]) {
                        classes.push(prefix + key);
                    }
                }
            }
        }
    }
    return classes;
}
exports.addModificationsToPrefix = addModificationsToPrefix;
