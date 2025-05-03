/* eslint-disable */
/* eslint-disable prettier/prettier */
import { InputMaskResult, InputTextMask } from 'sletat-uikit2/dist/js/input-masks/input-mask-handler';


export function snilsMask(): InputTextMask {
    return function(currentValue: string, prevValue: string, startCaretPosition: number, endCaretPosition: number ): InputMaskResult {
        const isDeletion = !!prevValue && currentValue.length < prevValue.length;

        if (isDeletion) {
            return { value: currentValue, startCaretPosition, endCaretPosition: startCaretPosition };
        }

        const raw = trim(currentValue, startCaretPosition);

        if (raw.value.length > 11) {
            raw.value = raw.value.slice(0, 11);
            raw.caret = raw.caret < raw.value.length ? raw.caret : raw.value.length;
        }

        const result = raw.value.split('').reduce(
            (result, ch, idx) => {
                if ([2, 5, 8].some(i => i === idx)) {
                    return {
                        value: `${result.value + ch}-`,
                        caret: idx < raw.caret ? result.caret + 1 : result.caret
                    };
                }

                return {
                    value: result.value + ch,
                    caret: result.caret
                };
            },
            { value: '', caret: raw.caret }
        );

        return { value: result.value, startCaretPosition: result.caret, endCaretPosition: result.caret };
    };
}


function trim(value: string, caret: number): { value: string, caret: number } {
    const headOrig = value.substring(0, caret);
    const tail = value.substring(caret).replace(/\D/gm, '');

    const head = headOrig.replace(/\D/gm, '');

    return {
        value: [head, tail].join(''),
        caret: caret - (headOrig.length - head.length)
    };
}
