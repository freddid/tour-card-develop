import { getModule5IframeWindow, getModule6IframeWindow } from '.';
import { MODULE6_TARGET, Target } from '../types-and-consts';

const easeInOut = (t: number, b: number, c: number, d: number): number => {
  let time = t;
  time /= d / 2;
  if (time < 1) return (c / 2) * time * time + b;
  time -= 1;
  return (-c / 2) * (time * (time - 2) - 1) + b;
};

const scrollSmoothTo = (
  anchor: HTMLElement,
  extraYOffset: number,
  duration: number,
  iframeDocument?: Document,
) => {
  const to =
    anchor.getBoundingClientRect().top + window.pageYOffset - extraYOffset;
  const element = (iframeDocument || document)?.querySelector('body');

  const start = element?.scrollTop ?? 0;
  const change = to - start;
  let currentTime = 0;
  const increment = 20;

  const animateScroll = () => {
    currentTime += increment;
    const val = easeInOut(currentTime, start, change, duration);
    if (element) element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
};

const getTargetNode = (
  el: string | HTMLElement,
  moduleId: Target,
): { target: HTMLElement; frame: Document } | null => {
  const isModule6 = moduleId === MODULE6_TARGET;
  const iframe = isModule6
    ? getModule6IframeWindow()
    : getModule5IframeWindow();
  if (!iframe) return null;

  if (typeof el === 'string') {
    const target = iframe.getElementById(el);
    if (target) {
      return { target: target as HTMLElement, frame: iframe };
    }
  }

  return { target: el as HTMLElement, frame: iframe };
};

export const smoothScroll = (
  el: string | HTMLElement,
  moduleId: Target,
  extraYOffset = 65,
  duration = 700,
): void => {
  const res = getTargetNode(el, moduleId);
  if (res) scrollSmoothTo(res.target, extraYOffset, duration, res.frame);
};

export const smoothScrollDefault = (
  el: string | HTMLElement,
  moduleId: Target,
): void => {
  const res = getTargetNode(el, moduleId);
  if (res) res.target.scrollIntoView({ behavior: 'smooth' });
};
