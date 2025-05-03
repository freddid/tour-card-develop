/* eslint-disable */
/* eslint-disable prettier/prettier */
export interface BodyOverflow {
    x: string | null;
    y: string | null;
    pageXOffset: number;
    pageYOffset: number;
}

export interface PageSettings {
    pageXOffset: number;
    pageYOffset: number;
    overflowX: string | null;
    overflowY: string | null;
    bodyPosition: string | null;
}

export function getBodyOverflow(): BodyOverflow {
    return {
        x: window.document.body.style.overflowX,
        y: window.document.body.style.overflowY,
        pageXOffset: window.pageXOffset,
        pageYOffset: window.pageYOffset,
    };
}

export function getPageSettingsForIOS(): PageSettings {
    return {
        pageXOffset: window.pageXOffset,
        pageYOffset: window.pageYOffset,
        overflowX: window.document.documentElement.style.overflowX,
        overflowY: window.document.documentElement.style.overflowY,
        bodyPosition: window.document.body.style.position
    };
}

export function setBodyOverflowHidden() {
    window.document.body.style.overflowX = 'hidden';
    window.document.body.style.overflowY = 'hidden';
}

export function setPageSettingsForIOS() {
    if (/iPad|iPhone|iPod/i.test(window.navigator.userAgent)) {
        window.document.body.style.height = '100%';
        window.document.body.style.position = 'static';
        window.document.documentElement.style.height = '100%';
        window.document.documentElement.style.position = 'relative';
        window.document.documentElement.style.overflowX = 'hidden';
        window.document.documentElement.style.overflowY = 'hidden';
        window.scrollTo(0, 0);
    }
}

export function returnPreviousBodyOverflow(prevBody: BodyOverflow) {
    window.document.body.style.overflowX = prevBody.x as string;
    window.document.body.style.overflowY = prevBody.y as string;
    window.scrollTo(prevBody.pageXOffset, prevBody.pageYOffset);
}

export function returnPreviousPageSettingsForIOS(prevSettings: PageSettings) {
    if (/iPad|iPhone|iPod/i.test(window.navigator.userAgent)) {
        window.document.body.style.height = 'auto';
        window.document.body.style.position = prevSettings.bodyPosition as string;
        window.document.documentElement.style.height = 'auto';
        window.document.documentElement.style.position = 'static';
        window.document.documentElement.style.overflowX = prevSettings.overflowX as string;
        window.document.documentElement.style.overflowY = prevSettings.overflowY as string;
        window.scrollTo(prevSettings.pageXOffset, prevSettings.pageYOffset);
    }
}
