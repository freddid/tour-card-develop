/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Component } from 'react';
import * as classNames from 'classnames';

import { getShortURL, URLShortenerRequest } from 'sletat-api-services/lib/URLShortener/URLShortener';
import { numberFormat } from 'sletat-common-utils/lib/format/number';
import { Protocols } from 'sletat-api-services/lib/http/HttpClient';

import { verboseFormatDate, getCurrencyOriginByAlias } from '../utils';
import { VkShareLink } from './SocialButtons/VkShareLink';
import { OkShareLink } from './SocialButtons/OkShareLink';
// import { TwitterShareLink } from './SocialButtons/TwitterShareLink';
import { WhatsAppShareLink } from './SocialButtons/WhatsAppShareLink';
import { FullShareLink } from './SocialButtons/FullShareLink';

import './index.css';


export interface ShareLinksProps {
    tourCityName: string;
    tourCountryName: string;
    dateStart: string;
    dateEnd: string;
    tourPrice: number;
    currency: string;
    nameOfSPO: string;
    className?: string;
    styles?: any;
}

export interface ShareLinksState {
    cardShortShareUrl: string;
}

export class ShareLinks extends Component<ShareLinksProps, ShareLinksState> {

    private PARENT_IFRAME_ID = 'sletat-tour-card-iframe';

    constructor(props: ShareLinksProps) {
        super(props);
        this.state = {
            cardShortShareUrl: ''
        };
    }

    componentDidMount() {
        this.loadCardShortShareUrl();
    }

    render() {
        const cx = this.classes();

        return (
            <ul className={cx.root} style={this.props.styles} >
                <VkShareLink
                    tourCardShortUrl={this.state.cardShortShareUrl}
                    shareTitle={this.getShareTitle()}
                    shareDescription={this.getShareDescription()}
                />
                {/* <TwitterShareLink
                    tourCardShortUrl={this.state.cardShortShareUrl}
                    shareTitle={this.getShareTitle()}
                    parentIframeId={this.PARENT_IFRAME_ID}
                /> */}
                <OkShareLink
                    tourCardShortUrl={this.state.cardShortShareUrl}
                    parentIframeId={this.PARENT_IFRAME_ID}
                />
                <WhatsAppShareLink
                    tourCardShortUrl={this.state.cardShortShareUrl}
                />
                <FullShareLink
                    tourCardShortUrl={this.state.cardShortShareUrl}
                />
            </ul>
        );
    }

    private async  getClickSharelink(url:string) {
        const result=await fetch(`https://clck.ru/--?json=true&url=${encodeURIComponent(url)}`);
        const json=await result.json();
        return json[0];
    }

    private loadCardShortShareUrl(): void {
        const params = {
            op: 'encode',
            url: window.location.href
        } as URLShortenerRequest;

        this.getClickSharelink(window.location.href)
            .then((shortLink) => {
                if (shortLink) {
                    this.setState({
                        cardShortShareUrl: shortLink.replace('http:', 'https:')
                    })
                }
        })
    }

    private getShareTitle(): string {
        try {
            let city = this.props.tourCityName,
                country = this.props.tourCountryName,
                dateStart = !!this.props.dateStart ? verboseFormatDate(this.props.dateStart) : '',
                dateEnd = !!this.props.dateEnd ? verboseFormatDate(this.props.dateEnd) : '',
                price = numberFormat(this.props.tourPrice),
                origCurrency = getCurrencyOriginByAlias(this.props.currency);
            return `${city} \u2014 ${country}, ${dateStart} \u2014 ${dateEnd}, ${price}${origCurrency}.`;
        } catch (err) {
            console.error(err);
        }

        return '';
    }

    private getShareDescription() {
        return this.props.nameOfSPO;
    }

    private classes() {
        return {
            root: classNames({
                'share-links': !this.props.className,
                [this.props.className as string]: !!this.props.className
            })
        };
    }
}
