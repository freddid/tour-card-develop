/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as classNames from 'classnames';

interface WhatsAppShareLinkProps {
    tourCardShortUrl: string;
    className?: string;
}

export function WhatsAppShareLink(props: WhatsAppShareLinkProps) {
    const cx = classes();

    return (
        <li className={cx.root} onClick={() => onShare(props)}/>
    );

    function classes() {
        return {
            root: classNames({
                'share-links__item': !props.className,
                'whatsapp-share-link': !props.className,
                [props.className as string]: !!props.className
            })
        };
    }
}

function onShare(props: WhatsAppShareLinkProps) {
    openShareWindow(getSharingUrl(props));
}

function getSharingUrl(props: WhatsAppShareLinkProps) {
    return `https://wa.me/?text=${encodeURI(props.tourCardShortUrl)}`;
}

function openShareWindow(url: string) {
    window.open(url, "_blank");
}
