/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';
import { EmbeddableShareLink, EmbeddableShareLinkProps } from './EmbeddableBaseShareLink';


interface OkShareLinkProps extends EmbeddableShareLinkProps { }

interface IframeWindowType extends Window {
    OK: {
        CONNECT: {
            insertShareWidget: Function
        }
    };
}

export class OkShareLink extends EmbeddableShareLink<OkShareLinkProps, {}> {

    private BUTTON_CONTAINER_ID = 'ok-share-button';

    constructor(props: OkShareLinkProps) {
        super(props);
    }

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
        (this.iframeWindow as IframeWindowType).OK.CONNECT.insertShareWidget(
            this.BUTTON_CONTAINER_ID,
            this.props.tourCardShortUrl,
            '{width:28,height:35,st:\'straight\',sz:30,nt:1,nc:1}' // Настройки внешнего вида.
        );
    }

    private classes() {
        return {
            root: classNames({
                'share-links__item': !this.props.className,
                'ok-share-link': !this.props.className,
                [this.props.className as string]: !!this.props.className
            })
        };
    }
}
