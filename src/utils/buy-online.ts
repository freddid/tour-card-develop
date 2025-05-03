/* eslint-disable */
/* eslint-disable prettier/prettier */
import { upperFirst } from "lodash";
import { InputTextFormatter } from "sletat-uikit2/dist/js/input-formatters";

export function getRidOfPatronymic(fullName: string): string {
    const nameElements = fullName.split(' ').filter(Boolean);
    if (nameElements.length === 3) {
        return `${nameElements[0]} ${nameElements[1]}`;
    }

    return nameElements.join(' ');
}

export function nameFormatter(): InputTextFormatter {
    return function(currentValue: string, prevValue: string) {
        if (currentValue === prevValue) {
            return currentValue;
        }

        return upperFirst(currentValue);
    };
}
