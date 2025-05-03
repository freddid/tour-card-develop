/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as classNames from 'classnames';

import { HotelInStop } from 'sletat-api-services/lib/Tour';
import { TourService } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/TourServices';
import {
    FlightsStatus,
    FlightsData
} from 'sletat-api-services/lib/module/flights/models';
import { declineByCount } from 'sletat-common-utils/lib/format';
import { UiLoader } from 'sletat-uikit2/dist/js/UiLoader';

import { TicketsAvailabilityInfo } from './tickets-availability-info/TicketsAvailabilityInfo';
import { HotelTitle } from '../hotel/HotelTitle';
import { TrainInfo } from '../components/TrainInfo';
import S from '../stores';
import { Flights } from './Flights';
import { RoomInfoFull } from '../components/RoomInfoFull';
import { AdaptiveInitializer } from './AdaptiveInitializer';
import { Target } from '../types-and-consts';
import { IconQuestion } from '../icons/IconQuestion';

import c from './index.module.scss';

export interface MainTourInfoProps extends React.HTMLProps<HTMLDivElement> {
    target: Target;
    hotelId: number | null;
    countryName: string | null;
    cityName: string | null;
    resortName: string | null;
    departDate: string | null;
    arrivalDate: string | null;
    numNights: number;
    hotelName: string | null;
    hotelRating: number | null;
    hotelCategory: string | null;
    nameOfSPO: string | null;
    numAdults: number;
    numKids: number;
    hotelRoomType: string | null;
    hotelRoomId: number | null;
    hotelAccommodationDescription: string | null;
    hotelMealDescription: string | null;
    hotelMealName: string | null;
    isActualizationProcess: boolean;
    isDetailActualizationSuccess: boolean;
    areNoPlacesInHotel: boolean;
    placesInHotelExtendedInfo: HotelInStop | null;
    flightsData: FlightsData;
    flightsStatus: FlightsStatus;
    areIncludedFlightTickets: boolean;
    areTicketsToInStock: boolean;
    areTicketsToOutOfStock: boolean;
    areTicketsBackInStock: boolean;
    areTicketsBackOutOfStock: boolean;
    tourIncludes: Array<TourService>;
    tourNotIncludes: Array<TourService>;
    sletatTourId?: number | null;
    isCombinedTour: boolean;
}

interface MainTourInfoState {
    isOpenRoomInfoFull: boolean;
    isCheckRoom: boolean;
}

function getMonth(num: number): string {
    return [
        'хренабря',
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ][num];
}

function formatDate(dateString: string | null): string | null {
    if (!dateString) {
        return null;
    }
    const parts = dateString.split('.');
    return `${parseInt(parts[0], 10)} ${getMonth(parseInt(parts[1], 10))}`;
}

function formatIncludedServices(services: Array<TourService>): string {
    if (!services.length) return 'Нет подробной информации'
    return services.map((resource: TourService) => resource.name).join(', ');
}

const trainInfoId = 22;

export class MainTourInfo extends React.Component<MainTourInfoProps, MainTourInfoState> {

    constructor(props: MainTourInfoProps) {
        super(props);
        this.state = {
            isOpenRoomInfoFull: false,
            isCheckRoom: false
        }
      }

