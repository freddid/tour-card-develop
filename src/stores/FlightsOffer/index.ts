import { makeAutoObservable, reaction, when } from 'mobx';
import { TourFlightInfo } from 'sletat-api-services/lib/agent/models/common';
import {
  FlightsData,
  FlightsParsedData,
  FlightsStatus,
} from 'sletat-api-services/lib/module/flights/models';

import { FlightCategories } from '../../types/enums';
import { formatDateStringToIsoString } from '../../utils/format';
import { FlightHelper } from '../../tour/Flights/helper/Flights';
import { IndexStore } from '..';
import { TourActualizedInfo } from '../../helpers/TourActualizedInfo';
import { FiltersStore } from './filtersStore';
import { UiFlightsStore } from './uiStore';
import { TourOperatorsWithConcretization } from '../../utils/getTourHasFlightsWithConcretization';
import { getParamsCard } from '../../utils/getParamsCard';
import { MODULE6_TARGET, Target } from '../../types-and-consts';

type ActualizationStatus = {
  isActualizationInProgress: boolean;
  isActualizationCompleted: boolean;
  isDetailedFailed: boolean;
};

export class FlightsOfferStore {
  target: Target;

  root: IndexStore;

  private _filtersStore: FiltersStore;

  private _ui: UiFlightsStore;

  actualizationStatus: ActualizationStatus = {
    isActualizationInProgress: false,
    isActualizationCompleted: false,
    isDetailedFailed: false,
  };

  _flights: FlightsParsedData[] = [];

  private flightsToOffer: FlightsParsedData[] = [];

  observedFlight!: number;

  theCheapestFlightId: number;

  actualizedInfo: TourActualizedInfo;

  selectedFlightsPackageId = 0;

  disposePushFlightToUrl!: () => void;

  disposeInitialPackageId!: () => void;

  disposeFlightPropagation!: () => void;

  constructor(readonly _root: IndexStore) {
    this.root = _root;
    makeAutoObservable(this);
    this._filtersStore = new FiltersStore(this);
    this._ui = new UiFlightsStore(this);
    this.disposeInitialPackageId = when(
      () => this.actualizationStatus.isActualizationCompleted,
      () => {
        if (this.initialFlightPackageId)
          this.setSelectFlightsPackage(this.initialFlightPackageId);
      },
    );

    this.disposePushFlightToUrl = reaction(
      () => this.selectedFlightsPackageId,
      () => {
        // Если перелёт один, у него нет Id
        if (
          this.selectedFlight &&
          this.availablePackages.length > 1 &&
          this.target === MODULE6_TARGET
        ) {
          FlightHelper.pushFlightToUrl(this.selectedFlightsPackageId);
        }
      },
    );

    this.disposeFlightPropagation = when(
      () =>
        !this.ui.flightToShow.some(
          (it) => it.flightsPackageId === this.selectedFlightsPackageId,
        ) &&
        this.actualizationStatus.isActualizationCompleted &&
        !this.filtersStore.isSomeFilterChecked,
      () => this.putSelectedFromUrlFlightFirst(),
    );
  }

  setTarget(target: Target): void {
    this.target = target;
  }

  /**
   *
   * @remarks
   * Метод используется, когда пришла строка в id перелета, и он не виден в первой выдаче.
   * Поднимаем этот перелёт в списке, чтобы он был виден.
   */
  putSelectedFromUrlFlightFirst(): void {
    const idx = this.flightsToOffer.findIndex(
      (it) => it.flightsPackageId === this.selectedFlightsPackageId,
    );
    if (idx === -1) return;
    const target = this.flightsToOffer.splice(idx, 1);
    this.flightsToOffer.unshift(target[0]);
  }

  private get initialFlightPackageId(): number | null {
    if (this.actualizationStatus.isDetailedFailed) return 0;
    const flightIdFromUrl = getParamsCard().flightId;

    return flightIdFromUrl &&
      this.availablePackages.find(
        (it) => it.flightsPackageId === flightIdFromUrl,
      )
      ? flightIdFromUrl
      : this.availablePackages[0]?.flightsPackageId || null;
  }

  get isActualizationFailed(): boolean {
    return (
      this.actualizationStatus.isActualizationCompleted &&
      this.actualizationStatus.isDetailedFailed
    );
  }

  get ui(): UiFlightsStore {
    return this._ui;
  }

