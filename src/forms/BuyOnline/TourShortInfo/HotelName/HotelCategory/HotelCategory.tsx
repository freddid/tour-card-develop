/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as bemCn from 'bem-cn';

import { IconStar } from 'sletat-ui-components/lib/SVGIcons/IconStar';


interface HotelCategoryProps {
    category: string | null;
    iconWidth: number;
    iconHeight: number;
    wrapperClass?: string;
}

enum NonStarCategory {
    Apts = 'Apts',
    Villas = 'Villas',
    HV1 = 'HV-1',
    HV2 = 'HV-2'
}

export function HotelCategory(props: HotelCategoryProps) {

    const blockName = bemCn('hotel-category');

    const isNonStar = (category: string): boolean => {
        return [
            NonStarCategory.Apts,
            NonStarCategory.Villas,
            NonStarCategory.HV1,
            NonStarCategory.HV2
        ].indexOf(category as NonStarCategory) > -1;
    };

    if (!props.category) {
        return null;
    }

    return (
        <div className={blockName.mix(props.wrapperClass || '')()}>
            {isNonStar(props.category)
                ? props.category
                : props.category.replace('*', '')
            }
            {!isNonStar(props.category)
                ? (
                    <span className={blockName('icon')()}>
                        <IconStar
                            width={props.iconWidth}
                            height={props.iconHeight}
                            fill={'#ffca00'}
                        />
                    </span>
                )
                : null
            }
        </div>
    );
}
