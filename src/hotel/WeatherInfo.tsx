/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';
import { IWeather } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfoResponse';


export interface WeatherInfoProps {
    days: Array<IWeather>;
}

export function WeatherInfo(props: WeatherInfoProps) {
    const cx = classes();
    const getWeatherPng = (weatherCode: number) => `https://hotels.sletat.ru/images/weather/${weatherCode}.png`;

    return (
        <div className={cx.root}>
            {props.days.map((data: IWeather, index: number) => {
                return (
                    <div className={cx.item} key={index}>
                        <span className={cx.day}>
                            {getDateName(index)}
                        </span>
                        {data.weatherCode ?
                            <img className={cx.icon} src={getWeatherPng(data.weatherCode)} />
                            : null}
                        {Math.round(data.temp)}&deg;
                    </div>
                );
            })}
        </div>
    );

    function classes() {
        const BASE_CLASS = 'hotel-weather';

        return {
            root: classNames({
                [BASE_CLASS]: true
            }),
            item: classNames({
                [`${BASE_CLASS}__item`]: true
            }),
            day: classNames({
                [`${BASE_CLASS}__day`]: true
            }),
            icon: classNames({
                [`${BASE_CLASS}__icon`]: true
            })
        };
    }
}

function getDateName(index: number): string {
    if (index === 0) {
        return 'сегодня';
    } else if (index === 1) {
        return 'завтра';
    } else {
        return 'послезавтра';
    }
}
