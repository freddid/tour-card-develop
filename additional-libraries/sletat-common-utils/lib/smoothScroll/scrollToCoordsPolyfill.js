"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scrollToCoords_1 = require("./scrollToCoords");
function scrollToCoordsPolyfill(coords, element) {
    var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
    if (!element) {
        if (!isSmoothScrollSupported) {
            return scrollToCoords_1.scrollToCoords({ pageY: coords.pageY }, 500);
        }
        window.scrollTo({
            top: coords.pageY,
            behavior: 'smooth'
        });
        return Promise.resolve();
    }
    var isScrollInsideElementSupported = 'scrollTo' in element;
    if (!isScrollInsideElementSupported) {
        element.scrollTop = coords.pageY;
        return Promise.resolve();
    }
    if (isSmoothScrollSupported) {
        element.scrollTo({
            top: coords.pageY,
            behavior: 'smooth'
        });
        return Promise.resolve();
    }
    return scrollToCoords_1.scrollToCoords({ pageY: coords.pageY }, 500, element);
}
exports.scrollToCoordsPolyfill = scrollToCoordsPolyfill;
