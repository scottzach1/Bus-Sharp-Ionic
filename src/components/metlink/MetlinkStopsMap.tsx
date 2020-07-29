import React, {FC, useState} from "react";
import {readRemoteFile} from "react-papaparse";
import GoogleMapWidget, {Position, StopMarker} from "../google-maps/GoogleMapWidget";
import LoadingSpinner from "../ui/LoadingSpinner";

interface Props {
}

const MetlinkStopsMap: FC<Props> = () => {
    const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);
    const [stopMarkers, setStopMarkers] = React.useState<StopMarker[]>([]);

    async function getStopData() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "http://transitfeeds.com/p/metlink/22/latest/download/stops.txt";

        // Read Remote CSV.
        readRemoteFile(proxy + url, {
            download: true,
            header: true,
            complete: (results: any) => {
                generateMapMarkers(results.data);
                setDataIsLoaded(true);
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

    if (!dataIsLoaded) getStopData().then();

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