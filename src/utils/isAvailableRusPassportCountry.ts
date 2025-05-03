import { AVAILABLE_RUS_PASSPORT_COUNTRIES } from '../consts';

export function isAvailableRusPassportCountry(countryId: number): boolean {
  return AVAILABLE_RUS_PASSPORT_COUNTRIES.includes(countryId);
}