  get filtersStore(): FiltersStore {
    return this._filtersStore;
  }

  setActualizationStatus(params: ActualizationStatus): void {
    this.actualizationStatus = params;
  }

  setActualizedInfo(actualizedInfo: TourActualizedInfo): void {
    this.actualizedInfo = actualizedInfo;
  }

  setSelectFlightsPackage(id: number): void {
    this.selectedFlightsPackageId = id;
  }

  get hasFlightsWithConcretization(): boolean {
    if (this.actualizedInfo.tour?.sourceId) {
      return (
        [
          TourOperatorsWithConcretization.BiblioGlobus,
          TourOperatorsWithConcretization.Intourist,
        ].includes(this.actualizedInfo.tour.sourceId) &&
        this.availablePackages.some((flight) => {
          return (
            flight.from.some((fl) => fl.isConcrete) ||
            flight.to.some((fl) => fl.isConcrete)
          );
        })
      );
    }

    return false;
  }

  private getFlightsStatus(
    flightsParsedData: FlightsParsedData | null | undefined,
  ): FlightsStatus {
    if (!this.actualizationStatus.isActualizationCompleted) {
      return FlightsStatus.Loading;
    }
    if (this.actualizedInfo.tour && !this.actualizedInfo.tourIncludesTickets) {
      return FlightsStatus.FlightsNotIncluded;
    }
    if (this.actualizationStatus.isDetailedFailed) {
      return FlightsStatus.NotConcrete;
    }
    if (
      !this.actualizedInfo.isDetailedActualization &&
      this.actualizedInfo.tourIncludesTickets
    ) {
      return FlightsStatus.NoData;
    }
    if (this.actualizedInfo.isTourSold) {
      return FlightsStatus.NoTickets;
    }
    if (!flightsParsedData) {
      return FlightsStatus.NoData;
    }

    return flightsParsedData.status;
  }

  private getFlightsInfo(
    flightsParsedData: FlightsParsedData | null | undefined,
  ): FlightsData {
    const hasNoFlightsInfo = !flightsParsedData && this.actualizedInfo.tour;
    const flightsHaveNoData =
      flightsParsedData &&
      this.actualizedInfo.tour &&
      flightsParsedData.status === FlightsStatus.NoData;
    const emptyFlightsInfo = {
      to: [],
      from: [],
      flightsPackageId: null,
      surchargeAmount: 0,
      surchargeCurrencyId: 0,
      surchargeOriginAmount: 0,
      surchargeOriginCurrencyId: 0,
      isChecked: false,
    };

    if (hasNoFlightsInfo || flightsHaveNoData) {
      return emptyFlightsInfo;
    }

    return flightsParsedData || emptyFlightsInfo;
  }

  private getFlightsInfoWithStatus(
    flightsParsedData: FlightsParsedData | null | undefined,
  ): FlightsParsedData {
    return {
      ...this.getFlightsInfo(flightsParsedData),
      status: this.getFlightsStatus(flightsParsedData),
    };
  }

  setTheCheapestFlightId(id: number): void {
    this.theCheapestFlightId = id;
  }

  get currentMobileData(): FlightsParsedData[] {
    const firstPageIndex =
      (this.ui.currentMobilePage - 1) * this.ui.FLIGHTS_CHUNK;
    const lastPageIndex = firstPageIndex + this.ui.FLIGHTS_CHUNK;
    return this.availablePackages.slice(firstPageIndex, lastPageIndex);
  }

  get availablePackages(): FlightsParsedData[] {
    return this.flightsToOffer.filter(
      (pack) =>
        ![FlightsStatus.NoData, FlightsStatus.NotConcrete].includes(
          pack?.status,
        ),
    );
  }

  get flightAmount(): number {
    return this._flights.length;
  }

  get selectedFlight(): FlightsParsedData | null {
    return (
      this.availablePackages.find(
        (flight) => flight?.flightsPackageId === this.selectedFlightsPackageId,
      ) ?? null
    );
  }

  getSelectedFlightInfo(flightDirection: 'to' | 'from'): TourFlightInfo[] {
    const flights = this.selectedFlight?.[flightDirection].map((item) => {
      return {
        startDate: formatDateStringToIsoString(item.startDate, item.startTime),
        endDate: formatDateStringToIsoString(item.endDate, item.endTime),
        description: item.originTOFlightName || '',
        fromIata: item.airportFromCode,
        toIata: item.airportToCode,
      };
    });

    return flights ?? [];
  }

