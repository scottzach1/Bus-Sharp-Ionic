import React, {FC, useState} from "react";
import GoogleMapWidget, {Position, StopMarker} from "../google-maps/GoogleMapWidget";
import LoadingSpinner from "../ui/LoadingSpinner";
import {getStops} from "../../services/StorageManager";

interface Props {
}

const MetlinkStopsMap: FC<Props> = () => {
    const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);
    const [stopMarkers, setStopMarkers] = React.useState<StopMarker[]>([]);

    if (!dataIsLoaded) getStops().then(stops => {
        generateMapMarkers(stops);
        setDataIsLoaded(true);
    })

    function generateMapMarkers(data: any) {
        let parsedMarkers: StopMarker[] = [];

        for (const stopCode in data) {
            if (!data.hasOwnProperty(stopCode)) {
                console.error('Missing stop: ' + stopCode);
                continue;
            }
            const stop: any = data[stopCode];
            const name: string = stop.stop_id + ' - ' + stop.stop_name;
            const key: string = stop.stop_id;
            const code: string = stop.stop_id;
            const location: Position = new Position(
                parseFloat(stop.stop_lat), parseFloat(stop.stop_lon), undefined
            );

            parsedMarkers.push(
                new StopMarker(
                    name, code, key, undefined, location
                )
            );
        }

        setStopMarkers(parsedMarkers);
    }

    return (
        <div className="metlink-stop-map">
            {!dataIsLoaded && (
                <LoadingSpinner/>
            )}
            {dataIsLoaded && (
                <GoogleMapWidget stopMarkers={stopMarkers} routePaths={null}/>)
            }
        </div>
    );
}

export default MetlinkStopsMap;