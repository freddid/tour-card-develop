/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';
import { SVGIcon } from '../svg-icon';


export function SorryWeDontHaveHotelInfo(props: any) {
    const cx = classes();

    return (
        <div className={cx.root}>
            <div className={cx.wrapper}>
                <div className={cx.illustration}>
                    <SVGIcon width={'108'} height={'108'} url="#icon-lux-room"/>
                </div>
                <p className={cx.title}>Увы, данных об отеле нет</p>
                {/*<p className={cx.text}>
                    Если вы&nbsp;хотите узнать больше <br />об&nbsp;этом отеле, пожалуйста, свяжитесь с&nbsp;нами.
                </p>*/}
            </div>
        </div>
    );

    function classes() {
        const BASE_CLASS = 'hotel-empty-data';

        return {
            root: classNames({
                [BASE_CLASS]: true
            }),
            wrapper: classNames({
                [`${BASE_CLASS}__wrapper`]: true
            }),
            title: classNames({
                [`${BASE_CLASS}__title`]: true
            }),
            illustration: classNames({
                [`${BASE_CLASS}__illustration`]: true
            }),
            text: classNames({
                [`${BASE_CLASS}__text`]: true
            }),
        };
    }
}
