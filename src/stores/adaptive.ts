import { makeAutoObservable, reaction } from 'mobx';

export type Device = {
  isSuperMobile: boolean;
  isMobile: boolean;
  isTabletSmall: boolean;
  isTablet: boolean;
  isTabletLarge: boolean;
  isDesktop: boolean;
};

export class AdaptiveStore {
  private _device: Device = {
    isSuperMobile: false,
    isMobile: false,
    isTabletSmall: false,
    isTablet: false,
    isTabletLarge: false,
    isDesktop: true,
  };

  private _viewportWidth = 0;

  private SUPER_MOBILE_BP = 479;

  private readonly MOBILE_BP = 759;

  private readonly TABLET_BP = 890;

  private readonly TABLET_LARGE_BP = 1024;

  private readonly DESKTOP_BP = 1200;

  dispose: () => void;

  constructor() {
    makeAutoObservable(this);
    this.updateDevice();
    this.dispose = reaction(
      () => this._viewportWidth,
      () => {
        this.updateDevice();
      },
    );
  }

  get device(): Device {
    return this._device;
  }

  get viewportWidth(): number {
    return this._viewportWidth;
  }

  get isTablet(): boolean {
    return this.device.isTabletLarge || this.device.isTabletSmall;
  }

  get isMobile(): boolean {
    return this.device.isMobile || this.device.isSuperMobile;
  }

  public setViewportWidth(w: number): void {
    this._viewportWidth = w;
  }

  updateDevice(): void {
    /* 
      Viewport greater than 1200px --- isDesktop
    * */
    if (this.viewportWidth > this.DESKTOP_BP) {
      this.setDevice({
        isSuperMobile: false,
        isMobile: false,
        isTabletSmall: false,
        isTablet: false,
        isTabletLarge: false,
        isDesktop: true,
      });
      return;
    }

    /*
      Viewport between 1200px and 1024px --- isTabletLarge
    * */
    if (
      this.viewportWidth <= this.DESKTOP_BP &&
      this.viewportWidth > this.TABLET_LARGE_BP
    ) {
      this.setDevice({
        isSuperMobile: false,
        isMobile: false,
        isTabletSmall: false,
        isTablet: false,
        isTabletLarge: true,
        isDesktop: false,
      });
      return;
    }

    /*
      Viewport between 1024px and 890px --- isTablet
    * */
    if (
      this.viewportWidth <= this.TABLET_LARGE_BP &&
      this.viewportWidth > this.TABLET_BP
    ) {
      this.setDevice({
        isSuperMobile: false,
        isMobile: false,
        isTabletSmall: false,
        isTablet: true,
        isTabletLarge: false,
        isDesktop: false,
      });
      return;
    }

    /*
      Viewport between 890px and 759px --- isTabletSmall
    * */
    if (
      this.viewportWidth <= this.TABLET_BP &&
      this.viewportWidth > this.MOBILE_BP
    ) {
      this.setDevice({
        isSuperMobile: false,
        isMobile: false,
        isTabletSmall: true,
        isTablet: false,
        isTabletLarge: false,
        isDesktop: false,
      });
      return;
    }

    /*
      Viewport between 759px and 479px --- isMobile
    * */
    if (
      this.viewportWidth <= this.MOBILE_BP &&
      this.viewportWidth > this.SUPER_MOBILE_BP
    ) {
      this.setDevice({
        isSuperMobile: false,
        isMobile: true,
        isTabletSmall: false,
        isTablet: false,
        isTabletLarge: false,
        isDesktop: false,
      });
      return;
    }

    this.setDevice({
      isSuperMobile: true,
      isMobile: true,
      isTabletSmall: false,
      isTablet: false,
      isTabletLarge: false,
      isDesktop: false,
    });
  }

  private setDevice(device: Device): void {
    this._device = device;
  }
}

const adaptiveStore = new AdaptiveStore();

export const useAdaptiveStore = () => adaptiveStore;
