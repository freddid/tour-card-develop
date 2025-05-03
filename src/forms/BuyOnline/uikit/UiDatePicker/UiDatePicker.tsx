/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { toNumber, isNumber, min } from 'lodash';

import * as DateUtils from 'sletat-common-utils/lib/date';
import { UiComponent, UiComponentProps } from 'sletat-uikit2/dist/js/UiComponent';
import { UiControlProps, UiControlTooltipProps } from 'sletat-uikit2/dist/js/UiComponent';
import { UiText, UiTextChangeState, UiTextBaseProps } from 'sletat-uikit2/dist/js/UiText/UiText';
import { dateMask } from 'sletat-uikit2/dist/js/input-masks/date';
import { DateMaskCorrectionType } from 'sletat-uikit2/dist/js/input-masks/date';

import { Calendar, CalendarDateElement, CalendarDateState } from './Calendar';


export interface UiDatePickerProps extends UiComponentProps, UiControlTooltipProps, UiControlProps, UiTextBaseProps {
    inputName: string;
    inputRef: (elem: HTMLInputElement | HTMLTextAreaElement | null) => void;
    listOfYears: Array<number>;
    inputValue: string | null;
    controlTitle?: string | JSX.Element;
    namesOfWeekDays?: Array<string>;
    namesOfMonths?: Array<string>;
    max?: string;
    min?: string;
    autofocus?: boolean;
    isEditable?: boolean;
    isDisabled?: boolean;
    useTooltipAnimation?: boolean;
    onInputDate: (state: UiDatePickerChangeState) => void;
    onSelectDate: (state: UiDatePickerChangeState) => void;
    onMaskCorrection?: (correctionType: DateMaskCorrectionType) => void;
    onValidationIconClick?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyDown?: () => void;
    onOpenCalendar?: () => void;
    onHideCalendar?: () => void;
}

export interface UiDatePickerChangeState {
    value: string;
    isValid: boolean;
}

export interface UiDatePickerState {
    isOpened: boolean;
}

export class UiDatePicker extends UiComponent<UiDatePickerProps, UiDatePickerState> {

