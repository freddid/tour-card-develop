import { makeAutoObservable, reaction } from 'mobx';
import { FlightsParsedData } from 'sletat-api-services/lib/module/flights/models';
import _ from 'lodash';
import { FlightsOfferStore } from '.';
import { FlightHelper } from '../../tour/Flights/helper/Flights';
import { FlightCategories, FlightCategory } from '../../types/enums';

export class FiltersStore {
  root: FlightsOfferStore;

  private readonly DEBOUNCE_DELAY = 500;

  disposeFilterSubscriber: () => void;

  selectedAirlines: Array<string> = [];

  isEconomyFilter = false;

  isBusinessFilter = false;

  isOneConnectionFilter = false;

  isWithoutConnectionFilter = false;

  isMoreThanTwoConnectionFilter = false;

  isBaggageIncludedFilter = false;

  isOnlyHandBaggageFilter = false;

  isWithoutBaggageFilter = false;

  constructor(readonly _root: FlightsOfferStore) {
    this.root = _root;
    makeAutoObservable(this);
    this.disposeFilterSubscriber = reaction(
      () => [
        this.isOneConnectionFilter,
        this.isMoreThanTwoConnectionFilter,
        this.isWithoutConnectionFilter,
        this.isBaggageIncludedFilter,
        this.isWithoutBaggageFilter,
        this.isOnlyHandBaggageFilter,
        this.isBusinessFilter,
        this.isEconomyFilter,
        this.selectedAirlines,
      ],
      () => {
        this.debouncedInitFilter();
        this.root.ui.collapseList(); // Reset list state
      },
    );
  }

  get isConnectionGroupChecked(): boolean {
    return (
      this.isWithoutConnectionFilter ||
      this.isMoreThanTwoConnectionFilter ||
      this.isOneConnectionFilter
    );
  }

  get isFlightCategoryGroupChecked(): boolean {
    return this.isEconomyFilter || this.isBusinessFilter;
  }

  get isBaggageGroupChecked(): boolean {
    return (
      this.isBaggageIncludedFilter ||
      this.isOnlyHandBaggageFilter ||
      this.isWithoutBaggageFilter
    );
  }

  get isSomeFilterChecked(): boolean {
    return !!(
      this.isConnectionGroupChecked ||
      this.isBaggageGroupChecked ||
      this.selectedAirlines.length ||
      this.isFlightCategoryGroupChecked
    );
  }

  // Actions start

  changeAirlines(airlineName: string): void {
    if (this.selectedAirlines.includes(airlineName)) {
      this.selectedAirlines = this.selectedAirlines.filter(
        (i) => i !== airlineName,
      );
    } else {
      this.selectedAirlines = this.selectedAirlines.concat(airlineName);
    }
  }

  toggleEconomy(): void {
    this.isEconomyFilter = !this.isEconomyFilter;
  }

  toggleBusiness(): void {
    this.isBusinessFilter = !this.isBusinessFilter;
  }

  setIsOneConnection(): void {
    this.isOneConnectionFilter = !this.isOneConnectionFilter;
  }

  setWithoutConnection(): void {
    this.isWithoutConnectionFilter = !this.isWithoutConnectionFilter;
  }

  setMoreThanTwoConnections(): void {
    this.isMoreThanTwoConnectionFilter = !this.isMoreThanTwoConnectionFilter;
  }

  resetConnectionFilters(): void {
    this.isOneConnectionFilter = false;
    this.isWithoutConnectionFilter = false;
    this.isMoreThanTwoConnectionFilter = false;
  }

  resetFlightCategoryFilters(): void {
    this.isBusinessFilter = false;
    this.isEconomyFilter = false;
  }

  setIsBaggageIncludedFilter(): void {
    this.isBaggageIncludedFilter = !this.isBaggageIncludedFilter;
  }

  setOnlyHandBaggageFilter(): void {
    this.isOnlyHandBaggageFilter = !this.isOnlyHandBaggageFilter;
  }

  setWithoutBaggageFilter(): void {
    this.isWithoutBaggageFilter = !this.isWithoutBaggageFilter;
  }

  resetBaggageFilters(): void {
    this.isOnlyHandBaggageFilter = false;
    this.isWithoutBaggageFilter = false;
    this.isBaggageIncludedFilter = false;
  }

  resetAirlineFilters(): void {
    this.selectedAirlines = [];
  }

  resetAllFilters(): void {
    this.resetConnectionFilters();
    this.resetBaggageFilters();
    this.resetAirlineFilters();
    this.resetFlightCategoryFilters();
    this.initFilter();
  }

