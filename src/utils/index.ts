/* eslint-disable no-use-before-define */
import { IFRAME_ID, MODULE6_TARGET, Target } from '../types-and-consts';
import { smoothScroll } from './smoothScroll';

export function getCurrentDocument(): Document | null {
  return (window as any).frames[IFRAME_ID]
    ? (window as any).frames[IFRAME_ID].contentDocument
    : null;
}

export const getModule6IframeWindow = (): Document | null => {
  const frame = document.querySelector(
    `#${IFRAME_ID}[data-target='${MODULE6_TARGET}']`,
  ) as HTMLIFrameElement;
  if (frame) return frame.contentWindow?.document ?? null;
  return null;
};

export const getModule5IframeWindow = (): Document | null => {
  const frame = document.querySelector(
    '#sletat-tour-card-iframe',
  ) as HTMLIFrameElement;
  if (frame) return frame.contentWindow?.document ?? null;
  return null;
};

export const scrollToElement = (
  target: string | HTMLElement,
  moduleId: Target,
  duration = 500,
) => {
  smoothScroll(target, moduleId, 65, duration);
};

// Используется в TourOrder
export function scrollToField(elem: HTMLElement): void {
  if (isTouchDevice()) {
    const { top, left } = elem.getBoundingClientRect();
    const win = elem.ownerDocument?.defaultView;

    if (!win) {
      return;
    }

    win.scrollTo(left + win.pageXOffset, top + win.pageYOffset - 10);
  }
}

export function isTouchDevice(): boolean {
  return 'ontouchstart' in document.documentElement;
}

export function isIOS(): boolean {
  return isIPhone() || isIPad() || isIPod();
}

export function isIPhone(): boolean {
  return /iPhone/.test(navigator.userAgent) && !(window as any).MSStream;
}

export function isIPad(): boolean {
  return /iPad/.test(navigator.userAgent);
}

export function isIPod(): boolean {
  return /iPod/.test(navigator.userAgent);
}

// Знаю, что костыль. dmtrv
export function waitElement(id: string, time = 300, attempts = 5) {
  let currAttempts = attempts;
  return new Promise<HTMLElement>((resolve, reject) => {
    const iframeDocument = getModule6IframeWindow();
    let element = iframeDocument?.getElementById(id);
    if (element) {
      resolve(element);
    } else {
      setTimeout(function repeater() {
        currAttempts -= 1;
        element = iframeDocument?.getElementById(id);
        if (element) {
          resolve(element);
        } else if (currAttempts > 0) {
          setTimeout(repeater, time);
        } else {
          reject(new Error(`Не удалось получить элемен "${id}"`));
        }
      }, time);
    }
  });
}

export function verboseFormatDate(date: string) {
  const getMonthByNumber = (monthNumber: number) => {
    const resultMonth = [
      'январь',
      'февраль',
      'март',
      'апрель',
      'май',
      'июнь',
      'июль',
      'август',
      'сентябрь',
      'октябрь',
      'ноябрь',
      'декабрь',
    ][monthNumber - 1];
    return resultMonth.replace(/(ь|й)$/, 'я').replace(/т$/, 'та');
  };

  if (/^\d\d\.\d\d\.\d\d\d\d$/.test(date)) {
    const match = date.match(/^(\d\d)\.(\d\d)\.(\d\d\d\d)$/);
    if (!match) {
      throw new Error("'date' doesn't match to the pattern");
    }
    return `${match[1]} ${getMonthByNumber(parseInt(match[2], 10))}`;
  }
  throw new Error("'date' should has format 'dd.mm.yyyy'.");
}

export function getCurrencyOriginByAlias(alias: string) {
  switch (alias) {
    case 'RUB':
      return ' руб.';
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    case 'BYR':
    case 'BYN':
      return ' BYN';
    case 'KZT':
      return '₸';
    case 'UAH':
      return '₴';
    default:
      return ' ';
  }
}

export interface RAFStep {
  (_timestamp: number): any;
}

export interface MetricLogger {
  reachGoal: (_name: string, _options?: any) => void;
}

export function raf(step: RAFStep): number {
  const w = window as any;
  const requestAnimation =
    w.requestAnimationFrame ||
    w.mozRequestAnimationFrame ||
    w.webkitRequestAnimationFrame ||
    w.msRequestAnimationFrame ||
    function (innerStep: RAFStep) {
      setTimeout(innerStep, 16);
      return Math.random() * 1000000;
    };
  return requestAnimation(step);
}

export function logMetric(name: string, options?: any): void {
  const metricLogger = (window as any).metrikaLogger as MetricLogger;

  if (metricLogger) {
    setTimeout(() => {
      metricLogger.reachGoal(name, options);
    });
  }
}

export function printWarn(message: string): void {
  if (!console || typeof console.warn !== 'function') {
    return;
  }
  console.warn(message);
}

export function printErr(err: Error | string): void {
  if (!console || typeof console.warn !== 'function') {
    return;
  }
  console.error(err);
}

export function getMonthNameByIndex(index: number): string {
  return [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ][index];
}

export function getShortDayNameByIndex(index: number): string {
  return ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'][index > 0 ? index - 1 : 6];
}
