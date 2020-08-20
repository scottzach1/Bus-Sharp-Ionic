import React, {FC, useState} from 'react';
import {IonHeader, IonItem, IonPage, IonSearchbar, IonTitle, IonToolbar} from '@ionic/react';
import {useLoadScript} from "@react-google-maps/api";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import MetlinkStopsMap from "../components/metlink/MetlinkStopsMap";

const libraries = ["places"];

const MapTab: FC = () => {
    const [address, setAddress] = useState<string>('');

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    function handleChange(address: any) {
        setAddress(address);
    }

    function handleSelect(address: any) {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    }

    if (loadError) console.log(loadError);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonTitle>
                        {isLoaded && (
                            <PlacesAutocomplete
                                value={address}
                                onChange={handleChange}
                                onSelect={handleSelect}
                            >
                                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                    <div>
                                        <IonSearchbar
                                            value={address}
                                            onIonChange={(e) => {
                                                setAddress(e.detail.value!);
                                                getInputProps().onChange({target: {value: e.detail.value!}});
                                            }}
                                            className={"location-search-input"}
                                            autocomplete={"off"}
                                        />

                                        <div className="autocomplete-dropdown-container">
                                            {suggestions.map((suggestion) => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                                                    : {backgroundColor: '#ffffff', cursor: 'pointer'};

                                                const key: string = suggestion.index + ' - ' + suggestion.id;
                                                return (
                                                    <IonItem
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                        key={key + ' - container'}
                                                    >
                                                        <span
                                                            key={key + ' - entry'}>
                                                        {suggestion.description}
                                                        </span>
                                                    </IonItem>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        )}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <MetlinkStopsMap/>
        </IonPage>
    );
}

class Coordinates {
    public lon: number;
    public lat: number;

    constructor(lon: number, lat: number) {
        this.lon = lon;
        this.lat = lat;
    }
}

export default MapTab;
