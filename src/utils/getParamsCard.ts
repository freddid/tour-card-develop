/* eslint-disable */
/* eslint-disable prettier/prettier */
import { currency } from "sletat-api-services";
import { TourCardParams } from "../types-and-consts";
import { ModuleTypes } from "../models/module";
import { RequiredTourFormFields } from "sletat-module-settings/dist/js/module6/model";
/**
 * 
 * Парсинг строки для получения параметров
 */
export const getParamsCard = (): TourCardParams => {
    const params = new URLSearchParams(location.hash.replace(/.+\?/, ""));
    
    return {
        adults: +(params.get("adults") as string),
        countryId: +(params.get("country") as string),
        currencyAlias: params.get("currency") as currency,
        kid1: +(params.get("kid1") as string),
        kid2: +(params.get("kid2") as string),
        kid3:  +(params.get("kid3") as string),
        kids: +(params.get("kids") as string),
        nights: +(params.get("nights") as string),
        offerId: +(params.get("offer") as string),
        price: +(params.get("price") as string),
        requestId: +(params.get("request") as string),
        sourceId:  +(params.get("source") as string),
        townId: +(params.get("town") as string),
        townFromId: +(params.get("townFrom") as string),
        vkGroupId:  +(params.get("vkGroupId") as string),
        tourFormRequiredFields:  +(params.get("tourFormRequiredFields") as string) as RequiredTourFormFields,
        moduleType: params.get("moduleType") as ModuleTypes,
        flightId: !isNaN(Number((params.get("flightId")))) ? Number((params.get("flightId"))) : null,
    };
};
