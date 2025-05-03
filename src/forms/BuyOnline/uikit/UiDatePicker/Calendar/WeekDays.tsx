/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';

// import { UiComponentProps, classNames } from '../../../UiComponent';

import { UiComponentProps, classNames } from 'sletat-uikit2/dist/js/UiComponent';


export interface WeekDaysProps extends UiComponentProps {
    namesOfWeekDays: Array<string>;
}

export function WeekDays(props: WeekDaysProps) {
    const cx = classes();

    let nameWeekDayItem = props.namesOfWeekDays.map(weekDay => {
        return (
            <li
                key={`key:weekday-${weekDay}`}
                className={cx.item}
            >
                {weekDay}
            </li>
        );
    });

    return (
        <ul className={cx.root}>
            {nameWeekDayItem}
        </ul>
    );

    function classes() {
        return {
            root: classNames({
                prefix: 'uikit-datepicker__week-root',
                additionalClasses: props.wrapperClass
            }, props.bemModifications),
            item: classNames({
                prefix: 'uikit-datepicker__week-header'
            }, props.bemModifications)
        };
    }
}
