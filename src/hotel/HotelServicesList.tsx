/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { HotelServicesList as OriginalHotelServicesList } from 'sletat-ui-components/lib/Hotel/HotelServicesList';
import { IFacilityGroup } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfoResponse';

import { SorryWeDontHaveHotelInfo } from './SorryWeDontHaveHotelInfo';


export interface  HotelServicesListProps {
    facilities: Array<IFacilityGroup>;
}

export function HotelServicesList(props: HotelServicesListProps) {
    return (
        <div>
            {props.facilities.length ?
                <OriginalHotelServicesList
                    facilities={props.facilities}
                    svgIconHeight={32}
                    svgIconWidth={32}
                />
            : <SorryWeDontHaveHotelInfo /> }
        </div>
    );
}
