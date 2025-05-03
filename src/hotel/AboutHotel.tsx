/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as classNames from 'classnames';
import { getBeachLineName } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfoResponse';
import { IFacilityGroup, IWeather } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfoResponse';

import { SorryWeDontHaveHotelInfo } from './SorryWeDontHaveHotelInfo';
import { WeatherInfo } from './WeatherInfo';
import { PhotoGallery } from './PhotoGallery';


export interface AboutHotelProps {
    hotelId: number | null;
    hotelFacilities: Array<IFacilityGroup>;
    numHotelRooms: number | null;
    hotelAirportDistance: number | null;
    numImages: number | null;
    hotelDescription: string | null;
    currentWeather: Array<IWeather>;
    punyCode: string;
}

export function AboutHotel(props: AboutHotelProps) {
    if (couldWeShowAnyInfo(props)) {
        return (<About {...props} />);
    } else {
        return (<SorryWeDontHaveHotelInfo />);
    }
}

function couldWeShowAnyInfo(props: AboutHotelProps): boolean {
    const { hotelFacilities, numHotelRooms, hotelAirportDistance, numImages, hotelDescription } = props;
    const hasID = !!props.hotelId;
    const hasInfo = ((hotelFacilities && hotelFacilities.length) || numHotelRooms || hotelAirportDistance ||
        numImages || hotelDescription);
    return hasID && !!hasInfo;
}

function About(props: AboutHotelProps) {
    const cx = classes();

    return (
        <div>
            <div className={cx.hotelShortDesc}>
                <div className={cx.subtitle}>Основная информация</div>
                <div className={cx.parametersViewBlock}>
                    {renderBeachLine()}
                    {renderHotelRoomsCount()}
                    {renderHotelAirportDistance()}
                </div>
            </div>
            <div id="tour-preview-slider" className={cx.gallery}>
                <div className={cx.wrapperGalleryWeather}>
                    {renderPhotoGallery()}
                    <WeatherInfo days={props.currentWeather.slice(0, 3)}/>
                </div>
            </div>
            <div className={cx.hotelLongDesc}>
                {renderHotelDescription()}
            </div>
        </div>
    );

    function renderBeachLine() {
        if (!getBeachLineName(props.hotelFacilities)) {
            return null;
        }

        return (
            <AboutItem
                title="Пляжная линия:"
                content={getBeachLineName(props.hotelFacilities)}
            />
        );
    }

    function renderHotelRoomsCount() {
        if (!props.numHotelRooms) {
            return null;
        }

        return (
            <AboutItem
                title="Количество номеров:"
                content={`${props.numHotelRooms} шт.`}
            />
        );
    }

    function renderHotelAirportDistance() {
        if (!props.hotelAirportDistance) {
            return null;
        }

        return (
            <AboutItem
                title="Расстояние до аэропорта:"
                content={`${props.hotelAirportDistance} км`}
            />
        );
    }

    function renderPhotoGallery() {
        if (!props.numImages || typeof props.hotelId !== 'number') {
            return null;
        }

        return (
            <PhotoGallery
                numImages={props.numImages}
                hotelId={props.hotelId}
                punyCode={props.punyCode}
            />
        );
    }

    function renderHotelDescription() {
        if (!props.hotelDescription) {
            return null;
        }
        return [
            <div key={'hotel-desc-title'} className={cx.subtitle}>Описание</div>,
            <div key={'hotel-desc-body'} dangerouslySetInnerHTML={{ __html: props.hotelDescription }} />
        ];
    }

    function classes() {
        return {
            hotelShortDesc: classNames({
                'card-hotel__description-short': true
            }),
            hotelLongDesc: classNames({
                'card-hotel__description-long': true
            }),
            subtitle: classNames({
                'subtitle': true
            }),
            parametersViewBlock: classNames({
                'tour-parameters': true,
                'tour-parameters_view-block': true
            }),
            gallery: classNames({
                'card-hotel__gallery': true
            }),
            wrapperGalleryWeather: classNames({
                'card-hotel__wrapper-gallery-weather': true
            })
        };
    }
}

interface AboutItemProps {
    title: string;
    content: string;
}

function AboutItem(props: AboutItemProps) {
    const cx = classes();

    return (
        <dl className={cx.parametersItem}>
            <dt className={cx.parametersName}>
                {props.title}
            </dt>
            <dd className={cx.parametersValue}>
                {props.content}
            </dd>
        </dl>
    );

    function classes() {
        return {
            parametersItem: classNames({
                'tour-parameters__item': true
            }),
            parametersName: classNames({
                'tour-parameters__name': true
            }),
            parametersValue: classNames({
                'tour-parameters__value': true
            })
        };
    }
}
