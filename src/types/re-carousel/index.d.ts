/// <reference types="react" />

declare module 're-carousel' {
  export interface ReCarouselWidgetProps {
    index: number;
    total: number;
    prevHandler?: () => void;
    nextHandler?: () => void;
  }

  export interface CarouselOnTransitionEndState {
    current: HTMLElement;
    prev: HTMLElement;
    next: HTMLElement;
  }

  export enum AxisType {
    X = 'x',
    Y = 'y',
  }

  export interface CarouselProps {
    axis?: AxisType;
    auto?: boolean;
    loop?: boolean;
    interval?: number;
    duration?: number;
    className?: string;
    widgets?: ((props: ReCarouselWidgetProps) => JSX.Element)[];
    frames?: any;
    style?: any;
    minMove?: any;
    onTransitionEnd?: (state: CarouselOnTransitionEndState) => void;
  }

  // eslint-disable-next-line react/prefer-stateless-function
  export default class Carousel extends React.Component<CarouselProps> {}
}
