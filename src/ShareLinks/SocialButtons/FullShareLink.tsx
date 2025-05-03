/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Component } from 'react';
import * as classNames from 'classnames';
import { ClipToolTip } from '../ClipToolTip/index';


interface FullShareLinkProps {
    tourCardShortUrl: string;
    className?: string;
}

interface FullShareLinkState {
    isToolTipOpened: boolean;
}

export class FullShareLink extends Component<FullShareLinkProps, FullShareLinkState> {

    constructor(props: FullShareLinkProps) {
        super(props);

        this.state = {
            isToolTipOpened: false
        } as FullShareLinkState;
    }

    render() {
        const cx = this.classes();

        return (
            <li className={cx.root} onClick={() => this.onShare()}>
                <ClipToolTip
                    messageText={this.props.tourCardShortUrl}
                    isOpened={this.state.isToolTipOpened}
                    onClose={() => this.closeToolTip()}
                />
            </li>
        );
    }

    private onShare() {
        this.setState({ isToolTipOpened: true } as FullShareLinkState);
    }

    private closeToolTip() {
        this.setState({ isToolTipOpened: false } as FullShareLinkState);
    }

    private classes() {
        return {
            root: classNames({
                'share-links__item': !this.props.className,
                'full-share-link': !this.props.className,
                [this.props.className as string]: !!this.props.className
            })
        };
    }
}
