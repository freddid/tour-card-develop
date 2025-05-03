import {
  UiComponentValidator,
  getCustomValidator,
} from 'sletat-uikit2/dist/js/validators';
import { FieldValidator } from 'sletat-uikit2/dist/js/validators/FieldValidator';
import { ComposeValidator } from 'sletat-uikit2/dist/js/validators/utils/compose';

export function getErrorMessage(
  validator: FieldValidator | ComposeValidator,
): string {
  return validator.hasError() ? validator.errorMessage() : '';
}

export function getBirthCertificateSeriesValidator(): UiComponentValidator {
  return getCustomValidator(
    /^[A-Z]{1,4}-[А-ЯЁ]{2}$/,
    'Укажите корректную серию св-ва о рождении: (Пример: III-ФП)',
  );
}

export function getBirthCertificateNumberValidator(): UiComponentValidator {
  return getCustomValidator(
    /^\d{6}$/,
    'Укажите корректный номер св-ва о рождении (6 цифр)',
  );
}
