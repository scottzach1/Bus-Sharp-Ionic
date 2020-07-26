import React, {FC, useState} from 'react';
import {GoogleMap, Marker, Polyline, useLoadScript} from "@react-google-maps/api";

interface Props {
    serviceCode: string;
}

const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
};
const center = {
    lat: -41.286461,
    lng: 174.776230,
}
const options = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
}

const MetlinkServiceView: FC<Props> = ({serviceCode}) => {
    const [serviceData, setServiceData] = useState<any | null>(null);
    // const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [routePath, setRoutePath] = React.useState<any[]>();
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
        if (serviceData) return;
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "https://www.metlink.org.nz/api/v1/ServiceMap/";

        fetch(proxy + url + serviceCode)
            .then(resp => {
                if (!resp.ok) setErrorMessage(resp.statusText);
                else Promise.resolve(resp.json())
                    .then(data => {
                        // console.log(data);
                        setServiceData(data);
                        generateMapRoute(data);
                    });
            });
    }

    function generateMapRoute(mapData: any) {
        let parsedRoutes: any[] = [];
        let parsedMarkers: any[] = [];

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
                <Polyline key={"route-" + serviceCode} path={parsedRoute} options={{strokeColor: "#e076b4"}}/>
            );
        }


        for (const point of mapData.StopLocations) {
            const location: string[] = point.LatLng.split(",");
            const stopCode: string = point.Sms;

            parsedMarkers.push(
                <Marker
                    position={{
                        lat: parseFloat(location[0]),
                        lng: parseFloat(location[1]),
                    }}
                    key={'stop-' + stopCode}
                />
            );
        }

        setRoutePath(parsedRoutes);
        setStopMarkers(parsedMarkers);
    }

    getRouteData().then();

    return (
        <div>
            <p>Service Code: {serviceCode}</p>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick={event => {
                    console.log(event);
                }}
            >
                {routePath && (
                    routePath
                )}
                {stopMarkers && (
                    stopMarkers
                )}
            </GoogleMap>
        </div>
    );
}

export default MetlinkServiceView;