import React, {Component} from "react";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import SearchTabSearchbarDescriptionCard from "./SearchTabSearchbarDescriptionCard";
import SearchTabTabsDescriptionCard from "./SearchTabTabsDescriptionCard";
import {getServices, getStops} from "../external/StorageManager";
import ListComponent from "../shared/static/ui/ListComponent";
import LoadingSpinner from "../shared/static/ui/LoadingSpinner";


interface State {
    stopData: SearchItem[] | null,
    serviceData: SearchItem[] | null,
    searchText: string,
    filter: string,
}

class SearchTab extends Component<{}, State> {

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            stopData: null,
            serviceData: null,
            searchText: "",
            filter: "ALL",
        }
    }

    componentDidMount() {
        if (!this.state.stopData) getStops()
            .then(stops => this.setState({stopData: this.parseStopData(stops)}));

        if (!this.state.serviceData) getServices()
            .then(services => this.setState({serviceData: this.parseServiceData(services)}));
    }

    parseStopData(stopData: any[]) {
        let stopItems: SearchItem[] = [];

        for (const attribute in stopData) {
            const stopEntry: any = stopData[attribute];

            const code: string = stopEntry.stop_id;
            const name: string = stopEntry.stop_name;
            if (!name) continue;
            stopItems.push(new SearchItem(code, name, true));
        }

        return stopItems;
    }

    parseServiceData(serviceData: any[]) {
        let serviceItems: SearchItem[] = [];

        for (const attribute in serviceData) {
            const serviceEntry: any = serviceData[attribute];
            const code: string = serviceEntry.route_short_name;
            if (!code) continue;
            const name: string = '(' + serviceEntry.agency_id + ') - ' + serviceEntry.route_long_name;

            serviceItems.push(new SearchItem(code, name, false));
        }

        return serviceItems;
    }

    filterItem(item: SearchItem) {
        const filter: string = this.state.filter
        const searchText: string = this.state.searchText.toLowerCase();

        if ((filter === "STOPS" && !item.isStop) || (filter === "ROUTES" && item.isStop))
            return false

        if (filter && searchText.length) {
            for (const key of item.searchText) {
                if ((filter !== "EXACT") ? key.includes(searchText) : key.startsWith(searchText))
                    return true;
            }
        }
        return false;
    }


    generateCards(items: SearchItem[]) {
        let counter: number = 0;
        let cards: any = items.filter(item => this.filterItem(item));

        let totalCount = cards.length;

        cards = cards
            // Limit to 50 cards
            .slice(0, Math.min(items.length, 51))
            .map((item: SearchItem) =>
                <ListComponent
                    isStop={item.isStop}
                    code={item.code}
                    title={item.name}
                    key={counter++ + ' - ' + item.name}
                />);

        if (cards.length === 51) {
            cards[50] = <IonItem><IonLabel>Hit 50 limit! ({(totalCount - counter)} remaining).</IonLabel></IonItem>
        }

        return cards;
    }

    render() {
        let stopCards: any[] | null = (this.state.stopData) ? this.generateCards(this.state.stopData) : null;
        const routeCards: any[] | null = (this.state.serviceData) ? this.generateCards(this.state.serviceData) : null;
        const results: boolean = Boolean(stopCards && routeCards);

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            Search for Buses and Stops
                        </IonTitle>
                    </IonToolbar>
                    <IonToolbar>
                        <IonSearchbar value={this.state.searchText}
                                      onIonChange={e => this.setState({searchText: e.detail.value!})}/>
                    </IonToolbar>
                    <IonToolbar>
                        <IonSegment value={this.state.filter}>
                            <IonSegmentButton onClick={() => this.setState({filter: "ALL"})}
                                              value="ALL">All</IonSegmentButton>
                            <IonSegmentButton onClick={() => this.setState({filter: "ROUTES"})}
                                              value="ROUTES">Routes</IonSegmentButton>
                            <IonSegmentButton onClick={() => this.setState({filter: "STOPS"})}
                                              value="STOPS">Stops</IonSegmentButton>
                            <IonSegmentButton onClick={() => this.setState({filter: "EXACT"})}
                                              value="EXACT">Exact</IonSegmentButton>
                        </IonSegment>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    {!results && <LoadingSpinner/>}

                    {(results && !this.state.searchText) && (
                        <div>
                            <SearchTabSearchbarDescriptionCard/>
                            <SearchTabTabsDescriptionCard/>
                        </div>
                    )}

                    {(routeCards && routeCards.length > 0) && (
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Routes:</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                {routeCards}
                            </IonCardContent>
                        </IonCard>
                    )}

                    {(stopCards && stopCards.length > 0) && (
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Stops:</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                {stopCards}
                            </IonCardContent>
                        </IonCard>
                    )}

                </IonContent>
            </IonPage>
        );
    }
}

class SearchItem {
    searchText: string[];
    code: string;
    name: string;
    isStop: boolean;

    constructor(code: string, name: string, isStop: boolean) {
        this.searchText = [code.toLowerCase(), name.toLowerCase()];
        this.isStop = isStop;
        this.name = name;
        this.code = code;
    }
}

export default SearchTab;
