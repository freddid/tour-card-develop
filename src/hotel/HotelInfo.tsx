/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';

import { IFacilityGroup, IWeather } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfoResponse';
import { UiAdaptiveTabs } from 'sletat-uikit2/dist/js/UiAdaptiveTabs';
import { UiMultiContentItem } from 'sletat-uikit2/dist/js/UiAdaptiveTabs/UiBaseMultiContent';


import { HotelTitleStyled } from './HotelTitleStyled';
import { logMetric } from '../utils';
import { AboutHotel } from './AboutHotel';
import { HotelServicesList } from './HotelServicesList';
import { HotelOnMap } from './HotelOnMap';
import { ReviewsWrapper } from './ReviewsWrapper';
import { IFRAME_ID, Target } from '../types-and-consts';
import { smoothScrollDefault } from '../utils/smoothScroll';


export interface HotelInfoProps {
    activeTabIndex: number;
    onActiveTabChange: (tabIdx: number) => void;
    isHotelActualizationSuccess: boolean | null;
    hotelId: number | null;
    hotelName: string | null;
    hotelCategory: string | null;
    hotelDescription: string | null;
    numImages: number | null;
    numHotelRooms: number | null;
    currentWeather: Array<IWeather>;
    hotelAirportDistance: number | null;
    hotelFacilities: Array<IFacilityGroup>;
    hotelLatitude: number | null;
    hotelLongitude: number | null;
    isTripAdvisorCommentsEnabled: boolean;
    isCommentsAvailable: boolean;
    punyCode: string;
    target: Target;
    isMGTModule: boolean;

    onSelectHotelReviews: () => void;
}

export interface HotelInfoState {
    hotelInfoTab: number;
}

export class HotelInfo extends React.Component<HotelInfoProps, HotelInfoState> {

    constructor(props: HotelInfoProps) {
        super(props);

        this.state = {
            hotelInfoTab: 0
        } as HotelInfoState;
    }

    componentWillReceiveProps(newProps: HotelInfoProps) {
        this.setState({
            hotelInfoTab: newProps.activeTabIndex
        } as HotelInfoState);
    }

    render() {
        const getTabsItems = () => {
            const tabsItems: Array<UiMultiContentItem> = [
                {
                    title: <span key="tab-name1">Об отеле</span>,
                    content: (
                        <div key="hotelinfo-tab-1">
                            <AboutHotel
                                hotelId={this.props.hotelId}
                                hotelDescription={this.props.hotelDescription}
                                numImages={this.props.numImages}
                                numHotelRooms={this.props.numHotelRooms}
                                currentWeather={this.props.currentWeather}
                                hotelAirportDistance={this.props.hotelAirportDistance}
                                hotelFacilities={this.props.hotelFacilities}
                                punyCode={this.props.punyCode}
                            />
                        </div>
                    )
                }, {
                    title: <span key="tab-name2">Услуги отеля</span>,
                    content: (
                        <div key="hotelinfotab-2">
                            <HotelServicesList facilities={this.props.hotelFacilities}/>
                        </div>
                    )
                }, {
                    title: <span key="tab-name3">На карте</span>,
                    content: (
                        <div key="hotelinfotab-3">
                            <HotelOnMap
                                hotelId={this.props.hotelId}
                                isMGTModule={this.props.isMGTModule}
                                hotelLatitude={this.props.hotelLatitude}
                                hotelLongitude={this.props.hotelLongitude}
                            />
                        </div>
                    )
                }
            ];

            if (this.props.isCommentsAvailable) {
                tabsItems.push({
                    title: <span key="tab-name4">Отзывы</span>,
                    content: (
                        <div key="hotelinfotab-4">
                            <ReviewsWrapper
                                hotelId={this.props.hotelId}
                                isTripAdvisorCommentsEnabled={this.props.isTripAdvisorCommentsEnabled}
                                target={this.props.target}
                            />
                        </div>
                    )
                });
            }

            return tabsItems;
        };

        return (
            <div>
                <HotelTitleStyled
                    hotelName={this.props.hotelName}
                    hotelCategory={this.props.hotelCategory}
                />
                <UiAdaptiveTabs
                    activeIndex={this.state.hotelInfoTab}
                    items={getTabsItems()}
                    bemModifications={['tour-card']}
                    shouldAnimate={true}
                    onChange={(state) => {
                        this.onChangeHotelInfoTab(state.index);
                    }}
                />
            </div>
        );
    }

    private onChangeHotelInfoTab(index: number) {
        switch (index) {
            case 1: logMetric('click-service'); break;
            case 2: logMetric('click-map'); break;
            case 3:
                logMetric('click-review');
                this.props.onSelectHotelReviews();
                break;
        }
        this.setState({ hotelInfoTab: index } as any, () => {
            const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement;
            const iframeDocument = iframe.contentWindow!.document as Document;
            const element = iframeDocument.querySelectorAll('.uikit-accordion__group-item')[index] as HTMLElement;

            if (element) {
                smoothScrollDefault(element, this.props.target);
            }
            this.props.onActiveTabChange(index);
        });
    }
}
