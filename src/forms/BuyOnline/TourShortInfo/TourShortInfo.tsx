/* eslint-disable */
/* eslint-disable prettier/prettier */

import React from 'react';
import bemCn from 'bem-cn';
import { observer } from 'mobx-react';
import { capitalize } from 'lodash';

import { Price } from 'sletat-ui-components/lib/Price/Price';
import { parseDateString } from 'sletat-common-utils/lib/date';
import { declineByCount } from 'sletat-common-utils/lib/format';

import { HotelName } from './HotelName';
import { BuyOnlineTourData } from '../BuyOnline';
import { ActualizationProgress } from '../../../tour/ActualizationProgress';
import { TourActualizationState } from '../../../models/actualization';
import { formatDateVerbal, formatWeekDayShortName } from '../../../utils/date';
import { getTourOperatorLogoUrl } from '../../../utils/url';
import { TOUR_SHORT_INFO_SECTION, TOUR_SHORT_INFO_STICKY_BLOCK } from '../../../stores/buy-online/tour-short-info';

import S from '../../../stores';


export interface TourShortInfoProps {
    areIncludedFlightTickets: boolean;
    tourData: BuyOnlineTourData;
    certificatesDiscount: number;
    tourOperatorId: number;
    tourActualization: TourActualizationState;
}


@observer
export class TourShortInfo extends React.Component<TourShortInfoProps> {

    componentDidMount() {
        S.tourShortInfoStickyStore.attachScrollListener();
        S.tourShortInfoStickyStore.updateStickyBlockPosition();
    }

    componentWillUnmount() {
        S.tourShortInfoStickyStore.detachScrollListener();
    }


    render() {
        const blockName = bemCn('tour-short-info');

        return (
            <section
                id={TOUR_SHORT_INFO_SECTION}
                className={blockName()}
            >
                <div
                    id={TOUR_SHORT_INFO_STICKY_BLOCK}
                    className={blockName('sticky-block')({ [S.tourShortInfoStickyStore.stickyModifier]: true })()}
                >
                    <div className={blockName('basic-info')()}>
                        <h3 className={blockName('tour-price')()}>
                            <Price
                                price={S.mainStore.fullTourPrice}
                                currency={this.props.tourData.priceCurrency as any}
                                strikethrough={!!this.props.certificatesDiscount}
                            />
                        </h3>
                        {!!this.props.certificatesDiscount && (
                            <div className={blockName('discount')()}>
                                <Price
                                    price={-this.props.certificatesDiscount}
                                    currency={this.props.tourData.priceCurrency as any}
                                />
                            </div>
                        )}
                        {!!this.props.certificatesDiscount && (
                            <div className={blockName('final-price')()}>
                                <span className={blockName('price-label')()}>
                                    К оплате:&nbsp;
                                </span>
                                <Price
                                    price={S.mainStore.fullTourPrice - this.props.certificatesDiscount}
                                    currency={this.props.tourData.priceCurrency as any}
                                />
                            </div>
                        )}
                        <ActualizationProgress
                            isActualizationProcess={this.props.tourActualization.isActualizationInProcess}
                            isActualizationSuccess={this.props.tourActualization.isActualizationSuccess}
                        />
                        {this.props.tourActualization.isActualizationSuccess && this.props.areIncludedFlightTickets &&
                            <p className={blockName('paragraph')()}>Топливный сбор включен</p>
                        }
                        {this.renderTourInfo(blockName)}
                    </div>
                    {this.renderHotelInfo(blockName)}
                    {this.renderIncludedServicesInfo(blockName)}
                    {this.renderTourOperatorInfo(blockName)}
                </div>
            </section>
        );
    }

    renderTourInfo(blockName: bemCn.Inner): JSX.Element {
        return S.buyOnlineAdaptiveStore.isViewportDesktop
            ? this.renderTourInfoDesktop(blockName)
            : this.renderTourInfoMobile(blockName);
    }

    renderTourInfoDesktop(blockName: bemCn.Inner): JSX.Element {
        return (
            <>
                {this.renderTourDatesInfo(blockName)}
                {!!this.props.tourData.tourNumNights &&
                <p className={blockName('paragraph')()}>
                    {this.props.tourData.tourNumNights}&nbsp;
                    {declineByCount(['ночь', 'ночи', 'ночей'], this.props.tourData.tourNumNights)}
                </p>
                }
                {this.renderDirectionInfo(blockName)}
                {this.renderTouristsInfo(blockName)}
            </>
        );
    }

    renderTourInfoMobile(blockName: bemCn.Inner): JSX.Element {
        const dates = [
            parseDateString(this.props.tourData.departureDate || '', 'DD.MM.YYYY'),
            parseDateString(this.props.tourData.arrivalDate || '', 'DD.MM.YYYY')
        ]
            .filter(Boolean);

        const renderDate = (date: Date): JSX.Element => {
            return (
                <>
                    <b>
                        {formatDateVerbal(date)}
                    </b>, {formatWeekDayShortName(date)}
                </>
            );
        };

        return (
            <>
                <div className={blockName('paragraph')({ 'tour-info-mobile': true })()}>
                    {dates[0] && renderDate(dates[0]!)}
                    {dates[1] &&
                    <>
                        <br />
                        {renderDate(dates[1]!)}
                        <br />
                    </>
                    }
                    {!!this.props.tourData.tourNumNights &&
                    <>
                        {this.props.tourData.tourNumNights}&nbsp;
                        {declineByCount(['ночь', 'ночи', 'ночей'], this.props.tourData.tourNumNights)}&nbsp;
                    </>
                    }
                    <br />
                    {this.renderDirectionInfo(blockName)}
                    {this.props.tourData.adultsCount}&nbsp;
                    {declineByCount(['взрослый', 'взрослых', 'взрослых'], this.props.tourData.adultsCount)}
                    {!!this.props.tourData.kidsCount &&
                    <>
                        ,&nbsp;{this.props.tourData.kidsCount}&nbsp;
                        {declineByCount(['ребенок', 'детей', 'детей'], this.props.tourData.kidsCount)}
                    </>
                    }
                </div>
            </>
        );
    }