    render() {
        const props = this.props;
        const hasIncludes = props.tourIncludes.length !== 0;
        const hasNotIncludes = props.tourNotIncludes.length !== 0;
        const cx = this.classes();

        const renderNonIncludedResources = () => {
            if(!hasNotIncludes) return null

            return (
                <dl className={cx.paramsItem}>
                    <dt className={cx.paramsName}>Не включено:</dt>
                    <ListOfTourServices
                        isActualizationProcess={this.props.isActualizationProcess}
                        isDetailActualizationSuccess={this.props.isDetailActualizationSuccess}
                    >
                        {this.formatNotIncludedInTourResources()}
                        <div className={c.excludeServiceIcon}>
                        <IconQuestion />
                        </div>
                    </ListOfTourServices>
                </dl>
            );
        };

        const isAvailableRoomInfo = !!(props.hotelId && props.hotelRoomId);
        
        return (
            <div className={cx.root}>
                <AdaptiveInitializer />
                {
                /* TODO: из-за того, что TourPreview это float, едет верстка при кейсе, 
                    когда там рендерется две кнопки. Ломается блок с перелётами. Надо переделать на flex.
                    Пока что поставил 450px height */
                }
                <div className={c.mainInfoWrapper}>
                    <p>
                        <span className={cx.fullInfoId}>Тур #{props.sletatTourId}{' '}</span>
                        <span className={cx.fullInfoText}>{props.nameOfSPO}</span>
                    </p>
                    <h1 className={cx.title}>
                        {props.cityName}&nbsp; &mdash; &nbsp;
                        <span className={cx.titleDirection}>{props.countryName}, {props.resortName}</span>
                    </h1>
                    <TicketsAvailabilityInfo
                        isActualizationProcess={props.isActualizationProcess}
                        isDetailActualizationSuccess={props.isDetailActualizationSuccess}
                        areNoPlacesInHotel={props.areNoPlacesInHotel}
                        placesInHotelExtendedInfo={props.placesInHotelExtendedInfo}
                        areIncludedFlightTickets={props.areIncludedFlightTickets}
                        areTicketsToInStock={props.areTicketsToInStock}
                        areTicketsToOutOfStock={props.areTicketsToOutOfStock}
                        areTicketsBackInStock={props.areTicketsBackInStock}
                        areTicketsBackOutOfStock={props.areTicketsBackOutOfStock}
                    />
                    <div className={cx.params}>
                        <dl className={cx.paramsItem}>
                            <dt className={cx.paramsName}>Дата:</dt>
                            <dd className={cx.paramsValue}>
                                {formatDate(props.departDate)} — {formatDate(props.arrivalDate)}{' '}
                                ({props.numNights} {declineByCount(['ночь', 'ночи', 'ночей'], props.numNights)})
                            </dd>
                        </dl>
                        <dl className={cx.paramsItem}>
                            <dt className={cx.paramsName}>Отель:</dt>
                            <dd className={cx.paramsValue}>
                                <HotelTitle
                                    hotelRate={props.hotelRating}
                                    name={props.hotelName}
                                    category={props.hotelCategory}
                                />
                            </dd>
                        </dl>
                        {this.props.isCombinedTour && (
                            <dl className={cx.paramsItem}>
                                <dt className={`${cx.paramsName} ${cx.isCombined}`}>Комбинированный тур:</dt>
                                <dd className={cx.paramsValue}>Проживание в двух и более отелях. Отели могут быть в одном или разных регионах. Трансфер предоставляется туроператором.</dd>
                            </dl>
                        )}
                        <dl className={cx.paramsItem}>
                            <dt className={cx.paramsName}>Туристы:</dt>
                            <dd className={cx.paramsValue}>
                                {`${props.numAdults} ${props.numAdults > 1 ? 'взрослых' : 'взрослый'}`}
                                {!!props.numKids && ` и ${props.numKids} ${props.numKids > 1 ? 'ребенка' : 'ребенок'}`}
                            </dd>
                            {/* искать это в существующем коде модуля и искать в ts-сервисах */}
                        </dl>
                        <dl className={cx.paramsItem}>
                            <dt className={cx.paramsName}>Номер:</dt>
                            <dd onClick={(event)=>{
                                if(event.currentTarget === event.target && this.state.isCheckRoom) {
                                    this.setState({ isOpenRoomInfoFull: true });
                                }
                            }} 
                            className={classNames(cx.paramsValue, {[cx.paramsLink]:isAvailableRoomInfo && this.state.isCheckRoom} )}>
                                {props.hotelRoomType}
                            </dd>
                            {isAvailableRoomInfo && (
                                    <RoomInfoFull
                                        onCheckRoom={(status)=>{
                                            this.setState({
                                                isCheckRoom: status
                                            })
                                        }}
                                        onClose={() => this.setState({
                                                    isOpenRoomInfoFull: false,
                                                })}
                                        isOpen={this.state.isOpenRoomInfoFull}
                                        hotelId={props.hotelId as number}
                                        hotelRoomId={props.hotelRoomId as number}
                                    />
                                )}
                        </dl>
                        <dl className={cx.paramsItem}>
                            <dt className={cx.paramsName}>Размещение:</dt>
                            <dd className={cx.paramsValue}>
                                {`${props.hotelAccommodationDescription} (${props.hotelAccommodationDescription})`}
                            </dd>
                        </dl>
                        <dl className={cx.paramsItem}>
                            <dt className={cx.paramsName}>Питание:</dt>
                            <dd className={cx.paramsValue}>
                                {`${props.hotelMealDescription} (${props.hotelMealName})`}
                            </dd>
                        </dl>
                    </div>
                    <div className={cx.subtitle}>Что входит в стоимость?</div>
                    <div className={cx.params}>
                        <dl className={cx.paramsItem}>
                            <dt className={cx.paramsName}>Включено:</dt>
                            <ListOfTourServices
                                isActualizationProcess={props.isActualizationProcess}
                                isDetailActualizationSuccess={props.isDetailActualizationSuccess}
                                showFailureUpdateDataMessage={!props.isDetailActualizationSuccess || (!hasIncludes && !hasNotIncludes)}
                            >
                                {formatIncludedServices(props.tourIncludes)}
                            </ListOfTourServices>
                            {S.buyOnlineStore.isMgtModule &&
                            props.tourIncludes.some(item => item.type === trainInfoId) &&
                            <TrainInfo/>}
                        </dl>
                        {renderNonIncludedResources()}
                    </div>
                </div>
                {props.areIncludedFlightTickets && <Flights target={this.props.target} />}
            </div>
        );
  }

