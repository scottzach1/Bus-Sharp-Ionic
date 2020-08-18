import React, {FC, useState} from "react";
import {GoogleMap, InfoWindow, Marker, Polyline, useLoadScript} from "@react-google-maps/api";
import {IonIcon} from "@ionic/react";
import {locationSharp} from "ionicons/icons";
import {readRemoteFile} from "react-papaparse";
import "./GoogleMapWidget.css";

interface Props {
    stopMarkers: StopMarker[] | null,
    routePaths: ServiceRoute[] | null,
}

const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh', // Need to figure out how to get 100% of max container height - no zoom!

};

const options = {
    // disableDefaultUI: true, // Commented for street view.
    zoomControl: true,
    mapTypeControl: true,
}

let center = {
    lat: -41.286461,
    lng: 174.776230,
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successfulPosition);
    }
    return center
}

function successfulPosition(position: any) {
    console.log(position)
    center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
}



const GoogleMapWidget: FC<Props> = ({stopMarkers, routePaths}) => {
    const [selectedStop, setSelectedStop] = useState<StopMarker | null>();
    const [stopData, setStopData] = useState<any | null>(null);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    // Separate returns here to stop 'too many reloads' error.
    if (loadError) return (<p>"Error: load error"</p>)
    if (!isLoaded) return (<p>"Error: not loaded"</p>)

    async function getStopData() {
        if (stopData) return;
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "http://transitfeeds.com/p/metlink/22/latest/download/stops.txt";

        // Read Remote CSV.
        readRemoteFile(proxy + url, {
            download: true,
            header: true,
            complete: (results: any) => {
                let data: any = {};

                for (const stop of results.data) {
                    const name: string = stop.stop_id + ' - ' + stop.stop_name;
                    const code: string = stop.stop_id;
                    data[code] = name;
                }

                setStopData(data);
            },
        })

    }

    getStopData().then();

    function getStopName(stop: StopMarker) {
        if (stop.name) return stop.name;
        else if (stopData[stop.code]) return stopData[stop.code];
        else return stop.code + " - unknown";
    }

    return (
        <div className={"google-map-widget"}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={16}
                center={getLocation()}
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
                        <div id="selected-stop-popup">
                            <a href={'/stop/' + selectedStop.code}>
                                <span><IonIcon icon={locationSharp}/></span>
                                <strong>{getStopName(selectedStop)}</strong>
                            </a>
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
    public name: string | null;
    public code: string;
    public key: string;
    public location: Position;

    /**
     * Creates a new stop marker to be parsed by the GoogleMapWidget.
     * @param name - of the stop (Set to `null` if unknown).
     * @param code - of the stop.
     * @param key - unique key for the stop.
     * @param cordString - (opt) string representation of the location. (eg. "-41.3160304,174.7937765,0")
     * @param position - (opt) directly sets the position of the Marker in its raw form.
     */
    constructor(name: string | null, code: string, key: string, cordString?: string, position?: Position) {
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
     * @param latitude - (opt) number containing the latitude of the marker coordinates.
     * @param longitude - (opt) number containing the longitude of the marker coordinates.
     * @param cordString - (opt) string representation of the location. (eg. "-41.3160304,174.7937765,0")
     */
    constructor(latitude?: number, longitude?: number, cordString?: string) {
        if (latitude && longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
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