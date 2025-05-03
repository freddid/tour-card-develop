import { canUseDOM } from 'sletat-common-utils/lib/canUseDOM';
import * as moment from 'moment';
import { makeAutoObservable } from 'mobx';
import { COUNTRIES_IDS } from '../consts';
import { BuyOnlineStore } from './buy-online';
import { MainStore } from './main';
import { BuyOnlineUiStore } from './buy-online/ui';
import { TourShortInfoStickyStore } from './buy-online/tour-short-info';
import { BuyOnlineAdaptiveStore } from './buy-online/adaptive';
import { Cashback } from '../utils/cashback';
import { FlightsOfferStore } from './FlightsOffer';
import { IncludedServicesStore } from './includedServicesStore';

export class IndexStore {
  private _buyOnlineStore: BuyOnlineStore;

  private _mainStore: MainStore;

  private _buyOnlineUiStore: BuyOnlineUiStore;

  private _buyOnlineAdaptiveStore: BuyOnlineAdaptiveStore;

  private _tourShortInfoStickyStore: TourShortInfoStickyStore;

  private _flightOfferStore: FlightsOfferStore;

  private _cashback: Cashback;

  private _includedServicesStore: IncludedServicesStore;

  constructor() {
    makeAutoObservable(this);
    this._mainStore = new MainStore(this);
    this._buyOnlineStore = new BuyOnlineStore(this.mainStore);
    this._buyOnlineUiStore = new BuyOnlineUiStore();
    this._buyOnlineAdaptiveStore = new BuyOnlineAdaptiveStore();
    this._tourShortInfoStickyStore = new TourShortInfoStickyStore(
      this._buyOnlineAdaptiveStore,
    );
    this._cashback = new Cashback({
      selectedArrivalCountryId: COUNTRIES_IDS.Russia,
      startPromoReturnCashback: moment({ year: 2022, month: 7, day: 25 }),
      endPromoReturnCashback: moment({ year: 2022, month: 8, day: 11 }),

      startPromoTourDate: moment({ year: 2022, month: 9, day: 1 }),
      endPromoTourDate: moment({ year: 2022, month: 11, day: 25 }),
      currentDate: moment(),
      minNight: 3,
      percent: 20,
    });
    this._flightOfferStore = new FlightsOfferStore(this);
    this._includedServicesStore = new IncludedServicesStore();
  }

  get flightOfferStore(): FlightsOfferStore {
    return this._flightOfferStore;
  }

  get mainStore(): MainStore {
    return this._mainStore;
  }

  get buyOnlineStore(): BuyOnlineStore {
    return this._buyOnlineStore;
  }

  get cashback(): Cashback {
    return this._cashback;
  }

  get buyOnlineUiStore(): BuyOnlineUiStore {
    return this._buyOnlineUiStore;
  }

  get buyOnlineAdaptiveStore(): BuyOnlineAdaptiveStore {
    return this._buyOnlineAdaptiveStore;
  }

  get tourShortInfoStickyStore(): TourShortInfoStickyStore {
    return this._tourShortInfoStickyStore;
  }

  get includedServicesStore(): IncludedServicesStore {
    return this._includedServicesStore;
  }
}

const stores = new IndexStore();

export const useMainStore = () => stores;

// @ts-ignore
if (canUseDOM && process.env.NODE_ENV !== 'production') {
  window.__SLETAT_STORES__ = stores;
}

export default stores;
