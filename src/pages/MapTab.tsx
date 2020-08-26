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
        urlBuilder.searchParams.append("location", "-41.28646,174.77623")
        urlBuilder.searchParams.append("radius", "200000")
        urlBuilder.searchParams.append("key", process.env.REACT_APP_GOOGLE_MAPS_API_KEY + "")

        fetch(proxy + urlBuilder.href + "&strictbounds")
            .then(results => results.json())
            .then(data => {
                if (data.predictions) {
                    searchResults.current = data.predictions
                }
            })
    }


    function getPredictions() {
        return (
            <IonList>
                {
                    searchResults.current.map((result: any) =>
                        <IonItem key={result.description} onClick={e => {
                            geocodeByAddress(result.description)
                                .then(location => {
                                    setSearchLocation(location[0])
                                })
                            setSearchText("")
                        }}>
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
