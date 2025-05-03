/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';

import { UiComponent, UiComponentProps } from 'sletat-uikit2/dist/js/UiComponent';
import {
    UiAdaptiveSingleSelect,
    UiSingleSelectChangeState,
    UiSingleSelectOption
} from 'sletat-uikit2/dist/js/selects/UiAdaptiveSingleSelect/UiAdaptiveSingleSelect';
import { MonthDays } from './MonthDays';
import { WeekDays } from './WeekDays';


export interface DayModel {
    id: number;
    date: number;
    month: number;
    year: number;

    isSelected?: boolean;
    isToday?: boolean;
    isHoliday?: boolean;
    isNextMonth?: boolean;
    isPrevMonth?: boolean;
    isOutOfLimits?: boolean;
}

export interface CalendarProps extends UiComponentProps {
    selectedYear: number | null;
    selectedMonth: number | null;
    selectedDay: number | null;
    listOfYears: Array<number>;
    namesOfMonths: Array<string>;
    namesOfWeekDays: Array<string>;
    minDate: Date | null;
    maxDate: Date | null;
    onChangeDate: (state: CalendarDateState) => void;
}


export enum CalendarDateElement { year, month, day }


export interface CalendarDateState {
    date: Date;
    changedDateElement: CalendarDateElement;
}


export class Calendar extends UiComponent<CalendarProps, {}> {

    render() {
        let cx = this.classes();

        return (
            <div className={cx.root}>
                <div className={cx.header}>
                    <UiAdaptiveSingleSelect
                        inputName={'month-select'}
                        inputValue={this.props.namesOfMonths[this.selectedMonth]}
                        options={this.getListOfMonths()}
                        maxHeightList={220}
                        placeholderText={'Месяц...'}
                        isAdaptive={false}
                        tabIndex={-1}
                        wrapperClass={'uikit-datepicker__month'}
                        bemModifications={this.props.bemModifications}
                        onChange={(state: UiSingleSelectChangeState) => {
                            this.props.onChangeDate({
                                date: new Date(
                                    this.selectedYear,
                                    this.props.namesOfMonths.indexOf(state.selectedValue),
                                    this.props.selectedDay || 1
                                ),
                                changedDateElement: CalendarDateElement.month
                            });
                        }}
                    />

                    <UiAdaptiveSingleSelect
                        inputName={'year-select'}
                        inputValue={String(this.selectedYear)}
                        options={this.getListOfYears()}
                        maxHeightList={220}
                        placeholderText={'Год...'}
                        isAdaptive={false}
                        tabIndex={-1}
                        wrapperClass={'uikit-datepicker__year'}
                        bemModifications={this.props.bemModifications}
                        onChange={(state: UiSingleSelectChangeState) => {
                            this.props.onChangeDate({
                                date: new Date(
                                    parseInt(state.selectedValue, 10),
                                    this.selectedMonth,
                                    this.props.selectedDay || 1
                                ),
                                changedDateElement: CalendarDateElement.year
                            });
                        }}
                    />
                </div>
                <div className={cx.body}>
                    <WeekDays
                        namesOfWeekDays={this.props.namesOfWeekDays}
                        bemModifications={this.props.bemModifications}
                    />

                    <MonthDays
                        modelsMonthDays={this.generateDaysModel(this.props.selectedDay)}
                        bemModifications={this.props.bemModifications}
                        handleSelectDate={(dayModel: DayModel) => {
                            this.props.onChangeDate({
                                date: new Date(dayModel.year, dayModel.month, dayModel.date),
                                changedDateElement: CalendarDateElement.day
                            });
                        }}
                    />
                </div>
            </div>
        );
    }

    protected classes() {
        return {
            root: this.classNames({
                prefix: 'uikit-datepicker__calendar',
                additionalClasses: this.props.wrapperClass
            }),
            header: this.classNames({
                prefix: 'uikit-datepicker__calendar-header'
            }),
            body: this.classNames({
                prefix: 'uikit-datepicker__calendar-body'
            })
        };
    }

    private get selectedMonth(): number {
        return this.props.selectedMonth || 0;
    }

