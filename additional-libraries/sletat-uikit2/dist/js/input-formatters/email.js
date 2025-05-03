export function emailFormatter(options) {
    return function (currentValue, prevValue) {
        if (currentValue === prevValue) {
            return currentValue;
        }
        var matches = /^[^<>()\[\],;:\s\\"]*$/i.exec(currentValue);
        if (matches) {
            return currentValue;
        }
        return prevValue;
    };
}
