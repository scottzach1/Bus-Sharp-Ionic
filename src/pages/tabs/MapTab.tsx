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
import {geocodeByAddress} from "react-places-autocomplete";
import MetlinkStopsMap from "../../components/metlink/MetlinkStopsMap";

const libraries = ["places"];

const MapTab: FC = () => {
    const searchResults = useRef<any>(null)
    const searchLocation = useRef<google.maps.GeocoderResult | undefined>(undefined)
    const [searchText, setSearchText] = useState<string>("")

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
                if (data.predictions) searchResults.current = getPredictions(data.predictions);
            })
    }

    function getPredictions(data: any) {
        return (
            <IonList>
                {data.map((result: any) =>
                    <IonItem
                        key={result.description}
                        onClick={() => {
                            geocodeByAddress(result.description).then(location => {
                                searchLocation.current = location[0]
                                setSearchText("")
                            });
                        }}>
                        {result.description}
                    </IonItem>
                )}
            </IonList>
        )
    }

    function getGeolocation() {
        let before = searchLocation.current
        searchLocation.current = undefined;
        return before
    }

    if (loadError) console.error('Failed to load', loadError);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <MetlinkStopsMap geoCoderResult={getGeolocation()}/>
                <IonSearchbar id={"searchbar"} value={searchText} onIonChange={e => setSearchText(e.detail.value!)}/>
                {searchText && (
                    <IonCard>
                        {searchResults.current ? searchResults.current :
                            <IonItem>No Results for "{searchText}"</IonItem>
                        }
                    </IonCard>)
                }
            </IonContent>
        </IonPage>
    );
}

export default MapTab;