    private get selectedYear(): number {
        return this.props.selectedYear || new Date().getFullYear();
    }

    private getListOfMonths(): Array<UiSingleSelectOption> {
        return this.props.namesOfMonths.map((monthName: string, i: number) => {
            return {
                inputValue: monthName,
                label: monthName,
                isChecked: i === this.selectedMonth
            };
        });
    }

    private getListOfYears(): Array<UiSingleSelectOption> {
        return this.props.listOfYears.map((yearName: number) => {
            return {
                inputValue: String(yearName),
                label: String(yearName),
                isChecked: yearName === this.selectedYear
            };
        });
    }

    /**
     * форматы передаваемых параметров соответствуют формату возвращаемых
     * значений методами объектов типа Date:
     *  - например, для января month будет 0
     *  - например, для 1 числа date будет 1
     */
    private isToday(year: number, month: number, date: number): boolean {
        let today: Date = new Date();

        return this.isDatesEquals(
            new Date(year, month, date),
            new Date(today.getFullYear(), today.getMonth(), today.getDate())
        );
    }

    /**
     * ограничена ли для выбора переданная дата максимальным или минимальным значением
     */
    private isOutOfLimits(date: Date): boolean {
        let restrictedByMin: boolean = this.props.minDate instanceof Date && date.getTime() < this.props.minDate.getTime();
        let restrictedByMax: boolean = this.props.maxDate instanceof Date && date.getTime() > this.props.maxDate.getTime();

        return restrictedByMin || restrictedByMax;
    }

    /**
     * сравнивает два дня
     */
    private isDatesEquals(dateObject: Date, dateObject2: Date): boolean {
        return dateObject.getTime() === dateObject2.getTime();
    }