  private getTourPrice(flightData: FlightsParsedData): number {
    return flightData.surchargeAmount + this.root.mainStore.originPrice;
  }

  get airlines(): (string | null)[] {
    return Array.from(
      new Set(
        this._flights
          .filter(
            (it) =>
              FlightHelper.getIsSameAirlines(it.from) &&
              FlightHelper.getIsSameAirlines(it.to),
          )
          .map((it) => it.from[0]?.airlineName),
      ),
    );
  }

  getMinPriceAirline(airlineName: string): number | null {
    const res = this._flights.filter(
      (it) =>
        FlightHelper.getIsSameAirlines(it.from) &&
        FlightHelper.getIsSameAirlines(it.to) &&
        it.from[0]?.airlineName === airlineName,
    );
    if (res.length) {
      return this.getTourPrice(res[0]);
    }

    return null;
  }

  getMinPriceByCategory(category: string): number | null {
    const minPriceFlight = this._flights.filter(
      (p) =>
        p.to[0].ticketsClass === category &&
        p.from[0].ticketsClass === category,
    );
    if (minPriceFlight.length) {
      return this.getTourPrice(minPriceFlight[0]);
    }

    return null;
  }

  get withEconomyMinPrice(): number | null {
    return this.getMinPriceByCategory(FlightCategories.economy);
  }

  get withBusinessMinPrice(): number | null {
    return this.getMinPriceByCategory(FlightCategories.business);
  }

  get withoutConnectionMinPrice(): number | null {
    const minPriceFlight = this._flights.filter(
      (p) => p.to.length === 1 && p.from.length === 1,
    );
    if (minPriceFlight.length) {
      return this.getTourPrice(minPriceFlight[0]);
    }

    return null;
  }

  get withOneConnectionMinPrice(): number | null {
    const minPriceFlight = this._flights.filter(
      (p) => p.to.length === 2 && p.from.length === 2,
    );
    if (minPriceFlight.length) {
      return this.getTourPrice(minPriceFlight[0]);
    }

    return null;
  }

  get withMoreThanTwoConnectionMinPrice(): number | null {
    const minPriceFlight = this._flights.filter(
      (p) => p.to.length >= 3 || p.from.length >= 3,
    );
    if (minPriceFlight.length) {
      return this.getTourPrice(minPriceFlight[0]);
    }

    return null;
  }

  private get sameBaggageParamsFlights(): FlightsParsedData[] {
    return this._flights.filter(
      (it) =>
        FlightHelper.getIsSameBaggageParams(it.from) &&
        FlightHelper.getIsSameBaggageParams(it.to),
    );
  }

  get withBaggageIncludedMinPrice(): number | null {
    const flights = this.sameBaggageParamsFlights.filter((p) =>
      this.filtersStore.baggageIncludedCond(p),
    );
    if (flights.length) {
      return this.getTourPrice(flights[0]);
    }

    return null;
  }

  get withOnlyHandBaggageMinPrice(): number | null {
    const flights = this.sameBaggageParamsFlights.filter((p) =>
      this.filtersStore.withOnlyHandBaggageCond(p),
    );
    if (flights.length) {
      return this.getTourPrice(flights[0]);
    }

    return null;
  }

  get withoutBaggageMinPrice(): number | null {
    const flights = this.sameBaggageParamsFlights.filter((p) =>
      this.filtersStore.withoutBaggageCond(p),
    );
    if (flights.length) {
      return this.getTourPrice(flights[0]);
    }

    return null;
  }

  setObservedFight(id: number): void {
    this.observedFlight = id;
  }

  setFlightToOffer(flights: FlightsParsedData[]) {
    this.flightsToOffer = flights;
  }

  initFlights(flightsPackages: FlightsParsedData[]) {
    this._flights = flightsPackages.sort(
      (a, b) => a.surchargeAmount - b.surchargeAmount,
    );
    this.flightsToOffer = this._flights;
    this.setTheCheapestFlightId(this._flights[0].flightsPackageId ?? 0);
  }

  disposer(): void {
    if (this.target === MODULE6_TARGET) {
      this.disposeFlightPropagation();
      this.disposeInitialPackageId();
      this.disposePushFlightToUrl();
      this.ui.disposeAnimateSubscriber();
      this.filtersStore.disposeFilterSubscriber();
    }
  }
}
