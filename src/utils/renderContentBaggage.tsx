/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from "react";
import { IconCross } from "../icons/IconCross";
import { IconWarning } from "../icons/IconWarning";

export type StatusType =
    | "undefined"
    | "value"
    | "notIncluded"
    | "unknown"
    | "differentWeights";

export const renderContentBaggage = (
    status: StatusType,
    value?: number | null
) => {
    switch (status) {
        case "differentWeights":
            return (
                <div className={"render_content_baggage__icon_warnihg"}>
                    <IconWarning />
                </div>
            );
        case "notIncluded":
            return <IconCross />;
        case "value":
            return <span>{value}</span>;
    }
};
