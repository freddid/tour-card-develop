/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as bemCn from 'bem-cn';
import { observer } from 'mobx-react';
import * as addDays from 'date-fns/addDays';

import { currency } from 'sletat-api-services/lib/types';
import { PrepaymentType } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/GetSettings/PrepaymentSchema';
import { UiRadioList, UiRadioListItem } from 'sletat-uikit2/dist/js/UiRadioList';
import { getCurrencySymbol } from 'sletat-ui-components/lib/Price/utils';
import { numberFormat } from 'sletat-common-utils/lib/format';

import { ComputedPrepaymentSchema } from '../../../models/buy-online';
import { formatDateVerbalWithoutYear } from '../../../utils/date';
import S from '../../../stores';


interface PaymentOptionsProps {
    price: number;
    currency: currency;
    wrapperClass?: string;
}


@observer
export class PaymentOptions extends React.Component<PaymentOptionsProps> {

    render() {
        const blockName = bemCn('payment-options');

        return (
            <div className={blockName.mix(this.props.wrapperClass || '')()}>
                <h3 className={blockName('heading')()}>
                    Способ оплаты
                </h3>
                <UiRadioList
                    inputName={'payment_schema'}
                    radioList={this.prepaymentSchemasRadioItems}
                    checkedValue={String(S.buyOnlineStore.selectedPrepaymentSchemaId)}
                    bemModifications={['prepayment-schema']}
                    onChange={state => {
                        S.buyOnlineStore.setSelectedPrepaymentSchemaId(parseInt(state.checkedValue, 10));
                    }}
                    wrapperClass={blockName('list')()}
                />
                {this.renderActivePrepaymentSchema(blockName)}
            </div>
        );
    }

    renderActivePrepaymentSchema(blockName: bemCn.Inner): JSX.Element | null {
        if (S.buyOnlineStore.selectedPrepaymentSchemaId === -1) {
            return null;
        }

        const activeSchema = S.buyOnlineStore.computedPrepaymentSchemas[
           S.buyOnlineStore.selectedPrepaymentSchemaId
        ];

        return (
            <div className={blockName('active-schema')()}>
                <p className={blockName('active-schema-paragraph')()}>
                    <span className={blockName('active-schema-key')()}>
                         Размер аванса
                    </span>
                    <span className={blockName('active-schema-value-separator')()} />
                    <span className={blockName('active-schema-value')()}>
                        {numberFormat(activeSchema.advance)} {getCurrencySymbol(this.props.currency as any)}
                    </span>
                </p>
                <p className={blockName('active-schema-paragraph')()}>
                    <span className={blockName('active-schema-key')()}>
                        Оставшаяся часть
                    </span>
                    <span className={blockName('active-schema-value-separator')()} />
                    <span className={blockName('active-schema-value')()}>
                        {numberFormat(this.props.price - activeSchema.advance)} {getCurrencySymbol(this.props.currency as any)}
                    </span>
                    <span className={blockName('active-schema-deadline')()}>
                        оплатить&nbsp;
                        <span className={blockName('active-schema-deadline-date')()}>
                            до {formatDateVerbalWithoutYear(addDays(new Date(), activeSchema.daysToPay))}
                        </span>
                    </span>
                </p>
            </div>
        );
    }

    private get prepaymentSchemasRadioItems(): Array<UiRadioListItem> {
        const computePercents = (schema: ComputedPrepaymentSchema) => {
            if (schema.type === PrepaymentType.percent) {
                return schema.percents;
            }

            return Math.round(schema.advance / this.props.price * 100);
        };

        return [
            {
                inputValue: String(-1),
                label: 'Полная оплата'
            },
            ...S.buyOnlineStore.computedPrepaymentSchemas.map((schema, idx) => ({
                inputValue: String(idx),
                label: `Предоплата ${computePercents(schema)}% (${numberFormat(schema.advance)} ${getCurrencySymbol(this.props.currency as any)})`
            })),
        ];
    }
}
