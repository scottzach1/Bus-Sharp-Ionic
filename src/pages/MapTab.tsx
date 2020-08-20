import React, {FC, useState} from 'react';
import {IonCard, IonContent, IonHeader, IonItem, IonPage, IonSearchbar, IonTitle, IonToolbar} from '@ionic/react';
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
    const [searchLocation, setSearchLocation] = useState<{ lat: number, lng: number } | undefined>(undefined)

    function handleChange(address: any) {
        setAddress(address);
    }

    function handleSelect(address: any) {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                // console.log('Success', latLng)
                setSearchLocation(latLng);
            })
            .catch(error => console.error('Error', error));
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
                <MetlinkStopsMap selectedLatLng={searchLocation}/>
                {isLoaded && (
                    <PlacesAutocomplete
                        value={address}
                        onChange={handleChange}
                        onSelect={handleSelect}
                        searchOptions={{
                            location: new google.maps.LatLng(-40.702633, 174.515182), // Wellington
                            radius: 100000, // 1000km
                            types: ['address']
                        }}
                        debounce={1000 /* Quick delay to stop search until user temp stopped typing. */}
                    >
                        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                            <div className={"location-search-component"}>
                                <IonSearchbar
                                    value={address}
                                    onIonChange={(e) => {
                                        // Small hack to replace the expected <input/> with an <IonSearchBar/>
                                        getInputProps().onChange({target: {value: e.detail.value!}});
                                    }}
                                    className={"location-search-input"}
                                    autocomplete={"off"}
                                />

                                <div className="autocomplete-dropdown-container">
                                    <IonCard>
                                        {loading && <IonItem>Loading...</IonItem>}
                                        {(document.querySelector('input')?.value === address) && suggestions.map((suggestion) => {
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
                                                    onSelect={() => handleSelect(suggestion.placeId)}
                                                >
                                                        <span key={key + ' - entry'}>
                                                        {suggestion.description}
                                                        </span>
                                                </IonItem>
                                            )
                                        })}
                                    </IonCard>
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                )}
            </IonContent>
        </IonPage>
    );
}

export default MapTab;
