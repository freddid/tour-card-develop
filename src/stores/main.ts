import { makeAutoObservable } from 'mobx';
import { TourSearchParams } from '../models/buy-online';
import { MODULE6_TARGET, TARGET } from '../types-and-consts';
import { ModuleTypes } from '../models/module';
import { IndexStore } from '.';

export class MainStore {
  root: IndexStore;

  numAdults = 0;

  numKids = 0;

  kidsAges: Array<number> = [];

  isNoInternationalPassportNeed = false;

  moduleTarget: string = TARGET;

  moduleType: ModuleTypes | null = null;

  private _fullTourPrice = 0;

  private _checkIn: Date | null = null;

  private _checkOut: Date | null = null;

  private _countryId = 0;

  tourSearchParams: TourSearchParams = {
    requestId: 0,
    sourceId: 0,
    offerId: 0,
  };

  private _isTourOperatorLogoInBuyOnlineFormVisibleInConfig = false;

  constructor(readonly _root: IndexStore) {
    makeAutoObservable(this);
    this.root = _root;
  }

  /** Цена тура + доплата за перелёт, округлённая в большую сторону */
  get fullTourPrice(): number {
    const surchargeAmount =
      this.root.flightOfferStore.selectedFlight?.surchargeAmount ?? 0;

    return Math.round(this.originPrice + surchargeAmount);
  }

  /** Цена тура, без доплат */
  get originPrice(): number {
    return this.root.flightOfferStore.actualizedInfo?.tourPrice ?? 0;
  }

  get checkIn(): Date | null {
    return this._checkIn;
  }

  get checkOut(): Date | null {
    return this._checkOut;
  }

  get countryId(): number {
    return this._countryId;
  }

  get isTourOperatorLogoInBuyOnlineFormVisible(): boolean {
    return (
      this.moduleTarget === MODULE6_TARGET &&
      this._isTourOperatorLogoInBuyOnlineFormVisibleInConfig
    );
  }

  setModuleTarget(target: string): void {
    this.moduleTarget = target;
  }

  setModuleType(type: ModuleTypes | null): void {
    this.moduleType = type;
  }

  setNumAdults(adults: number): void {
    this.numAdults = adults;
  }

  setNumKids(kids: number): void {
    this.numKids = kids;
  }

  setKidsAges(kidsAges: Array<number | null>): void {
    this.kidsAges = kidsAges.filter(Boolean) as Array<number>;
  }

  setIsNoInternationalPassportNeed(
    isNoInternationalPassportNeed: boolean,
  ): void {
    this.isNoInternationalPassportNeed = isNoInternationalPassportNeed;
  }

  setTourPrice(price: number): void {
    this._fullTourPrice = price;
  }

  setCheckIn(checkIn: Date | null): void {
    if (checkIn !== null) this._checkIn = checkIn;
  }

  setCheckOut(checkOut: Date | null): void {
    if (checkOut !== null) this._checkOut = checkOut;
  }

  setCountryId(countryId: number): void {
    this._countryId = countryId;
  }

  setTourSearchParams(params: Partial<TourSearchParams>): void {
    this.tourSearchParams = {
      ...this.tourSearchParams,
      ...params,
    };
  }

  setIsTourOperatorLogoInBuyOnlineFormVisibleInConfig(
    isVisible: boolean,
  ): void {
    this._isTourOperatorLogoInBuyOnlineFormVisibleInConfig = isVisible;
  }
}
