import { makeAutoObservable } from 'mobx';

export class BuyOnlineAdaptiveStore {
  viewportWidth = 320;

  viewportHeight = 0;

  private readonly DESKTOP_VIEW_BREAKPOINT = 900;

  constructor() {
    makeAutoObservable(this);
  }

  setViewportWidth(w: number): void {
    this.viewportWidth = w;
  }

  setViewportHeight(h: number): void {
    this.viewportHeight = h;
  }

  get isViewportDesktop(): boolean {
    return this.viewportWidth >= this.DESKTOP_VIEW_BREAKPOINT;
  }
}
