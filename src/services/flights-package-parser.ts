/* eslint-disable */
/* eslint-disable prettier/prettier */
import { FlightsParsedData, FlightsStatus } from 'sletat-api-services/lib/module/flights/models';
import { flightsPackageParser as _flightsPackageParser } from 'sletat-api-services/lib/module/flights/utils/package-parser';
import { FlightsParsingResources } from 'sletat-api-services/lib/module/flights/utils/parser';

export function flightsPackageParser(
  parsingData: FlightsParsingResources,
  shouldGetLastTransferArrivalDateOnly: boolean,
): Array<FlightsParsedData> {
  try {
    return _flightsPackageParser(
      parsingData,
      shouldGetLastTransferArrivalDateOnly,
    );
  } catch (err) {
    console.error('tour-card: flightsPackageParser failed: ', err);
    return [
      {
        surchargeAmount: 0,
        surchargeCurrencyId: 0,
        surchargeOriginAmount: 0,
        surchargeOriginCurrencyId: 0,
        flightsPackageId: null,
        status: FlightsStatus.NotConcrete,
        from: [],
        to: [],
        isChecked: false,
      },
    ];
  }
}
