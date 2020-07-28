import React, {FC, useState} from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonButton,
    IonRouterOutlet, IonTabs, IonSegment, IonLabel, IonSegmentButton
} from "@ionic/react";
import {readRemoteFile} from "react-papaparse";
import {IonReactRouter} from "@ionic/react-router";

const SearchTab: FC = () => {
    const [searchText, setSearchText] = useState<string>('')
    const [filter, setFilter] = useState<string>("ALL")
    const [stopData, setStopData] = useState<any[] | null>(null);
    const [routeData, setRouteData] = useState<any[] | null>(null);

    async function getStopData() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "http://transitfeeds.com/p/metlink/22/latest/download/stops.txt";

        // Read Remote CSV.
        readRemoteFile(proxy + url, {
            download: true,
            header: true,
            complete: (results: any) => {
                setStopData(results)
            },
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
                setRouteData(results)
            },
        })
    }

    if (!stopData) getStopData()
    if (!routeData) getRouteData()


    function getStopLabels(){

    }

    function getRouteLabels(){

    }

    function getAllLabels(){

        console.log()
        console.log(routeData)
    }

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

                <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} inputMode="numeric"/>

                <IonSegment>
                    <IonSegmentButton onClick={e=>setFilter("ALL")}>All</IonSegmentButton>
                    <IonSegmentButton onClick={e=>setFilter("ROUTES")}>Routes</IonSegmentButton>
                    <IonSegmentButton onClick={e=>setFilter("STOPS")}>Stops</IonSegmentButton>
                </IonSegment>

                {
                    getAllLabels()
                }

            </IonContent>
        </IonPage>
    )
}

export default SearchTab;