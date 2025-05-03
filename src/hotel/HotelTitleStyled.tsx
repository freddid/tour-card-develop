/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as classNames from 'classnames';
import { isEqual } from 'lodash';

import { HotelTitle } from './HotelTitle';


export interface HotelTitleStyledProps {
    hotelName: string | null;
    hotelCategory: string | null;
}

export class HotelTitleStyled extends React.Component<HotelTitleStyledProps, {}> {

    shouldComponentUpdate(nextProps: HotelTitleStyledProps) {
        return !isEqual(this.props, nextProps);
    }

    render() {
        const props = this.props;
        const cx = this.classes();

        return (
            <p className={cx.title}>
                <HotelTitle
                    name={props.hotelName}
                    category={props.hotelCategory}
                    bemModifications={[cx.titleModification]}
                />
            </p>
        );
    }

    private classes() {
        return {
            title: classNames({
                'card-hotel__title': true
            }),
            titleModification: classNames({
                'hotel-title': true
            })
        };
    }
}
