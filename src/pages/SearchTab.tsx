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
import LoadingSpinner from "../components/ui/LoadingSpinner";
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;


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
        if (!this.state.stopData) Storage.get({key: 'stops'}).then(res => {
            if (res.value) this.setState({
                stopData: this.parseStopData(JSON.parse(res.value))
            });
        }).catch(e => console.log(e));

        if (!this.state.serviceData) Storage.get({key: 'services'}).then(res => {
            if (res.value) this.setState({
                serviceData: this.parseServiceData(JSON.parse(res.value))
            });
        }).catch(e => console.log(e));
    }

    parseStopData(stopData: any[]) {
        let stopItems: SearchItem[] = [];

        for (const attribute in stopData) {
            const stopEntry: any = stopData[attribute];

            const code: string = stopEntry.stop_id;
            const searchText: string = stopEntry.stop_id + ' - ' + stopEntry.stop_name;

            stopItems.push(new SearchItem(searchText, code, true));
        }
        return stopItems;
    }

    parseServiceData(serviceData: any[]) {
        let serviceItems: SearchItem[] = [];

        for (const attribute in serviceData) {
            const serviceEntry: any = serviceData[attribute];
            const code: string = serviceEntry.route_short_name;
            if (!code) continue;
            const searchText: string = serviceEntry.route_short_name + ' - (' + serviceEntry.agency_id + ') - ' + serviceEntry.route_long_name;

            serviceItems.push(new SearchItem(searchText, code, false));
        }
        return serviceItems;
    }

    filterItem(item: SearchItem) {
        const filter: string = this.state.filter
        const searchText: string = this.state.searchText;
        const filterCondition: boolean = (filter === "STOPS" && item.isStop) || (filter === "ROUTES" && !item.isStop) || filter === "ALL";
        return searchText.length && filterCondition && item.searchText.toLowerCase().includes(searchText.toLowerCase())
    }


    generateCards(items: SearchItem[]) {
        return items
            .filter(item => this.filterItem(item))
            .sort((a, b) => a.searchText.localeCompare(b.searchText))
            .map(item => (
                <IonItem key={item.searchText} href={item.url}>
                    <IonLabel>
                        {item.searchText}
                    </IonLabel>
                </IonItem>
            ));
    }

    render() {
        const stopCards: any[] | null = (this.state.stopData) ? this.generateCards(this.state.stopData) : null;
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
                        <IonTitle>
                            <IonSearchbar value={this.state.searchText}
                                          onIonChange={e => this.setState({searchText: e.detail.value!})}/>
                            <IonSegment value={this.state.filter}>
                                <IonSegmentButton onClick={() => this.setState({filter: "ALL"})}
                                                  value="ALL">All</IonSegmentButton>
                                <IonSegmentButton onClick={() => this.setState({filter: "ROUTES"})}
                                                  value="ROUTES">Routes</IonSegmentButton>
                                <IonSegmentButton onClick={() => this.setState({filter: "STOPS"})}
                                                  value="STOPS">Stops</IonSegmentButton>
                            </IonSegment>
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Search</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    {!results && <LoadingSpinner/>}

                    {(results && !this.state.searchText) && (
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Searching:</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Using the searchbar above, enter Stop numbers of Bus Route/Service
                                numbers. <br/><br/>
                                You will be presented with everything related to your search query (depending on
                                the filters you have in place). <br/><br/>
                                Clicking on one of the links presented to you will take you to a page with all the
                                information you will need about the Stop or Route/Service.
                            </IonCardContent>
                        </IonCard>
                    )}

                    {(results && !this.state.searchText) && (
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Tabs:</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Below the searchbar is four tabs. These tabs act as filters for your search.<br/>
                                <ul>
                                    <li>
                                        <strong>All:</strong> The All tab will present you with everything remotely
                                        related to your search. Don't remember the entire Stop number? Type into the
                                        searchbar what you do remember and scroll through the contents presented to you
                                        to find the related Stop or Route/Service.
                                    </li>
                                    <br/>
                                    <li>
                                        <strong>Routes:</strong> The Routes tab will present you with every bus route
                                        remotely related to your search. For example, typing in "2" will present you
                                        with bus routes 112, 12, 120, 121, 12e, 2, 20...
                                    </li>
                                    <br/>
                                    <li>
                                        <strong>Stops:</strong> The Stops tab will present you with every Stop remotely
                                        related to your search. For example, typing in "500" will present you with bus
                                        stops 1500, 2500, 3500, 4500, 5000, 5002...
                                    </li>
                                    <br/>
                                    <li>
                                        <strong>Exact:</strong> The exact tab will present you with everything that
                                        starts with your search query. For example, typing in "500" will present you
                                        with bus stops 5000, 5002, 5006, 5008. No bus routes start with "500" so none
                                        will be presented in the search. This is a faster, more precise method of
                                        finding a stop or bus service that you want.
                                    </li>
                                </ul>
                            </IonCardContent>
                        </IonCard>
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
    searchText: string;
    url: string;
    isStop: boolean;

    constructor(searchText: string, code: string, isStop: boolean) {
        this.searchText = searchText;
        this.url = ((isStop) ? "/stop/" : "/service/") + code.toLowerCase();
        this.isStop = isStop;
    }
}

export default SearchTab;