    renderTourDatesInfo(blockName: bemCn.Inner): JSX.Element | null {
        const dates = [
            parseDateString(this.props.tourData.departureDate || '', 'DD.MM.YYYY'),
            parseDateString(this.props.tourData.arrivalDate || '', 'DD.MM.YYYY')
        ].filter(Boolean);

        if (!dates.length) {
            return null;
        }

        return (
            <div className={blockName('tour-dates-info')()}>
                {!!dates[0] &&
                <p className={blockName('paragraph')()}>
                    <b className={blockName('paragraph-bold')()}>
                        {formatDateVerbal(dates[0]!)}
                    </b>, {formatWeekDayShortName(dates[0]!)}
                </p>
                }
                {!!dates[1] &&
                <p className={blockName('paragraph')()}>
                    <b className={blockName('paragraph-bold')()}>
                        {formatDateVerbal(dates[1]!)}
                    </b>, {formatWeekDayShortName(dates[1]!)}
                </p>
                }
            </div>
        );
    }

    renderDirectionInfo(blockName: bemCn.Inner): JSX.Element | null {
        const directions = [
            this.props.tourData.departureCityName,
            this.props.tourData.arrivalCountryName,
            this.props.tourData.resortName
        ].filter(Boolean);

        if (!directions.length) {
            return null;
        }

        return (
            <p
                className={blockName('paragraph')({
                    'direction-info-mobile': !S.buyOnlineAdaptiveStore.isViewportDesktop
                })()}
            >
                {directions[0]}&nbsp;
                {!!directions[1] && <>&mdash;&nbsp;{directions[1]}</>}
                {!!directions[2] && <>,&nbsp;{directions[2]}</>}
            </p>
        );
    }

    renderTouristsInfo(blockName: bemCn.Inner): JSX.Element | null {
        return (
            <p className={blockName('paragraph')({ 'tourists-info': true })()}>
                {this.props.tourData.adultsCount}&nbsp;
                {declineByCount(['взрослый', 'взрослых', 'взрослых'], this.props.tourData.adultsCount)}
                {!!this.props.tourData.kidsCount &&
                <>
                    ,&nbsp;{this.props.tourData.kidsCount}&nbsp;
                    {declineByCount(['ребенок', 'детей', 'детей'], this.props.tourData.kidsCount)}
                </>
                }
            </p>
        );
    }

    renderHotelInfo(blockName: bemCn.Inner): JSX.Element | null {
        if (!S.buyOnlineAdaptiveStore.isViewportDesktop) {
            return null;
        }

        const hotelNameData = [
            this.props.tourData.hotelName,
            this.props.tourData.hotelStarsName
        ].filter(Boolean);

        const hotelLivingData = [
            this.props.tourData.hotelRoomTypeDescription,
            this.props.tourData.hotelMealTypeDescription,
        ]
            .filter(Boolean)
            .map(item => capitalize(item as string))
            .join('. ');

        return (
            <div className={blockName('hotel-info')()}>
                {!!hotelNameData.length &&
                <HotelName
                    hotelName={hotelNameData[0] || ''}
                    hotelStarsName={hotelNameData[1] || ''}
                />
                }
                {!!hotelLivingData &&
                <p className={blockName('hotel-living-info')()}>{hotelLivingData}</p>
                }
            </div>
        );
    }

    renderIncludedServicesInfo(blockName: bemCn.Inner): JSX.Element | null {
        if (!S.buyOnlineAdaptiveStore.isViewportDesktop) {
            return null;
        }

        const services = this.props.tourData.includedServices
            .map(service => service.name)
            .join(', ');

        if (!services) {
            return null;
        }

        return (
            <div className={blockName('services-info')()}>
                В стоимость включено:
                <p className={blockName('paragraph')({ 'services-list': true })()}>
                    {services}
                </p>
            </div>
        );
    }

    renderTourOperatorInfo(blockName: bemCn.Inner): JSX.Element | null {
        if (!S.buyOnlineAdaptiveStore.isViewportDesktop || !this.props.tourData.tourOperatorName) {
            return null;
        }

        return (
            <div className={blockName('tour-operator-info')()}>
                <div className={blockName('tour-operator-name')()}>
                    Туроператор<br />{this.props.tourData.tourOperatorName}
                </div>
                {S.mainStore.isTourOperatorLogoInBuyOnlineFormVisible &&
                <div className={blockName('tour-operator-logo')()}>
                    <img
                        className={blockName('tour-operator-logo-img')()}
                        src={getTourOperatorLogoUrl(this.props.tourOperatorId)}
                        alt={this.props.tourData.tourOperatorName}
                    />
                </div>
                }
            </div>
        );
    }
}