    private static WEEK_DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    private static MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
        'Октябрь', 'Ноябрь', 'Декабрь'];

    private rootElem: HTMLElement | null = null;
    private isOutsideClick = true;
    private isFocused = false;


    constructor(props: UiDatePickerProps) {
        super(props);

        this.state = {
            isOpened: false
        };
    }

    componentWillUnmount() {
        this.detachOutsideHandler();
    }


    render() {
        let cx = this.classes();

        return (
            <fieldset
                ref={(elem: HTMLFieldSetElement) => this.rootElem = elem}
                className={cx.root}
                onMouseDown={() => this.isOutsideClick = false}
                onMouseUp={() => this.isOutsideClick = true}
            >
                {this.renderControlTitle()}
                <div
                    className={cx.inputWrapper}
                    onClick={() => !this.props.isDisabled && this.showCalendar()}
                >
                    <UiText
                        inputValue={this.normalizeDate(this.props.inputValue)}
                        maskOptions={{
                            mask: dateMask({
                                minValidYear: min(this.props.listOfYears),
                                onMaskCorrection: this.props.onMaskCorrection
                            }),
                            shouldCallOnChangeAfterMaskApplied: true
                        }}
                        inputName={this.props.inputName}
                        inputRef={(elem) => this.props.inputRef(elem)}
                        isError={this.props.isError}
                        isValid={this.props.isValid}
                        autofocus={this.props.autofocus}
                        autocomplete={this.props.autocomplete}
                        tabIndex={this.props.tabIndex}
                        bemModifications={(this.props.bemModifications || []).concat('datepicker')}
                        tooltipErrorText={this.props.tooltipErrorText}
                        tooltipHelpText={this.props.tooltipHelpText}
                        placeholderText={this.props.placeholderText}
                        isReadonly={this.props.isEditable === false}
                        isDisabled={this.props.isDisabled}
                        useTooltipAnimation={this.props.useTooltipAnimation}
                        onValidationIconClick={this.props.onValidationIconClick}
                        onFocus={() => this.handleFocus()}
                        onKeyDown={state => this.handleKeyDown(state)}
                        onChange={state => this.changeInputDate(state)}
                        onBlur={() => this.handleBlur()}
                    />
                    {this.renderCalendar()}
                </div>
            </fieldset>
        );
    }

    renderControlTitle(): JSX.Element | null {
        if (!this.props.controlTitle) {
            return null;
        }

        let cx = this.classes();

        return (
            <label className={cx.controlTitle}>
                {this.props.controlTitle}
            </label>
        );
    }

    renderCalendar(): JSX.Element | null {
        if (!this.state.isOpened) {
            return null;
        }

        return (
            <Calendar
                selectedYear={this.extractYear(this.props.inputValue)}
                selectedMonth={this.extractMonth(this.props.inputValue)}
                selectedDay={this.extractDay(this.props.inputValue)}
                listOfYears={this.props.listOfYears}
                namesOfMonths={this.props.namesOfMonths || UiDatePicker.MONTHS}
                namesOfWeekDays={this.props.namesOfWeekDays || UiDatePicker.WEEK_DAYS}
                minDate={!!this.props.min ? this.parseDateString(this.props.min) : null}
                maxDate={!!this.props.max ? this.parseDateString(this.props.max) : null}
                bemModifications={this.props.bemModifications}
                onChangeDate={dateState => this.selectDate(dateState)}
            />
        );
    }

    protected classes() {
        return {
            root: this.classNames({
                prefix: 'uikit-datepicker',
                modifications: [{
                    'opened': this.state.isOpened,
                    'valid': !this.props.isError && Boolean(this.props.isValid),
                    'error': Boolean(this.props.isError),
                    'disabled': Boolean(this.props.isDisabled),
                    'readonly': Boolean(this.props.isReadonly)
                }],
                additionalClasses: this.props.wrapperClass
            }),
            inputWrapper: this.classNames({ prefix: 'uikit-datepicker__field' }),
            controlTitle: this.classNames({ prefix: 'uikit-datepicker__title' })
        };
    }

    private get dateMask(): string {
        return 'DD.MM.YYYY';
    }

    private extractYear(value: string | null): number | null {
        if (!value) {
            return null;
        }

        const year = value.split('.')[2] || '';
        return (year.length === 4)
            ? toNumber(year)
            : null;
    }

    private extractMonth(value: string | null): number | null {
        if (!value) {
            return null;
        }

        const month = value.split('.')[1] || '';
        return (month.length === 2)
            ? toNumber(month) - 1
            : null;
    }

    private extractDay(value: string | null): number | null {
        if (!value) {
            return null;
        }

        let day = value.split('.')[0] || '';

        if (value.length >= 2) {
            day = value.slice(0, 2);
        }

        return !!day ? toNumber(day) : null;
    }

    private formatInputValue(date?: Date): string {
        return !!date ? DateUtils.formatDate(date, this.dateMask) || '' : '';
    }

    private parseDateString(dateString: string): Date | null {
        return DateUtils.parseDateString(dateString, this.dateMask);
    }

    private isValidDateString(dateString: string): boolean {
        return DateUtils.checkValid(dateString, this.dateMask);
    }

    private showCalendar() {
        if (this.state.isOpened) {
            return;
        }

        this.attachOutsideHandler();
        this.setState({ isOpened: true } as UiDatePickerState, () => {
            if (this.props.onOpenCalendar) {
                this.props.onOpenCalendar();
            }
        });
    }

    private hideCalendar() {
        if (!this.state.isOpened) {
            return;
        }

        this.detachOutsideHandler();
        this.setState({ isOpened: false } as UiDatePickerState, () => {
            if (this.props.onHideCalendar) {
                this.props.onHideCalendar();
            }
        });
    }

    private changeInputDate = (state: UiTextChangeState<UIEvent>): void => {
        const value = this.normalizeDate(state.value);

        if (value !== this.props.inputValue) {
            this.props.onInputDate({
                value: value,
                isValid: this.isValidDateString(value)
            });
        }
    }

    private selectDate = (dateState: CalendarDateState): void => {
        const dateValue = this.formatInputValue(dateState.date);

        this.props.onSelectDate({
            value: dateValue,
            isValid: this.isValidDateString(dateValue)
        });

        if (dateState.changedDateElement === CalendarDateElement.day) {
            this.handleBlur();
        }
    }

    private handleFocus(): void {
        this.isFocused = true;
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    private handleBlur = (): void => {
        if (!this.isOutsideClick) {
            return;
        }

        this.isFocused = false;

        if (!!this.props.onBlur) {
            this.props.onBlur();
        }

        this.hideCalendar();
    }

    private handleKeyDown = (state: UiTextChangeState<React.KeyboardEvent<HTMLDivElement | HTMLInputElement>>): void => {
        if (state.event && state.event.key === 'Tab') {
            this.hideCalendar();
        }
        if (this.props.onKeyDown) {
            this.props.onKeyDown();
        }
    }

    private get window(): Window {
        return this.rootElem
            ? this.rootElem.ownerDocument?.defaultView
                ? this.rootElem.ownerDocument.defaultView
                : window
            : window;
    }

    private attachOutsideHandler(): void {
        this.window.addEventListener('mousedown', this.handleBlur);
    }

    private detachOutsideHandler(): void {
        this.window.removeEventListener('mousedown', this.handleBlur);
    }

    // Кейс 31.02.2015 или совсем левая строка
    private normalizeDate(dateValue: string | null): string {
        const year = this.extractYear(dateValue);
        const month = this.extractMonth(dateValue);
        const day = this.extractDay(dateValue);

        const isYearValid = !!year && (String(year).length === 4);
        const isMonthValid = isNumber(month) && (String(month).length === 2);
        const isDayValid = isNumber(day) && (String(day).length === 2);

        if (isYearValid && isMonthValid && isDayValid) {
            return this.formatInputValue(new Date(year!, month!, day!));
        }

        if (!isNumber(year) && !isNumber(month) && !isNumber(day)) {
            return '';
        }

        return dateValue || '';
    }
}
