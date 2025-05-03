"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animate_1 = require("./animate");
function scrollToCoords(coords, ms, element) {
    var start = element ? element.scrollTop : window.pageYOffset;
    return new Promise(function (resolve, reject) {
        var end = coords.pageY;
        var getCalc = function (from, to) { return function (perc) { return (from - to) * (1 - perc) + to; }; };
        var calc = getCalc(start, end);
        var xCoord = coords.pageX
            ? coords.pageX
            : element
                ? element.scrollLeft
                : window.pageXOffset;
        return resolve({
            duration: ms,
            timing: animate_1.linear,
            draw: function (progress) {
                if (element) {
                    element.scrollTo(xCoord, calc(progress));
                }
                else {
                    window.scrollTo(xCoord, calc(progress));
                }
            }
        });
    })
        .then(function (animation) { return animate_1.animate(animation); });
}
exports.scrollToCoords = scrollToCoords;
