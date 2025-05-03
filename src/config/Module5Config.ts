/* eslint-disable */
/* eslint-disable prettier/prettier */
import { MetricLogger } from '../utils';


export interface Module5Config {

    /**
     * Признак многоофисности для формы заказа тура.
     */
    useManyOffices: boolean;

    /**
     * Выводится ли цена за человека.
     */
    usePricePerson: boolean;

    /**
     * Необходимо ли использовать скидки.
     */
    useFakeDiscount: boolean;

    /**
     * Значение скидки.
     */
    fakeDiscount: number;

    /**
     * Признак того, что шаринг тура в соц. сетях доступен.
     */
    isSocialNetworkSharingEnabled: boolean;

    /**
     * Признак того, что кнопка сравнения туров в КТ является видимой.
     */
    isVisibleCompare: boolean;

    /**
     * Признак того, что доступна корзина сравнения туров.
     */
    useComparison: boolean;

    /**
     * Признак подключенной услуги "опала по картам".
     */
    useCard: boolean;

    /**
     * Ссылка на оферту агентства
     */
    offerAgreementLink?: string;

    /**
     * Ссылка на положение об обработке персональных данных
     */
    statementOfPersonalDataLink?: string;

    /**
     * Ссылка на политику конфиденциальности агентства
     */
    privacyPolicyLink?: string;

    /**
     * Информация об агентстве.
     */
    agencyContact1?: AgencyContact;

    /**
     * Идентификатор офиса выбранного по умолчанию на форме заказа тура.
     */
    officeId?: number;

    /**
     *  Идентификатор модификатора цены, который будет применен на сервере.
     */
    priceModifierSchemeId?: string;

    /**
     * Признак того, что отзывы tripadvisor должны быть отображены
     */
    isTripAdvisorCommentsEnabled: boolean;

    /**
     * Признак того, что лицензия для комментариев есть
     */
    commentsAvailable: boolean;

    /**
     * Имя текущего хоста в ASCII
     */
    punycodeHostname: string;

    /**
     * Форма обратной связи по умолчанию
     */
    buyingType: string;  // order|card

    /**
     * Идентификатор модуля, открывающего КТ
     */
    target: string;

    /**
     * Признак того, что форма отправки заявки должна отображаться
     */
    useOrder: boolean;

    /**
     * Признак того, что нужно менять title документа на название отеля
     */
    useTitle: boolean;

    /**
     * Список файлов стилей
     */
    files: Array<string>;

    /**
     * Пользовательские inline-стили
     */
    customStyles: string;

    /**
     * MODULES-993: если этот токен передаётся с модуля, то заявка на подбор тура
     * должно идти напрямую в лиды leadhub
     */
    leadHubToken: string | null;

    useTarget?: boolean;

    /**
     * SLT-3197 нужно ли показывать кнопку "Найти похожие туры" в попапе с ненайденным туром
     * (актуально для первой итерации модуля 6)
    * */
    isResearchEnabled?: boolean;

    /**
     * SLT-4473 доступно ли отображение логотипа туроператора в форме онлайн-покупки
     */
    isTourOperatorLogoInBuyOnlineFormVisible?: boolean;

    /**
     * Добавлено для совместимости с МП6.0
     */
    yandexMetrika?: MetricLogger;
}

export interface AgencyContact {

    /**
     * Url до логотипа.
     */
    logo: string;

    /**
     * Телефон агентства.
     */
    phone: string;

    /**
     * Email агентства.
     */
    email: string;

    /**
     * Заголовок.
     */
    header: string;

    /**
     * Некоторый контент.
     * Тут может быть html.
     */
    content: string;

}
