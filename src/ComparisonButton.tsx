/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { isEqual } from 'lodash';
import * as classNames from 'classnames';
import { CardPolyfill } from './CardPolyfill';
import { waitElement, logMetric } from './utils';
import { SVGIcon } from './svg-icon';


export enum Mode {
    add,
    remove
}

export interface TourComparisonData {
    requestId: number;
    sourceId: number;
    offerId: number;
    tourId: number;
}

export interface TourComparisonProps {
    card: CardPolyfill;
    tourComparisonData: TourComparisonData;
    mode?: Mode;
}

export  interface TourComparisonState {
    mode: Mode;
}

export class TourComparisonButton extends React.Component<TourComparisonProps, TourComparisonState> {

    constructor(props: TourComparisonProps) {
        super(props);
        this.state = {
            mode: props.mode || Mode.add
        };
    }

    componentDidMount() {
        this.props.card.on('changeMode', ({ mode }) => {
            this.setState({ mode });
        });
        waitElement('tour-comparison-basket-button')
            .then(() => {
                this.props.card.sendReady(this.props.tourComparisonData);
            });
    }

    shouldComponentUpdate(nextProps: TourComparisonProps, nextState: TourComparisonState) {
        return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
    }

    toggle = () => {
        if (this.state.mode === Mode.add) {
            this.props.card.addTourToComparisonBasket(this.props.tourComparisonData);
        } else {
            this.props.card.removeTourFromComparisonBasket(this.props.tourComparisonData);
        }
    }

    render() {
        const cx = this.classes();

        return (
            <div id="tour-comparison-basket-button" onClick={() => logMetric('click-compare')}>
                <button className={cx.buttonClear} onClick={this.toggle}>
                <span className={cx.tourControlIcon}>
                    {this.state.mode === Mode.add ?
                        <SVGIcon width={'20px'} height={'20px'} url="#icon-circle-plus"/>
                    :
                        <SVGIcon width={'20px'} height={'20px'} url="#icon-circle-minus"/>
                    }
                </span>
                    <span className={cx.tourControlText}>
                        {this.state.mode === Mode.add ? 'Сравнить' : 'Из сравнения' }
                    </span>
                </button>
            </div>
        );
    }

    private classes() {
        return {
            buttonClear: classNames({
                'button-style-clear': true
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