  // Filters conditions start

  // eslint-disable-next-line class-methods-use-this
  baggageIncludedCond(p: FlightsParsedData): boolean {
    return !!(p.from[0]?.baggagePlaces && p.to[0]?.baggagePlaces);
  }

  // eslint-disable-next-line class-methods-use-this
  withOnlyHandBaggageCond(p: FlightsParsedData): boolean {
    const [from, to] = FlightHelper.getFirstFlightPack(p);
    return !!(
      !from?.baggagePlaces &&
      from?.luggagePlaces &&
      !to?.baggagePlaces &&
      to?.luggagePlaces
    );
  }

  // eslint-disable-next-line class-methods-use-this
  withoutBaggageCond(p: FlightsParsedData): boolean {
    const [from, to] = FlightHelper.getFirstFlightPack(p);
    return !!(
      (!from?.baggagePlaces &&
        !from?.baggageWeight &&
        !from?.luggagePlaces &&
        !from?.luggageWeight) ||
      (!to?.baggagePlaces &&
        !to?.baggageWeight &&
        !to?.luggagePlaces &&
        !to?.luggageWeight)
    );
  }

  private static flightCategoryCond(
    p: FlightsParsedData,
    category: FlightCategory,
  ): boolean {
    return (
      p.from[0]?.ticketsClass === category && p.to[0]?.ticketsClass === category
    );
  }

  // Filters conditions end

  initFilter(): void {
    this.root.ui.setCurrentMobilePage(1); // We should go back to 1-st page
    this.root.setFlightToOffer(this.root._flights);
    if (!this.isSomeFilterChecked) return;

    let res: Array<FlightsParsedData> = this.root._flights;

    if (this.isConnectionGroupChecked) {
      const connectionResult: FlightsParsedData[] = [];

      if (this.isWithoutConnectionFilter) {
        connectionResult.push(
          ...res.filter((p) => p.to.length === 1 && p.from.length === 1),
        );
      }

      if (this.isMoreThanTwoConnectionFilter) {
        connectionResult.push(
          ...res.filter((p) => p.to.length >= 3 || p.from.length >= 3),
        );
      }

      if (this.isOneConnectionFilter) {
        connectionResult.push(
          ...res.filter((p) => p.to.length === 2 && p.from.length === 2),
        );
      }

      res = connectionResult;
    }

    if (this.isBaggageGroupChecked) {
      res = res.filter(
        (it) =>
          FlightHelper.getIsSameBaggageParams(it.from) &&
          FlightHelper.getIsSameBaggageParams(it.to),
      );

      const baggageResult: FlightsParsedData[] = [];

      if (this.isBaggageIncludedFilter) {
        baggageResult.push(...res.filter((p) => this.baggageIncludedCond(p)));
      }

      if (this.isOnlyHandBaggageFilter) {
        baggageResult.push(
          ...res.filter((p) => this.withOnlyHandBaggageCond(p)),
        );
      }

      if (this.isWithoutBaggageFilter) {
        baggageResult.push(...res.filter((p) => this.withoutBaggageCond(p)));
      }

      res = _.uniqBy(baggageResult, (e) => e.flightsPackageId);
    }

    if (this.isFlightCategoryGroupChecked) {
      const flightCategoryResult: Array<FlightsParsedData> = [];

      if (this.isEconomyFilter) {
        flightCategoryResult.push(
          ...res.filter((p) =>
            FiltersStore.flightCategoryCond(p, FlightCategories.economy),
          ),
        );
      }

      if (this.isBusinessFilter) {
        flightCategoryResult.push(
          ...res.filter((p) =>
            FiltersStore.flightCategoryCond(p, FlightCategories.business),
          ),
        );
      }

      res = flightCategoryResult;
    }

    if (this.selectedAirlines.length) {
      const airLinesResult: Array<FlightsParsedData> = [];

      res
        .filter(
          (it) =>
            FlightHelper.getIsSameAirlines(it.from) &&
            FlightHelper.getIsSameAirlines(it.to) &&
            it.from[0].airlineId === it.to[0].airlineId,
        )
        .forEach((it) => {
          if (this.selectedAirlines.includes(it.from[0].airlineName ?? '')) {
            airLinesResult.push(it);
          }
        });

      res = airLinesResult;
    }

    this.root.setFlightToOffer(res);
  }

  debouncedInitFilter = _.debounce(this.initFilter, this.DEBOUNCE_DELAY);
}
