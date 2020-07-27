import React, {FC, useState} from "react";
import {readRemoteFile} from "react-papaparse";
import GoogleMapWidget, {Position, StopMarker} from "../google-maps/GoogleMapWidget";

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
    const [stopMarkers, setStopMarkers] = React.useState<StopMarker[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        let parsedMarkers: StopMarker[] = [];

        for (const stop of data) {
            const name: string = stop.stop_id + ' - ' + stop.stop_name;
            const key: string = stop.stop_id;
            const code: string = stop.stop_id;
            const location: Position = new Position(
                parseFloat(stop.stop_lat), parseFloat(stop.stop_lon), undefined
            );

            parsedMarkers.push(
                new StopMarker(
                    name, code, key,  undefined, location
                )
            );
        }

        setStopMarkers(parsedMarkers);
    }

    getStopData().then();

    return (
        <div className="metlink-stop-map">
            {errorMessage && (
                errorMessage
            )}
            <GoogleMapWidget stopMarkers={stopMarkers} routePaths={null}/>
        </div>
    );
}

export default MetlinkStopMap;