/* eslint-disable */
/* eslint-disable prettier/prettier */
import { entryPoint, EntryPointParams } from './entry-point';
import { currency } from 'sletat-api-services/lib/types';
import { ModuleTypes } from './models/module';

const url = `http://tour-card.ru:8080/#tour-card?currency=RUB&price=31450&nights=10&adults=2&kids=0&kid1=&kid2=&kid3=&
                vkGroupId=0&request=28175733&source=1147106984&offer=217090169&country=119&townFrom=832&hotel=11409&
                town=566&tourFormRequiredFields=0`;


function getEntryPointParams(srcUrl: string): EntryPointParams {
    const matchParam = (regexp: RegExp): string => {
        const match = regexp.exec(srcUrl);
        return !!match ? match[1] : '';
    };

    const matchIntParam = (regexp: RegExp): number => {
        return parseInt(matchParam(regexp), 10);
    };

    return {
        tourCardParams: {
            requestId: matchIntParam(/request=([\d]+)/),
            sourceId: matchIntParam(/source=([\d]+)/),
            offerId: matchIntParam(/offer=([\d]+)/),
            countryId: matchIntParam(/country=([\d]+)/),
            townFromId: matchIntParam(/townFrom=([-]?[\d]+)/),
            price: matchIntParam(/price=([\d]+)/),
            nights: matchIntParam(/nights=([\d]*)/),
            adults: matchIntParam(/adults=([\d]*)/),
            kids: matchIntParam(/kids=([\d]*)/),
            kid1: matchIntParam(/kid1=([\d]*)/),
            kid2: matchIntParam(/kid2=([\d]*)/),
            kid3: matchIntParam(/kid3=([\d]*)/),
            townId: matchIntParam(/town=([\d]+)/),
            currencyAlias: matchParam(/currency=([a-z]+)/i) as currency,
            vkGroupId: matchIntParam(/vkGroupId=([\d]*)/),
            tourFormRequiredFields: matchIntParam(/tourFormRequiredFields=([\d]*)/),
            moduleType: matchParam(/moduleType=([a-z]+)/i) as ModuleTypes | null,
            flightId: matchIntParam(/flightId=([\d]*)/),
        },
        themeName: 'default',
        config: {
            agencyContact1: {
                logo: 'http://yandex.st/morda-logo/i/logo.png',
                phone: '+7 (921) 992-22-92',
                email: 'rodzewich@sletat.ru',
                header: 'Заголовок 1',
                content: '<div><p class="my-class"><strong style="color: red;">Жирный</strong> <em>курсив</em></p></div>'
            },
            usePricePerson: true, // false // no it's not
            useFakeDiscount: false,
            fakeDiscount: 0,
            useManyOffices: true,
            useCard: true,
            isSocialNetworkSharingEnabled: true,
            isVisibleCompare: true,
            useComparison: true,
            isTripAdvisorCommentsEnabled: true,
            commentsAvailable: true,
            punycodeHostname: '',
            buyingType: 'online',
            target: 'module-5.0',
            useOrder: true,
            useTitle: true,
            files: [],
            customStyles: '',
            leadHubToken: null
        }
    };
}

entryPoint(getEntryPointParams(url));
