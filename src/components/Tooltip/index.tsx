/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from "react";
import * as classNames from "classnames";
import { memo, useEffect, useRef, useState } from "react";
import { IconCross2 } from "../../icons/IconCross2";
import { useIframeWindow } from "../../utils/useIframeWindow";

interface TooltipProps {
    children: JSX.Element;
    content: JSX.Element;
    disabled?: boolean;
}

const mainBaseClass = "tooltip";

const classes = {
    root: classNames({
        [mainBaseClass]: true,
    }),
    close: classNames({
        [`${mainBaseClass}__close`]: true,
    }),
    relative: classNames({
        [`${mainBaseClass}__relative`]: true,
    }),
};

const _Tooltip = ({ children, content, disabled }: TooltipProps) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [mouseOut, setMouseOut] = useState(true);

    const divRef = useRef<HTMLDivElement>(null);
    const iframeWindow = useIframeWindow();

    useEffect(() => {
        const iframedocument = iframeWindow?.document;
        iframedocument?.addEventListener("click", outsideclick);

        return () => {
            iframedocument?.removeEventListener("click", outsideclick);
        };
    }, [mouseOut, tooltipOpen, iframeWindow]);

    const showTooltip = () => {
        if (disabled) return;
        setTooltipOpen(true);
    };

    const closeTooltip = () => {
        setTooltipOpen(false);
    };

    const outsideclick = () => {
        if (mouseOut && tooltipOpen && !disabled) {
            closeTooltip();
        }
    };

    return (
        <div className={classes.relative}>
            <div
                ref={divRef}
                onMouseEnter={() => setMouseOut(false)}
                onMouseLeave={() => setMouseOut(true)}
                style={{
                    visibility: tooltipOpen ? "visible" : "hidden",
                }}
                className={classes.root}
            >
                <div onClick={closeTooltip} className={classes.close}>
                    <IconCross2 />
                </div>
                {content}
            </div>
            <div onClick={showTooltip}>{children}</div>
        </div>
    );
};

export const Tooltip = memo(_Tooltip);
