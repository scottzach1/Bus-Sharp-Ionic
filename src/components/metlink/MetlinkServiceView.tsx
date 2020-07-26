import React, {FC, useState} from 'react';
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

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
    const [markers, setMarkers] = React.useState<any[]>([]);
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
                        generateMapMarkers(data);
                    });
            });
    }

    function generateMapMarkers(mapData: any) {
        let parsedMarkers: any[] = [];

        console.log(mapData);

        let counter: number = 0;
        for (const point of mapData.RouteMaps[0].Path) {
            const location: string[] = point.split(",");

            parsedMarkers.push(
                <Marker
                    position={{
                        lat: parseFloat(location[0]),
                        lng: parseFloat(location[1]),
                    }}
                    key={counter++ + ':' + location[0] + ',' + location[1]}
                />
            );
        }

        setMarkers(parsedMarkers);
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
                {markers && (
                    markers
                )}
            </GoogleMap>
        </div>
    );
}

export default MetlinkServiceView;