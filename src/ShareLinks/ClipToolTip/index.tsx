/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { CSSProperties } from 'react';
import * as classNames from 'classnames';
import './index.css';


export interface ClipToolTipProps {
    messageText: string;
    isOpened: boolean;
    onClose: () => void;
    styles?: CSSProperties;
}


export function ClipToolTip(props: ClipToolTipProps) {
    const cx = classes();

    return (
        <div className={cx.tooltip} style={props.styles}>
            <input
                type="text"
                className={cx.text}
                readOnly={true}
                value={props.messageText}
            />
            <button
                className={cx.btnClose}
                onClick={(e) => {
                    props.onClose();
                    e.stopPropagation();
                }}>
            </button>
        </div>
    );

    function classes() {
        const BASE_CLASS = 'clip';

        return {
            tooltip: classNames({
                [`${BASE_CLASS}__tooltip`]: true,
                [`${BASE_CLASS}__opened`]: !!props.isOpened
            }),
            text: classNames({
                [`${BASE_CLASS}__text`]: true
            }),
            btnClose: classNames({
                [`${BASE_CLASS}__close-btn`]: true
            })
        };
    }
}
