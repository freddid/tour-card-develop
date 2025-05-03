/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as bemCn from 'bem-cn';

import { HotelCategory } from './HotelCategory';


interface HotelNameProps {
    hotelName: string;
    hotelStarsName: string;
}


export function HotelName(props: HotelNameProps) {
    const blockName = bemCn('hotel-name');

    return (
        <div className={blockName()}>
            <HotelCategory
                category={props.hotelStarsName}
                iconWidth={12}
                iconHeight={12}
                wrapperClass={blockName('hotel-category')()}
            />
            <b>{props.hotelName}</b>
        </div>
    );
}
