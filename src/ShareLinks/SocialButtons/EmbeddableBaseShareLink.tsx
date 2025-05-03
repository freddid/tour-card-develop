/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Component } from 'react';


export interface EmbeddableShareLinkProps {
    tourCardShortUrl: string;
    className?: string;
    parentIframeId?: string;
}

export interface EmbeddableShareLinkState {
}


export abstract class EmbeddableShareLink<P, S> extends
    Component<P & EmbeddableShareLinkProps, S & EmbeddableShareLinkState> {

    protected iframeWindow: any;
    protected shareButtonContainer: HTMLSpanElement;


    constructor(props: P & EmbeddableShareLinkProps) {
        super(props);

        if (!!this.props.parentIframeId) {
            const iframeElement = document.getElementById(this.props.parentIframeId as string) as HTMLIFrameElement;
            this.iframeWindow = iframeElement.contentWindow;
        } else {
            this.iframeWindow = window;
        }
    }

    componentDidMount() {
        this.shareButtonContainer = this.iframeWindow.document.getElementById(this.getContainerId());
        this.insertShareWidget();
    }

    componentDidUpdate() {
        this.insertShareWidget();
    }

    shouldComponentUpdate(newProps: P & EmbeddableShareLinkProps) {
        return newProps.tourCardShortUrl !== this.props.tourCardShortUrl;
    }

    protected abstract getContainerId(): string;
    protected abstract createShareButton(): void;

    private insertShareWidget() {
        if (!!this.props.tourCardShortUrl) {
           if (this.shareButtonContainer) this.shareButtonContainer.innerHTML = '';
            try {
                this.createShareButton();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
