import React, {Component} from "react";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import {Plugins} from '@capacitor/core';
import ListComponent from "../components/ui/ListComponent";

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
        return items
            .filter(item => this.filterItem(item))
            // .sort((a, b) => a.searchText[0].localeCompare(b.searchText[0]))
            .map(item => (
                <ListComponent
                    isStop={item.isStop}
                    code={item.code}
                    title={item.name}
                    key={counter++ + ' - ' + item.name}
                />
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
                                <IonSegmentButton onClick={() => this.setState({filter: "EXACT"})}
                                                  value="EXACT">Exact</IonSegmentButton>
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