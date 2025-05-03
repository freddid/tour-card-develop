/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';

import { HotelRating } from 'sletat-ui-components/lib/Hotel/HotelRating';
import { GetBEMClassNames } from 'sletat-common-utils/lib/BEM/BEMClassNames';
import { SVGIcon } from './../svg-icon';

export interface HotelTitleProps {
    name: string | null;
    category: string | number | null;
    hotelRate?: number | null;
    bemModifications?: Array<string>;
}

export const HotelTitle = (props: HotelTitleProps) => {
    const cx = classes();

    return (
        <span>
            { props.name }
            <span className={cx.hotelRating}>
                { String(props.category).replace('*', '') }
                <span className={cx.ratingStars}>
                    <SVGIcon width={'100%'} height={'100%'} url="#icon-star"/>
                </span>
            </span>
            { props.hotelRate ?
                <HotelRating rating={ props.hotelRate } />
                : null
            }
        </span>
    );

    function classes() {
        return {
            hotelRating: classNames({
                [GetBEMClassNames({ prefix: 'hotel-rating', modifications: props.bemModifications })]: true
            }),
            ratingStars: classNames({
                [GetBEMClassNames({ prefix: 'hotel-rating__star', modifications: props.bemModifications })]: true
            })
        };
    }
};
