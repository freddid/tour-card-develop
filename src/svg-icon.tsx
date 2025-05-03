/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { isEqual } from 'lodash';


export interface SVGIconProps {
    width: number | string;
    height: number | string;
    url: string;
}

export class SVGIcon extends React.Component<SVGIconProps, {}> {

    shouldComponentUpdate(newProps: SVGIconProps) {
        return !isEqual(this.props, newProps);
    }

    render() {
        return (
            <svg
                width={this.props.width}
                height={this.props.height}
            >
                <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref={`${this.props.url}`}
                    xmlBase={window.location.toString()}
                />
            </svg>
        );
    }
}
