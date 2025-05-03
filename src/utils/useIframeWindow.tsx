/* eslint-disable */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { IFRAME_ID } from "../types-and-consts";

/**
 *
 * хук получения window внутри iframe потому tour-card работает внутри iframe
 */
export const useIframeWindow = () => {
    const [window, setWindow] = useState<Window | null>(null);
    useEffect(() => {
        const container = document.querySelector(`#${IFRAME_ID}[data-target='module-6.0']`);
        const window = (container as HTMLIFrameElement)?.contentWindow;
        setWindow(window);
    }, []);

    return window;
};