    /**
     * основной метод, который формирует двумерный массив для моделей дней
     *
     * важно: метод не оперирует JSX, только возращает массив
     * само JSX представление формируется stateless компонентом, который
     * в качестве пропсов принимает массив, возвращаемый данным методом
     */
    private generateDaysModel(day: number | null): Array<Array<DayModel>> {
        // объект Date для текущего месяца
        // timestamp на первом дне месяца
        let currentMonth: Date = new Date(this.selectedYear, this.selectedMonth);

        // объект Date для следующего месяца
        // используется, чтобы заполнить пробелы днями из следующего месяца
        let nextMonth: Date = new Date(this.selectedYear, this.selectedMonth + 1);

        // сместим timestamp на последний день интересующего нас месяца
        nextMonth.setDate(nextMonth.getDate() - 1);

        // получим день недели для первого дня в месяце (0 - воск.)
        let firstWeekDay: number = currentMonth.getDay();

        // получим день недели для последего дня в месяце (0 - воск.)
        let lastWeekDay: number = nextMonth.getDay();

        // последнее число в месяце
        let lastMonthDate: number = nextMonth.getDate();

        // нужно ли заполнять пустые ячейки днями из предыдущего месяца
        // если первый день месяца не понедельник, то нужно
        let needFillPrevMonth: boolean = firstWeekDay !== 1;

        // нужно ли заполнять пустые ячейки днями из следующего месяца
        // если последний день месяца не воскресенье, то нужно
        let needFillNextMonth: boolean = lastWeekDay !== 0;

        // двумерный массив моделей, который будет возвращён этим методом
        let modelDays: Array<Array<DayModel>> = [];

        // заполним днями предыдущего месяца (если это необходимо)
        if (needFillPrevMonth) {
            // создадим копию объета Date, т.к будет проверять дни из предыдущего месяца
            let prevMonth: Date = new Date(currentMonth.getTime());

            // сколько дней нужно заполнить из предыдущего месяца
            // например: если первый день месяца - восресенье, то 6
            let howManyNeedFill: number = (firstWeekDay === 0) ? 6 : firstWeekDay - 1;

            // передвинем timestamp на самый первый день предыдущего месяца,
            // начиная с которого нужно заполнять
            prevMonth.setDate(prevMonth.getDate() - howManyNeedFill);

            let firstRow: DayModel[] = []; // самая первая строка из дней

            for (let i = 0; i < howManyNeedFill; i++) {
                let currentDay: number = prevMonth.getDay(); // номер дня недели
                let currentDate: number = prevMonth.getDate(); // число
                let currentMonthNum: number = prevMonth.getMonth(); // номер месяца
                let currentYear: number = prevMonth.getFullYear(); // год

                // если воскресенье или суббота, то пометим как выходной
                let isHoliday: boolean = (currentDay === 0) || (currentDay === 6);

                // сама модель дня
                let dayModel: DayModel = {
                    id: Date.now(),
                    date: currentDate,
                    month: currentMonthNum,
                    year: currentYear,
                    isPrevMonth: true,
                    isHoliday,
                    isOutOfLimits: this.isOutOfLimits(prevMonth)
                };

                firstRow.push(dayModel); // добавим модель в ряд
                prevMonth.setDate(prevMonth.getDate() + 1); // перейдем к следующему дню
            }
            modelDays.push(firstRow); // добавим первый ряд в массив
        }

        // заполнение днями текущего месяца с первого числа по последнее
        let currentRow = 0; // первый ряд может быть неполон, поэтому начинаем с него

        for (let i = 0; i < lastMonthDate; i++) {
            let currentDay: number = currentMonth.getDay(); // число дня недели
            let currentDate: number = currentMonth.getDate(); // число в месяце
            let currentMonthNum: number = currentMonth.getMonth(); // номер месяца
            let currentYear: number = currentMonth.getFullYear(); // год

            // проверка на воскр. нужна чтобы перейти после к следующему ряду
            let isSunday: boolean = currentDay === 0;
            let isHoliday: boolean = isSunday || currentDay === 6; // пометим выходной

            // пометим сегодняшний день
            let isToday: boolean = this.isToday(currentYear, currentMonthNum, currentDate);

            // пометим текущий выбранный день
            let isSelected: boolean = !!day && this.isDatesEquals(
                new Date(this.selectedYear, this.selectedMonth, day),
                new Date(currentYear, currentMonthNum, currentDate)
            );

            // если очередной ряд ещё не создан, то создать
            // такое может случиться, если не нужно забивать днями из предыдующего месяца
            if (!modelDays[currentRow]) {
                modelDays.push([]);
            }

            // сама модель дня
            let dayModel: DayModel = {
                id: Date.now(),
                date: currentDate,
                month: currentMonthNum,
                year: currentYear,
                isSelected,
                isToday,
                isHoliday,
                isOutOfLimits: this.isOutOfLimits(currentMonth)
            };

            modelDays[currentRow].push(dayModel);

            // переходим на следующий день
            currentMonth.setDate(currentMonth.getDate() + 1);

            // если это конец недели (т.е. воск.), то перейдём на следующий ряд
            if (isSunday) {
                currentRow++;
            }
        }

        // заполнение днями следующего месяца (если это необходимо)
        if (needFillNextMonth) {
            // последний ряд, который нужно заполнить
            let lastRow: DayModel[] = modelDays[modelDays.length - 1];
            let howManyNeedFill: number = 7 - lastRow.length; // сколько дней заполнить

            // передвинем timestamp на первый день следующего месяца
            nextMonth.setDate(nextMonth.getDate() + 1);

            for (let i = 0; i < howManyNeedFill; i++) {
                let currentDay: number = nextMonth.getDay(); // номер дня недели
                let currentDate: number = nextMonth.getDate(); // число в месяце
                let currentMonthNum: number = nextMonth.getMonth(); // номер месяца
                let currentYear: number = nextMonth.getFullYear(); // год

                // если это суббота или воскресенье, то пометим как выходной
                let isHoliday: boolean = (currentDay === 0) || (currentDay === 6);

                // сама модель дня
                let dayModel: DayModel = {
                    id: Date.now(),
                    date: currentDate,
                    month: currentMonthNum,
                    year: currentYear,
                    isNextMonth: true,
                    isHoliday,
                    isOutOfLimits: this.isOutOfLimits(nextMonth)
                };

                lastRow.push(dayModel);
                nextMonth.setDate(nextMonth.getDate() + 1); // перейдём на следующий день
            }
        }

        return modelDays;
    }
}
