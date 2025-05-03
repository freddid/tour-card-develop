/* eslint-disable */
/* eslint-disable prettier/prettier */
/** @format */

import * as React from "react";
import { IconMIR } from "../../icons/IconMIR";
import { Cashback } from "../../utils/cashback";

interface LabelCashbackProps {
    cashback: Cashback;
}

export const LabelCashback = (props: LabelCashbackProps) => {
    return (
        <div className={"cashbackMIR-label"}>
            Отель с кешбэком {props.cashback.percent}% на <IconMIR />
        </div>
    );
};
