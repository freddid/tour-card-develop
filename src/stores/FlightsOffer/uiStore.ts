import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { FlightsParsedData } from 'sletat-api-services/lib/module/flights/models';
import { FlightsOfferStore } from '.';
import { getVerbalFlights } from '../../utils/format';
import { smoothScroll } from '../../utils/smoothScroll';
import { OFFER_CONTAINER_ID } from '../../tour/Flights/Offer';

export class UiFlightsStore {
  root: FlightsOfferStore;

  disposeAnimateSubscriber: () => void;

  private readonly ANIMATION_DELAY = 700;

  readonly FLIGHTS_CHUNK = 5;

  visibleFlightsAmount = this.FLIGHTS_CHUNK;

  currentMobilePage = 1;

  isAnimated = false;

  isMobileFiltersOpen = false;

  actualizationProgress = 0;

  constructor(readonly _root: FlightsOfferStore) {
    this.root = _root;
    makeAutoObservable(this);
    this.disposeAnimateSubscriber = reaction(
      () => [this.flightToShow, this.currentMobilePage],
      () => this.animateList(),
    );
  }

  increaseActualizationProgress(val: number): void {
    let counter = 0;
    const id = setInterval(() => {
      counter += 1;
      // eslint-disable-next-line no-return-assign
      runInAction(() => (this.actualizationProgress += 1));
      if (
        counter === val ||
        this.root.actualizationStatus.isActualizationCompleted
      )
        clearInterval(id);
    }, 100);
  }

  get flightToShow(): FlightsParsedData[] {
    return this.root.availablePackages.slice(0, this.visibleFlightsAmount);
  }

  get flightsLeft(): number {
    return this.root.availablePackages.length - this.visibleFlightsAmount;
  }

  get showMoreButtonCaption(): string {
    let amount = this.FLIGHTS_CHUNK;
    if (this.flightsLeft < amount) {
      amount = this.flightsLeft;
    }
    return `Показать ещё ${amount} ${getVerbalFlights(amount)}`;
  }

  setIsMobileFiltersOpen(flag: boolean): void {
    this.isMobileFiltersOpen = flag;
  }

  increaseVisibleFlightsAmount(): void {
    if (this.flightsLeft > this.FLIGHTS_CHUNK) {
      this.visibleFlightsAmount += this.FLIGHTS_CHUNK;
    } else {
      this.visibleFlightsAmount += this.flightsLeft;
    }
  }

  collapseList(): void {
    if (this.visibleFlightsAmount > this.FLIGHTS_CHUNK) {
      smoothScroll(
        OFFER_CONTAINER_ID,
        this.root.target,
        undefined,
        this.ANIMATION_DELAY,
      );
    }

    // For a smoother transition
    const id = setTimeout(() => {
      this.visibleFlightsAmount = this.FLIGHTS_CHUNK;
      clearTimeout(id);
    }, this.ANIMATION_DELAY);
  }

  setAnimated(isAnimated: boolean): void {
    this.isAnimated = isAnimated;
  }

  animateList(): void {
    this.setAnimated(true);
    const timeout = setTimeout(() => {
      this.setAnimated(false);
      clearTimeout(timeout);
    }, this.ANIMATION_DELAY);
  }

  setVisibleFlightAmount(): void {
    if (this.visibleFlightsAmount >= this.root.availablePackages.length) {
      this.visibleFlightsAmount = this.FLIGHTS_CHUNK;
    } else {
      this.visibleFlightsAmount += this.FLIGHTS_CHUNK;
    }
  }

  setCurrentMobilePage(page: number): void {
    this.currentMobilePage = page;
  }
}
