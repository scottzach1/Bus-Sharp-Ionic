import React, {Component} from "react";
import {
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
import SubtitleCard from "../components/ui/SubtitleCard";

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
        const filterCondition: boolean = (filter === "STOPS" && item.isStop) || (filter === "ROUTES" && !item.isStop) || filter === "ALL" || filter === "EXACT";
        return searchText.length
            && filterCondition
            && ((filter === "ALL" && item.searchText.toLowerCase().includes(searchText.toLowerCase()))
                || (filter === "EXACT" && item.searchText.toLowerCase().startsWith(searchText.toLowerCase())))
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
                    {(results && !this.state.searchText) && <SubtitleCard key={"SearchBar-Card"}
                                                                          title={"SearchBar:"}
                                                                          contents={["Using the searchbar above, you can search for Stops and Bus Routes.",
                                                                              "Stops: Stops are defined by their Stop ID",
                                                                              "E.g. '5008'",
                                                                              "Routes: Bus Routes are defined by their Bus ID",
                                                                              "E.g. '2'"]}/>}
                    {(results && !this.state.searchText) && <SubtitleCard key={"Tab-Card"}
                                                                          title={"Tabs:"}
                                                                          contents={["The tabs underneath the search bar allow you to define what search results are represent to you.",
                                                                              "All: Show both Stops and Bus Routes/Services",
                                                                              "Routes: Show just Bus Routes/Services.",
                                                                              "Stops: Show just Stops",
                                                                              "Exact: Show all Stop and Bus Routes/Services that start with the search query."]}/>}

                    {(routeCards && routeCards.length > 0) && (
                        <SubtitleCard key={"Route-Cards"} title={"Routes"} contents={null}/>)}
                    {routeCards}

                    {(stopCards && stopCards.length > 0) && (
                        <SubtitleCard key={"Stop-Cards"} title={"Stops"} contents={null}/>)}
                    {stopCards}

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