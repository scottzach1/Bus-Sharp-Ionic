import React, {FC, useState} from 'react';
import GoogleMapWidget, {Position, ServiceRoute, StopMarker} from "../../google-maps/GoogleMapWidget";
import {fetchServiceRoutes} from "../../../services/StorageManager";
import ErrorCard from "../../ui/ErrorCard";

interface Props {
    serviceCode: string;
}

const MetlinkServiceView: FC<Props> = ({serviceCode}) => {
    const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);
    const [serviceRoutes, setServiceRoutes] = React.useState<ServiceRoute[]>([]);
    const [stopMarkers, setStopMarkers] = React.useState<StopMarker[]>([])
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    if (!dataIsLoaded) {
        fetchServiceRoutes(serviceCode).then((res) => {
            if (res.data) {
                setDataIsLoaded(true);
                generateMapRoute(res.data);
            }
            setErrorMessage(res.errorMessage);
        })
    }

    function generateMapRoute(mapData: any) {
        // Buffer for calculated map elements.
        let parsedRoutes: ServiceRoute[] = [];
        let parsedMarkers: StopMarker[] = [];

        if (serviceRoutes.length === 0) {
            // Pre-calculate values, update prop after.
            let counter: number = 0;
            for (const route of mapData.RouteMaps) {
                let parsedRoute: Position[] = [];

                const key = "route:" + serviceCode + "-path:" + counter++;
                const strokeColor = "#e076b4";

                for (const point of route.Path) {
                    parsedRoute.push(new Position(undefined, undefined, point));
                }

                parsedRoutes.push(new ServiceRoute(key, strokeColor, parsedRoute));
            }
        }

        if (stopMarkers.length === 0) {
            // Pre-calculate values, update prop after.
            let counter: number = 0;
            for (const point of mapData.StopLocations) {
                const name = null;
                const code = point.Sms;
                const location = point.LatLng;
                const key = "marker:" + code + "-count" + counter++;

                parsedMarkers.push(
                    new StopMarker(
                        name, code, key, location, undefined
                    )
                );
            }
        }

        // Set prop values at same time here to avoid reload between calculations.
        if (serviceRoutes.length === 0) setServiceRoutes(parsedRoutes);
        if (stopMarkers.length === 0) setStopMarkers(parsedMarkers);
    }

    return (
        <>
            <GoogleMapWidget stopMarkers={stopMarkers} routePaths={serviceRoutes}/>
            <ErrorCard errorMessage={errorMessage}/>
        </>
    );
}

export default MetlinkServiceView;