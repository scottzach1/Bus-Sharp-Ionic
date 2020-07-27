import React, {FC, useState} from 'react';
import GoogleMapWidget, {Position, ServiceRoute, StopMarker} from "../google-maps/GoogleMapWidget";

interface Props {
    serviceCode: string;
}

const MetlinkServiceView: FC<Props> = ({serviceCode}) => {
    const [serviceName, setServiceName] = useState<string | null>(null);
    const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);
    const [serviceRoutes, setServiceRoutes] = React.useState<ServiceRoute[]>([]);
    const [stopMarkers, setStopMarkers] = React.useState<StopMarker[]>([])
    const [errorMessage, setErrorMessage] = useState<string>()

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
                const name = point.Sms;
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

    getRouteData().then();

    return (
        <div className={"metlink-service-view"}>
            <p>Service: {serviceCode} {serviceName && ("(" + serviceName + ")")}</p>
            {errorMessage && (
                errorMessage
            )}
            <GoogleMapWidget stopMarkers={stopMarkers} routePaths={serviceRoutes}/>
        </div>
    );
}

export default MetlinkServiceView;