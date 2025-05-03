/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';

import { EmbeddableShareLink } from './EmbeddableBaseShareLink';


interface TwitterShareLinkProps {
    shareTitle: string;
}

interface IframeWindowType extends Window {
    twttr: {
        widgets: {
            createShareButton: Function
        }
    };
}

export class TwitterShareLink extends EmbeddableShareLink<TwitterShareLinkProps, {}> {

    private BUTTON_CONTAINER_ID = 'twitter-share-button';

    render() {
        const cx = this.classes();

        return (
            <li className={cx.root}>
                <span id={this.BUTTON_CONTAINER_ID}></span>
            </li>
        );
    }

    protected getContainerId() {
        return this.BUTTON_CONTAINER_ID;
    }

    protected createShareButton() {
        (this.iframeWindow as IframeWindowType).twttr.widgets.createShareButton(
            this.props.tourCardShortUrl,
            this.shareButtonContainer,
            {
                'size': 'large',
                'text': (this.props as TwitterShareLinkProps).shareTitle
            }
        );
    }

    private classes() {
        return {
            root: classNames({
                'share-links__item': !this.props.className,
                'twitter-share-link': !this.props.className,
                [this.props.className as string]: !!this.props.className
            })
        };
    }
}