    protected classes() {
        return {
            root: classNames({
                'card__tour-description': true
            }),
            fullInfo: classNames({
                'tour-full-information': true
            }),
            fullInfoId: classNames({
                'tour-full-information__id': true
            }),
            fullInfoText: classNames({
                'tour-full-information__text': true
            }),
            title: classNames({
                'tour-title': true
            }),
            titleDirection: classNames({
                'tour-title__direction': true
            }),
            params: classNames({
                'tour-parameters': true
            }),
            paramsLink: classNames({
                'tour-parameters__link': true
            }),
            paramsItem: classNames({
                'tour-parameters__item': true
            }),
            paramsName: classNames({
                'tour-parameters__name': true
            }),
            paramsValue: classNames({
                'tour-parameters__value': true
            }),
            subtitle: classNames({
                'subtitle': true
            }),
            paramsFlight: classNames({
                'tour-parameters-flight': true
            }),
            isCombined: classNames({
                'tour-parameters-combined': true
            }),
        };
    }

    private formatNotIncludedInTourResources(): string {
        return this.props.tourNotIncludes.map(service => service.name).join(', ');
    }
}

interface ListOfTourServicesProps extends React.HTMLProps<HTMLDivElement> {
    isActualizationProcess: boolean;
    isDetailActualizationSuccess: boolean;
    showFailureUpdateDataMessage?: boolean;
}

function ListOfTourServices(props: ListOfTourServicesProps) {
    const cx = classes();

    if (props.isDetailActualizationSuccess) {
        return (
            <dd className={cx.paramsValue}>{props.children}</dd>
        );
    } else if (props.isActualizationProcess) {
        return (
            <div className={cx.loader}> 
                <UiLoader bemModifications={['micro', 'gray']}/>
            </div>
        );
    } else {
        if (props.showFailureUpdateDataMessage) {
            return (
                <dd className={cx.paramsValue}>не удалось получить информацию от туроператора по составу тура</dd>
            );
        }

        return (
            <dd className={cx.paramsValue}>{props.children}</dd>
        );
    }

    function classes() {
        return {
            paramsValue: classNames({
                'tour-parameters__value': true
            }),
            loader: classNames({
                'tour-parameters__loader': true
            })
        };
    }
}
