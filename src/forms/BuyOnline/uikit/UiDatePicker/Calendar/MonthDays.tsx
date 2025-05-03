/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';

// import { UiComponentProps, classNames } from '../../../UiComponent';
// import { DayModel } from './index';

import { UiComponentProps, classNames } from 'sletat-uikit2/dist/js/UiComponent';
import { DayModel } from '.';


export interface MonthDaysProps extends UiComponentProps {
    modelsMonthDays: Array<Array<DayModel>>;
    handleSelectDate: (dayModel: DayModel) => void;
}

export function MonthDays(props: MonthDaysProps) {
    const cx = classes();

    let monthDays = props.modelsMonthDays.map((weekRow: Array<DayModel>, i: number) => {
        let keyIdWeek = `key:datepicker__month:week:${JSON.stringify(weekRow)}`;
        let rowDays: Array<JSX.Element> = weekRow.map((dayModel: DayModel) => {
            return (
                <li
                    key={`key:datepicker__month:date:${JSON.stringify(dayModel)}`}
                    className={cx.day(dayModel)}
                    onMouseDown={() => {
                        if (!dayModel.isOutOfLimits) {
                            props.handleSelectDate(dayModel);
                        }
                    }}
                >
                    {dayModel.date}
                </li>
            );
        });

        return (
            <ul key={keyIdWeek} className={cx.week}>
                {rowDays}
            </ul>
        );
    });

    return (
        <div className={cx.root}>
            {monthDays}
        </div>
    );

    function classes() {
        return {
            day: (dayModel: DayModel) => classNames({
                prefix: 'uikit-datepicker__month-day',
                modifications: [{
                    'holiday': !!dayModel.isHoliday,
                    'disabled': !!dayModel.isNextMonth || !!dayModel.isPrevMonth,
                    'today': !!dayModel.isToday,
                    'selected-day': !!dayModel.isSelected,
                    'restricted': !!dayModel.isOutOfLimits
                }],
                additionalClasses: props.wrapperClass
            }, props.bemModifications),
            week: classNames({
                prefix: 'uikit-datepicker__month-week'
            }, props.bemModifications),
            root: classNames({
                prefix: 'uikit-datepicker__month-root',
                additionalClasses: props.wrapperClass
            }, props.bemModifications)
        };
    }

}
