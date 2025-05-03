/* eslint-disable */
/* eslint-disable prettier/prettier */
/** @format */

import { Moment } from "moment";

// класс для инкапсуляции cashback
export class Cashback {
    private _startPromoReturnCashback: Moment;

    private _endPromoReturnCashback: Moment;

    private _startPromoTourDate: Moment;

    private _endPromoTourDate: Moment;

    private _currentDate: Moment;

    private _minNight: number;

    private _selectedArrivalCountryId?: number;

    private _percent: number;

    constructor(params: {
        /**начало выплаты кешбека */
        startPromoReturnCashback: Moment;
        /**конец выплаты кешбека */
        endPromoReturnCashback: Moment;
        /**начало тура*/
        startPromoTourDate: Moment;
        /**конец тура*/
        endPromoTourDate: Moment;
        /**текущая дата*/
        currentDate: Moment;
        /**кол-во ночец*/
        minNight: number;
        /** страна где реализован кешбек */
        selectedArrivalCountryId?: number;
        /** возвращаемый процент*/
        percent: number;
    }) {
        this._startPromoReturnCashback = params.startPromoReturnCashback;
        this._endPromoReturnCashback = params.endPromoReturnCashback;
        this._startPromoTourDate = params.startPromoTourDate;
        this._endPromoTourDate = params.endPromoTourDate;
        this._currentDate = params.currentDate;
        this._minNight = params.minNight;
        this._selectedArrivalCountryId = params.selectedArrivalCountryId;
        this._percent = params.percent;
    }

    /** возвращаемый процент
     */
    get percent() {
        return this._percent;
    }

    /**
     *  кол-во ночей
     * включительно */
    get minNight() {
        return this._minNight;
    }

    /**
     *  страна где реализован кешбек
     */
    get selectedArrivalCountryId() {
        return this._selectedArrivalCountryId;
    }

    /**
     *  начало тура
     * включительно */
    get startPromoTourDate() {
        return this._startPromoTourDate;
    }

    /**
     *  конец тура
     * включительно */
    get endPromoTourDate() {
        return this._endPromoTourDate;
    }

    /**
     * начало даты возврата кешбека
     * включительно */
    get startPromoReturnCashback() {
        return this._startPromoReturnCashback;
    }

    /**
     * конец даты возврата кешбека
     * включительно */
    get endPromoReturnCashback() {
        return this._endPromoReturnCashback;
    }

    /**
     * флаг что текущая дата попадает под выплату кешбека
     */
    get isDateAvailableReturnCashback() {
        return (
            this._startPromoReturnCashback <= this._currentDate &&
            this._endPromoReturnCashback >= this._currentDate
        );
    }

    /**
     * проверка, что тур удовлетворяет условиям
     */
    checkTour(params: {
        minNight: number;
        selectedArrivalCountryId?: number;
        dates: { start: Moment; end: Moment }[];
    }) {
        return (
            params.minNight >= this._minNight &&
            this.selectedArrivalCountryId === params.selectedArrivalCountryId &&
            this.isDateAvailableReturnCashback &&
            this.casbackDateIncludes(params.dates)
        );
    }

    /**
     * проверяет что переданные даты удовлетваряют условию участия в кешбеке
     */
    casbackDateIncludes(dates: { start: Moment; end: Moment }[]) {
        return dates.some((d) => {
            return (
                d.start >= this._startPromoTourDate &&
                d.end <= this._endPromoTourDate
            );
        });
    }

    /**
     * проверяет что переданные даты удовлетваряют условию выплаты
     */
    casbackDateIncludesReturnCashback(dates: { start: Moment; end: Moment }[]) {
        return dates.some((d) => {
            return (
                d.start >= this.startPromoReturnCashback &&
                d.end <= this.endPromoReturnCashback
            );
        });
    }
}
