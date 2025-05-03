import { makeAutoObservable } from 'mobx';

import { FirstTouristsFieldsVisibility } from '../../models/buy-online';

export class BuyOnlineUiStore {
  isBuyButtonHovered = false;

  isBuyButtonShaking = false;

  firstTouristsFieldsVisibility: FirstTouristsFieldsVisibility =
    this.initialFirstTouristFieldsVisibility;

  isTouristsBlockVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleTouristsBlockVisible(): void {
    this.isTouristsBlockVisible = !this.isTouristsBlockVisible;
  }

  setIsBuyButtonHovered(isHovered: boolean): void {
    this.isBuyButtonHovered = isHovered;
  }

  setIsBuyButtonShaking(isShaking: boolean): void {
    this.isBuyButtonShaking = isShaking;
  }

  setFirstTouristFieldsVisibility(
    data: Partial<FirstTouristsFieldsVisibility>,
  ) {
    this.firstTouristsFieldsVisibility = {
      ...this.firstTouristsFieldsVisibility,
      ...data,
    };
  }

  setInitialFirstTouristFieldsVisibility() {
    this.firstTouristsFieldsVisibility =
      this.initialFirstTouristFieldsVisibility;
  }

  // eslint-disable-next-line class-methods-use-this
  private get initialFirstTouristFieldsVisibility(): FirstTouristsFieldsVisibility {
    return {
      isFullNameVisible: true,
      isPassportVisible: true,
      isPassportIssuedWhenVisible: true,
      isPassportIssuedByVisible: true,
    };
  }
}
