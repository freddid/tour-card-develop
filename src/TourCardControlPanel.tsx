/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Component, EventHandler } from 'react';
import * as classNames from 'classnames';
import { SVGIcon } from './svg-icon';


export interface ControlPanelProps {
    onClose: EventHandler<any>;
    tourCardOptions?: Array<JSX.Element>;
}

export class TourCardControlPanel extends Component<ControlPanelProps, {}> {

    render() {
        const cx = this.classes();

        const cardOptions = () => {
            if (!!this.props.tourCardOptions && !!this.props.tourCardOptions.length) {
                return (
                    <div className={cx.cardOptions}>
                        <ul className={cx.tourControl}>
                            {this.props.tourCardOptions}
                        </ul>
                    </div>
                );
            }

            return null;
        };

        const cardControlButtons = () => {
            return (
                <div className={cx.cardClose}>
                    <ul className={cx.tourControl}>
                        <li className={cx.tourControlItem}>
                            <button className={cx.buttonStyleClear} onClick={this.props.onClose}>
                                <span className={cx.tourTextClose}>Закрыть</span>
                                <span className={cx.tourControlIcon}>
                                    <SVGIcon width={'20'} height={'20'} url="#icon-close"/>
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            );
        };

        return (
            <div className={cx.cardControls}>
                {cardOptions()}
                {cardControlButtons()}
            </div>
        );
    }

    private classes() {
        return {
            cardControls: classNames({
                'card__controls': true
            }),
            cardOptions: classNames({
                'card__events': true
            }),
            tourControl: classNames({
                'tour-control': true
            }),
            cardClose: classNames({
                'card__close': true
            }),
            tourControlItem: classNames({
                'tour-control__item': true
            }),
            buttonStyleClear: classNames({
                'button-style-clear': true
            }),
            tourTextClose: classNames({
                'tour-control__text': true,
                'tour-control__text_close': true
            }),
            tourControlIcon: classNames({
                'tour-control__icon': true
            })
        };
    }
}
