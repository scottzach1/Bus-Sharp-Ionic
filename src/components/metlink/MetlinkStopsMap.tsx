import React, {FC, useState} from "react";
import {readRemoteFile} from "react-papaparse";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";
import {IonIcon} from "@ionic/react";
import {locationSharp} from "ionicons/icons";

interface Props {
}

const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh', // Need to figure out how to get 100% of max container height - no zoom!
};
const center = {
    lat: -41.286461,
    lng: 174.776230,
}
const options = {
    // disableDefaultUI: true, // Commented for street view.
    zoomControl: true,
    mapTypeControl: true,
}

const MetlinkStopMap: FC<Props> = () => {
    const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);
    const [selectedStop, setSelectedStop] = useState<any | null>();
    const [stopMarkers, setStopMarkers] = React.useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })


    // Separate returns here to stop 'too many reloads' error.
    if (loadError) return (<p>"Error: load error"</p>)
    if (!isLoaded) return (<p>"Error: not loaded"</p>)

    async function getStopData() {
        if (dataIsLoaded) return;
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "http://transitfeeds.com/p/metlink/22/latest/download/stops.txt";

        // Read Remote CSV.
        readRemoteFile(proxy + url, {
            download: true,
            header: true,
            complete: (results: any) => {
                setDataIsLoaded(true);
                generateMapMarkers(results.data);
            },
        })

    }

    function generateMapMarkers(data: any) {
        let parsedMarkers: any[] = [];

        for (const stop of data) {
            const marker = {
                position: {
                    lat: parseFloat(stop.stop_lat),
                    lng: parseFloat(stop.stop_lon),
                },
                code: stop.stop_id,
                key: stop.stop_id,
                name: stop.stop_id + ' - ' + stop.stop_name,
            }

            parsedMarkers.push(marker);
        }
        console.log(parsedMarkers);
        setStopMarkers(parsedMarkers);
    }

    getStopData().then();

    return (
        <div className="metlink-stop-map">
            {errorMessage && (
                errorMessage
            )}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={16}
                center={center}
                options={options}
                onClick={event => {
                    console.log(event);
                }}
            >
                {stopMarkers.map((marker) => (
                    <Marker
                        key={marker.key}
                        position={{
                            lat: marker.position.lat,
                            lng: marker.position.lng
                        }}
                        onClick={() => {
                            setSelectedStop(marker);
                        }}
                    />
                ))}

                {selectedStop && (
                    <InfoWindow
                        position={{
                            lat: selectedStop.position.lat,
                            lng: selectedStop.position.lng
                        }}
                        onCloseClick={() => {
                            setSelectedStop(null)
                        }}
                    >
                        <div itemID="selected-stop-popup">
                            <IonIcon icon={locationSharp}/>
                            <strong>{selectedStop.name}</strong>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}

export default MetlinkStopMap;