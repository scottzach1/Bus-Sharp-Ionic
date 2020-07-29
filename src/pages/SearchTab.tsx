import React, {FC, useState} from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonButton,
    IonRouterOutlet, IonTabs, IonSegment, IonLabel, IonSegmentButton, IonItem, IonList
} from "@ionic/react";
import {readRemoteFile} from "react-papaparse";
import {IonReactRouter} from "@ionic/react-router";
import LoadingSpinner from "../components/ui/LoadingSpinner";

class SearchItem {
    text: string;
    url: string;

    constructor(text: string, url: string) {
        this.text = text;
        this.url = url;
    }
}

const SearchTab: FC = () => {
    const [searchText, setSearchText] = useState<string>('')
    const [filter, setFilter] = useState<string>("ALL")
    const [stopData, setStopData] = useState<any[]>()
    const [routeData, setRouteData] = useState<any[]>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const cards: SearchItem[] = [];

    async function getStopData() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "http://transitfeeds.com/p/metlink/22/latest/download/stops.txt";

        // Read Remote CSV.
        readRemoteFile(proxy + url, {
            download: true,
            header: true,
            complete: (results: any) => {
                setStopData(results.data)
            }
        })
    }

    async function getRouteData() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "http://transitfeeds.com/p/metlink/22/latest/download/routes.txt";

        // Read Remote CSV.
        readRemoteFile(proxy + url, {
            download: true,
            header: true,
            complete: (results: any) => {
                setRouteData(results.data)
            }
        })
    }

    async function generateCards() {
        if (!stopData || !routeData) return

        let count = 0;
        for (const item of stopData) {
            let id: string = item.stop_id;
            let name: string = item.stop_name;
            cards.push(
                <IonItem key={count}>
                    <IonLabel>
                        <strong>{id} -</strong>{name}.
                    </IonLabel>
                </IonItem>
            )
            count++
        }

        for (const item of routeData) {
            let agency: string = item.agency_id;
            let id: string = item.route_id
            let name: string = item.route_long_name;

            if (!checkString(id) || !checkString(name) || !checkString(agency)) continue

            if (id.includes(searchText) || agency.includes(searchText) || name.includes(searchText)) {
                cards.push(
                    <IonItem key={count}>
                        <IonLabel>
                            <strong>{agency} : {id} -</strong> {name}.
                        </IonLabel>
                    </IonItem>
                )
                count++
            }

            setIsLoaded(true)
            return (
                <IonList lines="full">
                    {cards}
                </IonList>
            )
        }
    }


    if (!stopData) getStopData()
    if (!routeData) getRouteData()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Search for Buses and Stops
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Map</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonSearchbar value={searchText} onIonChange={e => {
                    setSearchText(e.detail.value!)
                }} inputMode="numeric"/>

                <IonSegment>
                    <IonSegmentButton onClick={e => setFilter("ALL")}>All</IonSegmentButton>
                    <IonSegmentButton onClick={e => setFilter("ROUTES")}>Routes</IonSegmentButton>
                    <IonSegmentButton onClick={e => setFilter("STOPS")}>Stops</IonSegmentButton>
                </IonSegment>

                {generateCards()}

            </IonContent>
        </IonPage>
    )
}

export default SearchTab;