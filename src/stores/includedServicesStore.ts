import { makeAutoObservable } from 'mobx';
import {
  Services,
  TourService,
} from 'sletat-api-services/lib/module/tourActualization/models';
import { TourServices2 as SERVICE_TYPES } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/TourServices';

const IMPORTANT_SERVICES = [
  SERVICE_TYPES.MEDICAL_INSURANCE,
  {
    ...SERVICE_TYPES.TRANSFER,
    name: 'трансфер аэропорт - отель - аэропорт',
  },
];
export class IncludedServicesStore {
  included: TourService[] = [];

  notIncluded: TourService[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setIncludedServices(services: TourService[]): void {
    this.included = services;
  }

  setNotIncludedServices(services: TourService[]): void {
    this.notIncluded = services;
  }

  static getImportantServices(tourIncludesTickets: boolean): TourService[] {
    if (!tourIncludesTickets) {
      return [SERVICE_TYPES.MEDICAL_INSURANCE];
    }

    return IMPORTANT_SERVICES;
  }

  checkImportantServices(tourIncludesTickets: boolean) {
    if (!this.included.length) return;

    const importantServices =
      IncludedServicesStore.getImportantServices(tourIncludesTickets);

    importantServices.forEach((importantService) => {
      if (
        !this.included.some(
          (includedService) => importantService.type === includedService.type,
        )
      ) {
        this.notIncluded.push(importantService);
      }
    });
  }

  initServices(services: Services, tourIncludesTickets: boolean) {
    if (!services || !services.included) return;
    this.setIncludedServices(services.included);
    this.setNotIncludedServices(services.notIncluded);
    this.checkImportantServices(tourIncludesTickets);
  }
}
