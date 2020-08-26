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
    const searchResults = useRef<any>(null)
    const [searchText, setSearchText] = useState<string>("")
    const [searchLocation, setSearchLocation] = useState<google.maps.GeocoderResult | undefined>(undefined)

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    if (searchText) {
        let proxy = "https://cors-anywhere.herokuapp.com/";
        let urlBuilder = new URL("https://maps.googleapis.com/maps/api/place/autocomplete/json")
        urlBuilder.searchParams.append("input", searchText)
        urlBuilder.searchParams.append("types", "address")
        urlBuilder.searchParams.append("location", "-41.28646,174.77623")
        urlBuilder.searchParams.append("key", process.env.REACT_APP_GOOGLE_MAPS_API_KEY + "")
        console.log(urlBuilder.href)

        const response = async () => fetch(proxy + urlBuilder.href)
            .then(results => results.json())
            .then(data => {
                if (data.predictions) {
                    console.log("HERE2")
                    searchResults.current = data.predictions
                }
            })
        response()
    }


    function getPredictions() {
        return (
            <IonList>
                {
                    searchResults.current.map((result: any) =>
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
                <IonSearchbar id={"searchbar"} value={searchText} onIonChange={e => setSearchText(e.detail.value!)}/>
                {searchText && (
                    <IonCard>
                        {searchResults.current && (
                            getPredictions()
                        )}
                        {!searchResults.current && (
                            <IonItem>No Results for "{searchText}"</IonItem>
                        )}
                    </IonCard>)
                }
            </IonContent>
        </IonPage>
    );
}

export default MapTab;
