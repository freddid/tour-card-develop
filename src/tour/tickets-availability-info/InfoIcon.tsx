/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';
import { HTMLProps } from 'react';
import { UiLoader } from 'sletat-uikit2/dist/js/UiLoader';


export interface InfoIconProps extends HTMLProps<HTMLSpanElement> {
    title: string;
    description?: string;
}

export function InfoIcon(props: InfoIconProps) {
    const cx = classes();

    return (
        <span>
            {/* svg icon */}
            {props.children}
            <span className={cx.title}>
                {props.title}
            </span>
            {props.description
                ? <span className={cx.description}>{props.description}</span>
                : <UiLoader bemModifications={['micro', 'gray']} />}
        </span>
    );

    function classes() {
        return {
            title: classNames({
                'tour-properties__title': true
            }),
            description: classNames({
                'tour-properties__description': true
            })
        };
    }
}
