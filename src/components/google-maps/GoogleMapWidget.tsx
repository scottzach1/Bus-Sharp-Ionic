import React, {FC, useState} from "react";
import {GoogleMap, InfoWindow, Marker, Polyline, useLoadScript} from "@react-google-maps/api";
import {IonIcon} from "@ionic/react";
import {locationSharp} from "ionicons/icons";

interface Props {
    stopMarkers: StopMarker[] | null,
    routePaths: ServiceRoute[] | null,
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

const GoogleMapWidget: FC<Props> = ({stopMarkers, routePaths}) => {
    const [selectedStop, setSelectedStop] = useState<StopMarker | null>();

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    // Separate returns here to stop 'too many reloads' error.
    if (loadError) return (<p>"Error: load error"</p>)
    if (!isLoaded) return (<p>"Error: not loaded"</p>)

    return (
        <div className={"google-map-widget"}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={16}
                center={center}
                options={options}
                onClick={event => {
                    console.log(event);
                }}
            >
                {stopMarkers?.map((marker) => (
                    <Marker
                        key={marker.key}
                        position={{
                            lat: marker.location.latitude,
                            lng: marker.location.longitude,
                        }}
                        onClick={() => {
                            setSelectedStop(marker);
                        }}
                    />
                ))}

                {routePaths?.map((route) => (
                    <Polyline
                        key={route.key}
                        path={route.path.map(position => ({
                            lat: position.latitude,
                            lng: position.longitude,
                        }))}
                        options={{strokeColor: route.color}}
                    />
                ))}

                {selectedStop && (
                    <InfoWindow
                        key={selectedStop.key + "-selected"}
                        position={{
                            lat: selectedStop.location.latitude,
                            lng: selectedStop.location.longitude,
                        }}
                        onCloseClick={() => {
                            setSelectedStop(null);
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
    )
}

class ServiceRoute {
    public key: string;
    public color: string;
    public path: Position[];

    /**
     * Creates a new route to be rendered by the GoogleMapWidget.
     * @param key
     * @param color
     * @param path
     */
    constructor(key: string, color: string, path: Position[]) {
        this.key = key;
        this.color = color;
        this.path = path;
    }
}

class StopMarker {
    public name: string;
    public code: string;
    public key: string;
    public location: Position;

    /**
     * Creates a new stop marker to be parsed by the GoogleMapWidget.
     * @param name - of the stop.
     * @param code - of the stop.
     * @param key - unique key for the stop.
     * @param lat - (opt) numerical latitude of the marker.
     * @param lng - (opt) numerical longitude of the marker.
     * @param cordString - (opt) string representation of the location. (eg. "-41.3160304,174.7937765,0")
     * @param position - (opt) directly sets the position of the Marker in its raw form.
     */
    constructor(name: string, code: string, key: string, cordString?: string, position?: Position) {
        this.name = name;
        this.code = code;
        this.key = key;

        this.location = (position) ? position : new Position(undefined, undefined, cordString);
    }
}

class Position {
    public latitude: number = NaN;
    public longitude: number = NaN;

    /**
     * Creates a new Position
     * @param lat
     * @param lng
     * @param cordString
     */
    constructor(lat?: number, lng?: number, cordString?: string) {
        if (lat && lng) {
            this.latitude = lat;
            this.longitude = lng;
            return;
        }
        if (cordString) {
            const splitCords: string[] = cordString.split(",");
            this.latitude = parseFloat(splitCords[0]);
            this.longitude = parseFloat(splitCords[1]);
            return;
        }
    }
}

export default GoogleMapWidget;
export {ServiceRoute, StopMarker, Position};