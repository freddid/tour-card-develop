/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import { Component } from 'react';

import { SorryWeDontHaveHotelInfo } from './SorryWeDontHaveHotelInfo';
import { getYandexReviews } from '../services/getYandexReviews';


export interface YandexReviewsStatus {
    needShown: boolean;
}


export interface YandexReviewsProps {
    hotelId: number;
    onLoaded: (status: YandexReviewsStatus) => void;
}

export interface YandexReviewsState {
    sletatHotelId: number;
    url: string | null;
}

export class YandexReviews extends Component<YandexReviewsProps, YandexReviewsState> {

    constructor(props: YandexReviewsProps) {
        super(props);

        this.state = {
            sletatHotelId: props.hotelId,
            url: null,
        } as YandexReviewsState;
    }

    componentDidMount() {
        getYandexReviews(this.state.sletatHotelId)
            .then((resp) => {
                this.setState({
                    url: resp?.url ?? null
                });
                this.props.onLoaded({ needShown: resp?.url != null });
            }).catch(() => this.props.onLoaded({ needShown: false }));
    }

    render() {
        const url = this.state.url;

        if (url == null) {
            return (
                <div style={{clear: 'both'}}>
                    <SorryWeDontHaveHotelInfo />
                </div>
            );
        }

        return (
            <>
                <div style={{width:'100%', maxWidth:'760px', height: '800px', overflow: 'hidden', position: 'relative'}}>
                    <iframe style={{width: '100%', height: '100%', border: '1px solid #e6e6e6', borderRadius: '8px;box-sizing:border-box'}} 
                        src={url}></iframe>
                </div>
            </>
        );
    }


}
