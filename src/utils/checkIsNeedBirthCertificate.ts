import { NO_PASSPORT_KID_AGE } from '../consts/ageConstants';
import { isAvailableRusPassportCountry } from './isAvailableRusPassportCountry';

export function checkIsNeedBirthCertificate(
  age: number | null,
  countryId: number,
): boolean {
  if (Number(age) >= NO_PASSPORT_KID_AGE) return false;
  return isAvailableRusPassportCountry(countryId);
}
