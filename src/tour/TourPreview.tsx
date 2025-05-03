/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from "react";
import { isEqual } from "lodash";
import * as classNames from "classnames";

import { currency } from "sletat-api-services/lib/types";
import { PriceBlock } from "sletat-ui-components/lib/Price/PriceBlock";
import { Price } from "sletat-ui-components/lib/Price/Price";
import { Target } from '../types-and-consts';

import { HotelImagePreview } from "./HotelImagePreview";
import { ActualizationProgress } from "./ActualizationProgress";
import { logMetric } from "../utils";
import { LabelCashback } from "../components/LabelCashback";
import { CasbackInfo } from "../components/CashbackInfo";
import S from "../stores";
import { Moment } from "moment";
import { OilTaxesInPrice } from './OilTaxesInPrice';

export interface TourPreviewProps {
    hotelId: number | null;
    numHotelPhotos: number | null;
    currency: currency | null;
    numAdults: number | null;
    numKids: number | null;
    useOrder: boolean;
    useFakeDiscount: boolean;
    fakeDiscount: number;
    usePersonPrice: boolean;
    isActualizationProcess: boolean;
    isActualizationSuccess: boolean;
    isHotelLoadedSuccess: boolean;
    numNights: number;
    selectedArrivalCountryId: number;
    tourDepartDate: Moment;

    /**
     * Цена тура
     */
    tourPrice: number | null;

    /**
     * Цена тура с учетом наценки по переданной схеме
     * */
    onlinePaymentPrice?: number;

    /**
     * Активна ли оплата-онлайн или нет
     */
    onlinePaymentIsActive: boolean;

    /**
     * Включены ли билеты в тур или нет
     */
    tourIncludesTickets: boolean;

    /**
     * Id модуля
     */
    target: Target;

    /**
     * Обработчик для изображения отеля
     */
    imagePreviewHandler: (ev: React.SyntheticEvent<any>, target: Target) => void;

    /**
     * Обработчик для кнопки заявки
     */
    buttonOrderHandler: (ev: React.SyntheticEvent<any>, target: Target) => void;

    /**
     * Обработчик для кнопки покупки
     */
    buttonBuyHandler: (ev: React.SyntheticEvent<any>, target: Target) => void;
}

export class TourPreview extends React.Component<TourPreviewProps, {}> {
    
    shouldComponentUpdate(nextProps: TourPreviewProps) {
        return !isEqual(this.props, nextProps);
    }

    render() {
        const cx = this.classes();

        const btnOrder = () => {
            if (!this.props.useOrder) {
                return null;
            }

            return (
                <a
                    className={cx.btnOrder}
                    onClick={(e: React.SyntheticEvent<HTMLAnchorElement>) => {
                        logMetric("click-order");
                        this.props.buttonOrderHandler(e, this.props.target);
                    }}
                >
                    Оставить заявку
                </a>
            );
        };

        const btnBuyOnline = () => {
            if (!this.props.onlinePaymentIsActive) {
                return null;
            }

            return (
                <a
                    className={cx.btnBuy}
                    onClick={(e: React.SyntheticEvent<HTMLAnchorElement>) => {
                        logMetric("click-buyonline");
                        this.props.buttonBuyHandler(e, this.props.target);
                    }}
                >
                    Купить онлайн
                </a>
            );
        };
        const isCashback = S.cashback.checkTour({
            minNight: this.props.numNights,
            selectedArrivalCountryId:
                this.props.selectedArrivalCountryId,
                dates:[{
                    start:this.props.tourDepartDate,
                    end:this.props.tourDepartDate,
                }]
        });
        return (
            <div className={cx.price}>
                {isCashback &&  <LabelCashback cashback={S.cashback} />}
                <div className={cx.priceWrapper}>
                    <HotelImagePreview
                        hotelId={this.props.hotelId}
                        isHotelLoadedSuccess={this.props.isHotelLoadedSuccess}
                        imagesCount={this.props.numHotelPhotos}
                        onClick={(ev: React.SyntheticEvent<any>) =>
                            this.props.imagePreviewHandler(ev, this.props.target)
                        }
                    />
                    <PriceBlock
                        price={this.props.tourPrice || -1}
                        currency={(this.props.currency || "RUB") as any} // TODO: убрать any
                        adults={this.props.numAdults || 0}
                        kids={this.props.numKids || 0}
                        useFakeDiscount={this.props.useFakeDiscount}
                        fakeDiscount={this.props.fakeDiscount}
                        usePricePerson={this.props.usePersonPrice}
                        isOnlyHotel={!this.props.tourIncludesTickets}
                    />
                    <OilTaxesInPrice
                        shouldBeShown={
                            this.props.isActualizationSuccess && this.props.tourIncludesTickets
                        }
                    />
                    <ActualizationProgress
                        isActualizationSuccess={
                            this.props.isActualizationSuccess
                        }
                        isActualizationProcess={
                            this.props.isActualizationProcess
                        }
                    />
                    {isCashback &&  <CasbackInfo />}
                    <div className={cx.btnGroupPrice}>
                        {btnBuyOnline()}
                        {btnOrder()}
                        {this.renderModifiedPrice()}
                    </div>
                </div>
            </div>
        );
    }

    private renderModifiedPrice(): JSX.Element | null {
        if (!this.props.onlinePaymentPrice) {
            return null;
        }
        const cx = this.classes();

        return (
            <p className={cx.onlinePaymentPrice}>
                Цена тура при покупке онлайн
                <br />
                <span className={cx.onlinePaymentPriceWrap}>
                    {/* TODO: убрать any */}
                    <Price
                        price={this.props.onlinePaymentPrice}
                        currency={(this.props.currency || "RUB") as any}
                    />
                </span>
            </p>
        );
    }

    private classes() {
        return {
            price: classNames({
                "card__tour-price": true,
            }),
            onlinePaymentPrice: classNames({
                "tour-price-block__main": true,
            }),
            onlinePaymentPriceWrap: classNames({
                "tour-price-block__detail-price": true,
            }),
            priceWrapper: classNames({
                "card__tour-price-wrapper": true,
            }),
            btnGroupPrice: classNames({
                "button-group-tour-price": true,
            }),
            btnOrder: classNames({
                "uis-button": true,
                "uis-button_light": true,
                "uis-button_middle": true,
                "button-anchor-buy": true,
            }),
            btnBuy: classNames({
                "uis-button": true,
                "uis-button_orange": true,
                "uis-button_middle": true,
                "button-anchor-order": true,
            }),
        };
    }
}
