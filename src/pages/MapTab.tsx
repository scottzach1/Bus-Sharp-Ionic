import React, {FC, useRef, useState} from 'react';
import {
    IonCard,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {useLoadScript} from "@react-google-maps/api";
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import MetlinkStopsMap from "../components/metlink/MetlinkStopsMap";
import {readRemoteFile} from "react-papaparse";
import {type} from "os";
import {map} from "ionicons/icons";

const libraries = ["places"];

const MapTab: FC = () => {
    const rerenderSearch = useRef<boolean>(false)
    const [searchResults, setSearchResults] = useState<any>(null)
    const searchText = useRef<string>("")
    const [searchLocation, setSearchLocation] = useState<google.maps.GeocoderResult | undefined>(undefined)

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    function setSearch(event: CustomEvent) {
        searchText.current = event.detail.value!
        rerenderSearch.current = true
        let proxy = "https://cors-anywhere.herokuapp.com/";
        let urlBuilder = new URL("https://maps.googleapis.com/maps/api/place/autocomplete/json")
        urlBuilder.searchParams.append("input", searchText.current)
        urlBuilder.searchParams.append("types", "address")
        urlBuilder.searchParams.append("location", "-41.28646,174.77623")
        urlBuilder.searchParams.append("key", process.env.REACT_APP_GOOGLE_MAPS_API_KEY + "")

        fetch(proxy + urlBuilder.href)
            .then(results => results.json())
            .then(data => {
                rerenderSearch.current = false
                if (data.predictions) {
                    setSearchResults(data.predictions)
                }
            })
    }


    function getPredictions() {
        return (
            <IonList>
                {
                    searchResults.map((result: any) =>
                        <IonItem key={result.description}>
                            {result.description}
                        </IonItem>
                    )
                }
            </IonList>
        )
    }


    if (loadError) console.log(loadError);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <MetlinkStopsMap geoCoderResult={searchLocation}/>
                <IonSearchbar id={"searchbar"} value={searchText.current} onIonChange={e => searchText.current = e.detail.value!}/>
                {searchResults && (
                    <IonCard> {getPredictions()} </IonCard>
                )}
            </IonContent>
        </IonPage>
    );
}

export default MapTab;
