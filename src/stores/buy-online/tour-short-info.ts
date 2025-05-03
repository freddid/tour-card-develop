import { runInAction, makeAutoObservable } from 'mobx';
import { IFRAME_ID } from '../../types-and-consts';
import { BuyOnlineAdaptiveStore } from './adaptive';

export const TOUR_SHORT_INFO_SECTION = 'tour-short-info-section';
export const TOUR_SHORT_INFO_STICKY_BLOCK = 'tour-short-info-sticky-block';

export class TourShortInfoStickyStore {
  stickyModifier = 'default';

  private adaptiveStore: BuyOnlineAdaptiveStore;

  private tourCardIFrame: HTMLIFrameElement | null = null;

  private tourCardIFrameDocument: Document | null = null;

  private stickyBlock: Element | null = null;

  private tourShortInfoSection: Element | null = null;

  private updaterIntervalId = -1;

  constructor(adaptiveStore: BuyOnlineAdaptiveStore) {
    makeAutoObservable(this);
    this.adaptiveStore = adaptiveStore;
  }

  attachScrollListener(): void {
    this.tourCardIFrame = document.getElementById(
      IFRAME_ID,
    ) as HTMLIFrameElement;
    this.tourCardIFrameDocument = this.tourCardIFrame!.contentDocument;
    this.tourShortInfoSection = this.tourCardIFrameDocument!.getElementById(
      TOUR_SHORT_INFO_SECTION,
    );
    this.stickyBlock = this.tourCardIFrameDocument!.getElementById(
      TOUR_SHORT_INFO_STICKY_BLOCK,
    );

    this.tourCardIFrameDocument!.addEventListener(
      'scroll',
      this.updateStickyBlockPosition,
    );
  }

  detachScrollListener(): void {
    this.tourCardIFrameDocument!.removeEventListener(
      'scroll',
      this.updateStickyBlockPosition,
    );
  }

  updateStickyBlockPosition = (): void => {
    if (
      !this.stickyBlock ||
      !this.tourShortInfoSection ||
      !this.adaptiveStore.isViewportDesktop
    ) {
      return;
    }

    const sectionRect = this.tourShortInfoSection.getBoundingClientRect();
    const stickyBlockRect = this.stickyBlock.getBoundingClientRect();

    const stickyBlockContainerHeight =
      sectionRect.height + stickyBlockRect.bottom;

    const topLimit =
      sectionRect.top < 0 &&
      stickyBlockContainerHeight > stickyBlockRect.height;
    const bottomLimit = stickyBlockContainerHeight < stickyBlockRect.height;

    if (topLimit) {
      // eslint-disable-next-line no-return-assign
      runInAction(() => (this.stickyModifier = 'sticky'));
    } else if (bottomLimit) {
      // eslint-disable-next-line no-return-assign
      runInAction(() => (this.stickyModifier = 'over-sticky'));
    } else {
      // eslint-disable-next-line no-return-assign
      runInAction(() => (this.stickyModifier = 'default'));
    }
  };

  startIntervalUpdateStickyBlockPosition(): void {
    this.updaterIntervalId = window.setInterval(
      this.updateStickyBlockPosition,
      50,
    );
  }

  stopIntervalUpdateStickyBlockPosition(): void {
    clearInterval(this.updaterIntervalId);
  }
}
