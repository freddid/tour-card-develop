/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as classNames from 'classnames';
import{ isUndefined } from 'lodash';

import { ShareLinks } from './ShareLinks';
import { TourComparisonData, TourComparisonButton } from './ComparisonButton';
import { CardPolyfill } from './CardPolyfill';
import { logMetric } from './utils';
import { SVGIcon } from './svg-icon';


export interface BaseOptionButtonProps {
    isVisible?: boolean;
}

export interface BaseOptionButtonState {}

export abstract class BaseOptionButton<P extends BaseOptionButtonProps, S extends BaseOptionButtonState> extends React.Component<P, S> {

    private get isVisible() {
        return isUndefined(this.props.isVisible) || this.props.isVisible;
    }

    render() {
        const cx = this.classes();

        if (this.isVisible) {
            return (
                <li className={cx.tourControlItem}>
                    {this.renderOptionContent()}
                </li>
            );
        }

        return null;
    }

    protected abstract renderOptionContent(): (JSX.Element | Array<JSX.Element>);

    protected classes() {
        return {
            tourControlItem: classNames({
                'tour-control__item': true
            })
        };
    }
}


export class SendEmailOption extends BaseOptionButton<BaseOptionButtonProps, BaseOptionButtonState> {


    renderOptionContent() {
        const cx = this.classes();

        return (
            <button className={cx.buttonStyleClear}>
                <i className={cx.tourControlIcon}>
                    <SVGIcon width={'20'} height={'20'} url="#icon-send-to-email"/>
                </i>
                <span className={cx.tourControlText}>Отправить на e-mail</span>
            </button>
        );
    }

    protected classes() {
        return {
            tourControlItem: classNames({
                'tour-control__item': true
            }),
            buttonStyleClear: classNames({
                'button-style-clear': true
            }),
            tourControlIcon: classNames({
                'tour-control__icon': true
            }),
            tourControlText: classNames({
                'tour-control__text': true
            }),
        };
    }
}


export class SendToPrintOption extends BaseOptionButton<BaseOptionButtonProps, BaseOptionButtonState> {

    renderOptionContent() {
        const cx = this.classes();

        return (
            <button className={cx.buttonStyleClear}>
                <i className={cx.tourControlIcon}>
                    <SVGIcon width={'20'} height={'20'} url="#icon-send-to-print"/>
                </i>
                <span className={cx.tourControlText}>Распечатать</span>
            </button>
        );
    }

    protected classes() {
        return {
            tourControlItem: classNames({
                'tour-control__item': true
            }),
            buttonStyleClear: classNames({
                'button-style-clear': true
            }),
            tourControlIcon: classNames({
                'tour-control__icon': true
            }),
            tourControlText: classNames({
                'tour-control__text': true
            }),
        };
    }
}


export interface SocialSharingOptionProps extends BaseOptionButtonProps {
    tourCountryName: string;
    tourCityName: string;
    tourDepartDate: string;
    tourArrivalDate: string;
    tourPrice: number;
    tourCurrency: string;
    tourNameOfSPO: string;
}

export interface SocialSharingOptionState extends BaseOptionButtonState {
    isEnabled: boolean;
}

export class SocialSharingOption extends BaseOptionButton<SocialSharingOptionProps, SocialSharingOptionState> {

    constructor(props: SocialSharingOptionProps) {
        super(props);
        this.state = {
            isEnabled: false
        } as SocialSharingOptionState;
    }

    renderOptionContent() {
        const cx = this.classes();

        return [
            <button
                key="share-button-key"
                className={cx.shareButtonStyleClear}
                onClick={() => this.setState({ isEnabled: true })}
            >
                <span className={cx.tourControlIcon}>
                    <SVGIcon width={'20'} height={'20'} url="#icon-share"/>
                </span>
                <span className={cx.tourControlText} onClick={() => logMetric('click-share')}>
                    Поделиться в сети
                </span>
            </button>,
            <div
                key="share-links-wrapper-key"
                className={cx.shareLinksWrapper}
            >
                <ShareLinks
                    tourCountryName={this.props.tourCountryName}
                    tourCityName={this.props.tourCityName}
                    dateStart={this.props.tourDepartDate}
                    dateEnd={this.props.tourArrivalDate}
                    tourPrice={this.props.tourPrice}
                    currency={this.props.tourCurrency}
                    nameOfSPO={this.props.tourNameOfSPO}
                />
            </div>
        ];
    }

    protected classes() {
        return {
            tourControlItem: classNames({
                'tour-control__item': true
            }),
            shareButtonStyleClear: classNames({
                'button-style-clear': true,
                'hidden': this.state.isEnabled
            }),
            shareLinksWrapper: classNames({
                'share-links-wrapper': true,
                'hidden': !this.state.isEnabled
            }),
            tourControlIcon: classNames({
                'tour-control__icon': true
            }),
            tourControlText: classNames({
                'tour-control__text': true
            })
        };
    }
}


export interface ToursComparisionOptionProps extends BaseOptionButtonProps {
    card: CardPolyfill;
    tourComparisonData: TourComparisonData;
}

export class ToursComparisionOption extends BaseOptionButton<ToursComparisionOptionProps, BaseOptionButtonState> {
    renderOptionContent() {
        return (
            <TourComparisonButton
                card={this.props.card}
                tourComparisonData={this.props.tourComparisonData}
            />
        );
    }
}

