import React, {FC, useState} from "react";
import GoogleMapWidget, {Position, StopMarker} from "../../../static/google-maps/GoogleMapWidget";
import {getStops} from "../../../../external/StorageManager";

interface Props {
    stopCode: string
}

const MetlinkStopMap: FC<Props> = (props) => {

    const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);
    const [stopMarker, setStopMarker] = React.useState<StopMarker | null>(null);

    if (!dataIsLoaded) getStops().then((stops) => {
        generateMapMarkers(stops[props.stopCode]);
        setDataIsLoaded(true);
    })

    function generateMapMarkers(stop: any) {
        const name: string = stop.stop_id + ' - ' + stop.stop_name;
        const key: string = stop.stop_id;
        const code: string = stop.stop_id;
        const location: Position = new Position(
            parseFloat(stop.stop_lat), parseFloat(stop.stop_lon), undefined
        );

        setStopMarker(new StopMarker(name, code, key, undefined, location));
    }


    return (
        <GoogleMapWidget
            stopMarkers={stopMarker ? [stopMarker] : null}
            routePaths={null}
        />
    );
}

export default MetlinkStopMap;
