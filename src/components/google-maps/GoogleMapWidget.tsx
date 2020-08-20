import React, {FC, useState} from "react";
import {GoogleMap, InfoWindow, Marker, Polyline, useLoadScript} from "@react-google-maps/api";
import {IonIcon, IonToast} from "@ionic/react";
import {locationSharp} from "ionicons/icons";
import {readRemoteFile} from "react-papaparse";
import "./GoogleMapWidget.css";
import {mapStyles} from "./GoogleMapWidgetStyles";

interface Props {
    stopMarkers: StopMarker[] | null,
    routePaths: ServiceRoute[] | null,
}

const libraries = ["places"];


/**
 * Options for the map to allow for zoom and movement on the map.
 */
const options = {
    disableDefaultUI: true, // Commented for street view.
    styles: mapStyles,
    zoomControl: false,
    streetViewControl: true,
    fullscreenControl: true,
    fullscreenControlOptions: {
        // I believe this isn't recognised by TypeScript as it needs to be in the Maps component.
        // I don't know why, but video I saw said this needed to be outside to stop the page
        // refreshing.
        // https://developers.google.com/maps/documentation/javascript/controls
        position: 9, // 'google.maps.ControlPosition.RIGHT_BOTTOM'
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
        // https://developers.google.com/maps/documentation/javascript/controls
        style: 1, // google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: 6, // 'google.maps.ControlPosition.LEFT_BOTTOM'
    },
}

/**
 * Location where the map is centered
 */
const center = {
    lat: -41.286461,
    lng: 174.776230,
}

const GoogleMapWidget: FC<Props> = ({stopMarkers, routePaths}) => {
    const [stopData, setStopData] = useState<any | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [userLocSelected, setUserLocSelected] = useState<boolean>(false);

    const [selectedStop, setSelectedStop] = useState<StopMarker | null>();
    const [mapLocation, setMapLocation] = useState<{ lat: number, lng: number }>(center)
    const [userLocation, setUserLocation] = useState<StopMarker | undefined>(undefined);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    // Separate returns here to stop 'too many reloads' error.
    if (loadError) return (<p>"Error: load error"</p>)
    if (!isLoaded) return (<p>"Error: not loaded"</p>)

    /**
     * Asynchronously get the stop data currently available.
     */
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

    /**
     * Attempt to get the geo-location of the device accessing the map, and set the current position of the center
     * of the map to this location.
     */
    function getLocation() {
        if (userLocation == null && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successfulPosition);
        }
    }

    /**
     * Upon successfully getting the position of the user, set the center location of the map to this location.
     * @param position - An object the holds the coordinates of the user.
     */
    function successfulPosition(position: any) {
        setUserLocation(new StopMarker(
            "User Location",
            "USR_LOC",
            "USR_LOC",
            undefined,
            new Position(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude), undefined)))
        setShowToast(true)
    }

    /**
     * Get the name of a marker on the map. Used when a marker has been clicked on.
     * @param stop - A StopMarker
     */
    function getStopName(stop: StopMarker) {
        if (stop.name) return stop.name;
        else if (stopData[stop.code]) return stopData[stop.code];
        else return stop.code + " - unknown";
    }

    /**
     * Get all the stop data asap.
     */
    getStopData().then();
    getLocation()

    return (
        <div>
            <GoogleMap
                mapContainerClassName={"map"}
                zoom={16}
                center={mapLocation}
                options={options}
                onClick={event => {
                    console.log(event);
                }}
            >

                {(userLocation?.location) && (
                    <Marker
                        key={userLocation.name}
                        position={{
                            lat: userLocation.location.latitude,
                            lng: userLocation.location.longitude,
                        }}
                        onClick={() => setUserLocSelected(true)}
                        icon={{
                            url: "assets/icon/current-location.png",
                            scaledSize: new google.maps.Size(30, 30),
                        }}
                    />
                )}

                {stopMarkers?.map((marker) => (
                    <Marker
                        key={marker.key}
                        position={{
                            lat: marker.location.latitude,
                            lng: marker.location.longitude,
                        }}
                        onClick={() => {
                            setSelectedStop(marker);
                            setMapLocation({lat: marker.location.latitude, lng: marker.location.longitude})
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

                {(userLocSelected && userLocation) && (
                    <InfoWindow
                        key={userLocation.name}
                        position={{
                            lat: userLocation.location.latitude,
                            lng: userLocation.location.longitude,
                        }}
                        onCloseClick={() => {
                            setUserLocSelected(false);
                        }}
                    >
                        <div id="selected-stop-popup">
                            <span><IonIcon icon={locationSharp}/></span>
                            <strong>{getStopName(userLocation)}</strong>
                        </div>
                    </InfoWindow>
                )}

            </GoogleMap>

            {(userLocation && showToast) && (
                <IonToast
                    isOpen={true}
                    message={"Your location was found"}
                    buttons={[{
                        text: "Go To",
                        handler: () => {
                            setMapLocation({
                                lat: userLocation?.location.latitude,
                                lng: userLocation?.location.longitude
                            })
                            setShowToast(false)
                        }
                    }, {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            setShowToast(false)
                        }
                    }]}
                />
            )}
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