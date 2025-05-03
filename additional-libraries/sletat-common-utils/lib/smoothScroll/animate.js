'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @deprecated Нужно использовать src/animate
 */
function animate(options) {
    return new Promise(function (resolve, reject) {
        var start = window.performance ? window.performance.now() : Date.now();
        window.requestAnimationFrame(function animate(time) {
            // timeFraction от 0 до 1
            var timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) {
                timeFraction = 1;
            }
            // текущее состояние анимации
            var progress = options.timing(timeFraction);
            options.draw(progress);
            if (timeFraction < 1) {
                window.requestAnimationFrame(animate);
                return;
            }
            // конец анимации
            resolve();
        });
    });
}
exports.animate = animate;
function linear(timeFraction) {
    return timeFraction;
}
exports.linear = linear;
