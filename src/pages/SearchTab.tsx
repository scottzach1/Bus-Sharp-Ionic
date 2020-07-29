import React, {FC, useState} from "react";
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
import {readRemoteFile} from "react-papaparse";
import "./SearchTab.css";
import {IonReactRouter} from "@ionic/react-router";

const SearchTab: FC = () => {
    const [searchText, setSearchText] = useState<string>("")
    const [filter, setFilter] = useState<string>("ALL")

    const [stopData, setStopData] = useState<SearchItem[] | null>(null);
    const [routeData, setRouteData] = useState<SearchItem[] | null>(null);

    const [stopDataLoading, setStopDataLoading] = useState<boolean>(false);
    const [routeDataLoading, setRouteDataLoading] = useState<boolean>(false);

    function getDataCSV(url: string, callback: Function) {
        const proxy = "https://cors-anywhere.herokuapp.com/";

        // Read Remote CSV.
        readRemoteFile(proxy + url, {
            download: true,
            header: true,
            complete: (results: any) => {
                callback(results.data);
            }
        })
    }

    function parseStopData(dataCSV: any[]) {
        let stopItems: SearchItem[] = [];

        for (const stopEntry of dataCSV) {
            const code: string = stopEntry.stop_id;
            const searchText: string = stopEntry.stop_id + ' - ' + stopEntry.stop_name;

            stopItems.push(new SearchItem(searchText, code, true));
        }
        setStopData(stopItems);
    }


    async function parseRouteData(dataCSV: any[]) {
        let routeItems: SearchItem[] = [];

        for (const routeEntry of dataCSV) {
            const code: string = routeEntry.route_id;
            const searchText: string = routeEntry.route_short_name + ' - (' + routeEntry.agency_id + ') - ' + routeEntry.route_long_name;

            routeItems.push(new SearchItem(searchText, code, false));
        }
        setRouteData(routeItems);
    }

    function filterItem(item: SearchItem) {
        const filterCondition: boolean = (filter === "STOPS" && item.isStop) || (filter === "ROUTES" && !item.isStop) || filter === "ALL";
        return searchText.length && filterCondition && item.searchText.toLowerCase().includes(searchText.toLowerCase())
    }

    if (!stopDataLoading) {
        setStopDataLoading(true);
        getDataCSV("http://transitfeeds.com/p/metlink/22/latest/download/stops.txt", parseStopData);
    }
    if (!routeDataLoading) {
        setRouteDataLoading(true);
        getDataCSV("http://transitfeeds.com/p/metlink/22/latest/download/routes.txt", parseRouteData);
    }

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
                        <IonSearchbar value={searchText} onIonChange={e => {
                            setSearchText(e.detail.value!)
                        }} inputMode="numeric"/>

                        <IonSegment value={filter}>
                            <IonSegmentButton onClick={() => setFilter("ALL")} value="ALL">All</IonSegmentButton>
                            <IonSegmentButton onClick={() => setFilter("ROUTES")}
                                              value="ROUTES">Routes</IonSegmentButton>
                            <IonSegmentButton onClick={() => setFilter("STOPS")} value="STOPS">Stops</IonSegmentButton>
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

                {routeData?.filter(item => filterItem(item)).map(item => (
                    <IonItem key={item.searchText}  href={item.url}>
                        <IonLabel>
                            {item.searchText}
                        </IonLabel>
                    </IonItem>
                ))}

                {stopData?.filter(item => filterItem(item)).map(item => (
                    <IonItem key={item.searchText}  href={item.url}>
                        <IonLabel>
                            {item.searchText}
                        </IonLabel>
                    </IonItem>
                ))}

            </IonContent>
        </IonPage>
    );
}

class SearchItem {
    searchText: string;
    url: string;
    isStop: boolean;

    constructor(searchText: string, code: string, isStop: boolean) {
        this.searchText = searchText;
        this.url = ((isStop) ? "/stop/" : "/service/") + code;
        this.isStop = isStop;
    }
}

export default SearchTab;