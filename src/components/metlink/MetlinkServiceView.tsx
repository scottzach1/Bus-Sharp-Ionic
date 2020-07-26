import React, {FC, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, Polyline, useLoadScript} from "@react-google-maps/api";
import {IonIcon} from "@ionic/react";
import {locationSharp} from "ionicons/icons";

interface Props {
    serviceCode: string;
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

const MetlinkServiceView: FC<Props> = ({serviceCode}) => {
    const [serviceName, setServiceName] = useState<string | null>(null);
    const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);
    const [selectedStop, setSelectedStop] = useState<any | null>();
    const [selectedStopName, setSelectedStopName] = useState<string>("");
    const [routePath, setRoutePath] = React.useState<any[]>([]);
    const [stopMarkers, setStopMarkers] = React.useState<any[]>([])
    const [errorMessage, setErrorMessage] = useState<string>()

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    // Separate returns here to stop 'too many reloads' error.
    if (loadError) return (<p>"Error: load error"</p>)
    if (!isLoaded) return (<p>"Error: not loaded"</p>)

    async function getRouteData() {
        if (dataIsLoaded) return;
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "https://www.metlink.org.nz/api/v1/ServiceMap/";

        fetch(proxy + url + serviceCode)
            .then(resp => {
                if (!resp.ok) setErrorMessage(resp.statusText);
                else Promise.resolve(resp.json())
                    .then(data => {
                        setServiceName(data.Name);
                        setDataIsLoaded(true);
                        generateMapRoute(data);
                    });
            });
    }

    function generateMapRoute(mapData: any) {
        // Buffer for calculated map elements.
        let parsedRoutes: any[] = [];
        let parsedMarkers: any[] = [];

        if (routePath.length === 0) {
            // Pre-calculate values, update prop after.
            let counter: number = 0;
            for (const route of mapData.RouteMaps) {
                let parsedRoute: any[] = [];

                for (const point of route.Path) {
                    const location: string[] = point.split(",");

                    parsedRoute.push({
                        lat: parseFloat(location[0]),
                        lng: parseFloat(location[1]),
                    });
                }

                parsedRoutes.push(
                    <Polyline
                        key={"route:" + serviceCode + "-path:" + counter++}
                        path={parsedRoute}
                        options={{strokeColor: "#e076b4"}}
                    />
                );
            }
        }

        if (stopMarkers.length === 0) {
            // Pre-calculate values, update prop after.
            for (const point of mapData.StopLocations) {
                const location: string[] = point.LatLng.split(",");
                const stopCode: string = point.Sms;

                const marker = {
                    position: {
                        lat: parseFloat(location[0]),
                        lng: parseFloat(location[1]),
                    },
                    code: stopCode,
                    key: ('stop-' + stopCode)
                }

                // Set the onclick to select itself (requires separate declaration and assignment).
                parsedMarkers.push(marker);
            }
        }

        // Set prop values at same time here to avoid reload between calculations.
        if (routePath.length === 0) setRoutePath(parsedRoutes);
        if (stopMarkers.length === 0) setStopMarkers(parsedMarkers);
    }

    async function updateStopName(stopCode: string | number) {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "https://www.metlink.org.nz/api/v1/StopSearch/";

        const stopName: string = await fetch(proxy + url + stopCode)
            .then(resp => {
                if (!resp.ok) return setSelectedStop(() => stopCode + " - unknown")
                else return Promise.resolve(resp.json())
                    .then(data => {
                        return data[0].Name
                    });
            });

        setSelectedStopName(stopName);
    }

    getRouteData().then();

    return (
        <div className={"metlink-service-view"}>
            <p>Service: {serviceCode} {serviceName && ("(" + serviceName + ")")}</p>
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
                {routePath && (
                    routePath
                )}

                {stopMarkers.map((marker) => (
                    <Marker
                        key={marker.key}
                        position={{
                            lat: marker.position.lat,
                            lng: marker.position.lng
                        }}
                        onClick={() => {
                            setSelectedStop(marker);
                            setSelectedStopName("");
                            updateStopName(marker.code).then();
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
                            setSelectedStopName("cleared");
                        }}
                    >
                        <div itemID="selected-stop-popup">
                            <IonIcon icon={locationSharp}/>
                            <strong>{selectedStopName}</strong>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}

export default MetlinkServiceView;