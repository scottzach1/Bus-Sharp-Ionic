import React, {FC, useState} from "react";
import {GoogleMap, InfoWindow, Marker, Polyline, useLoadScript} from "@react-google-maps/api";
import {IonIcon, IonToast} from "@ionic/react";
import {locationSharp} from "ionicons/icons";
import "./GoogleMapWidget.css";
import {mapStyles} from "./GoogleMapWidgetStyles";
import {getLatLng} from "react-places-autocomplete";
import {getSavedStops} from "../../../external/StorageManager";
import LoadingSpinner from "../ui/LoadingSpinner";

interface Props {
    stopMarkers: StopMarker[] | null,
    routePaths: ServiceRoute[] | null,
    geoCoderResult?: google.maps.GeocoderResult,
}

const libraries = ["places"];


/**
 * Options for the map-tab to allow for zoom and movement on the map-tab.
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
 * Location where the map-tab is centered
 */
const center = {
    lat: -41.286461,
    lng: 174.776230,
}

// Global variables that allow for changing state without re-rendering the object
let selectedId = "";
let mapRef: google.maps.Map | null = null;

// STICK AROUND LOCATION TO ENSURE THEY DON'T RE-RENDER
let userLocation: StopMarker | null = null
let searchLocation: StopMarker | undefined = undefined

let routeLoaded = false
let googleLoaded = false;
let stopOneLoaded = false;

const GoogleMapWidget: FC<Props> = (props) => {
    // ALL STOP DATA
    const [stopData, setStopData] = useState<any | null>(null);

    // TOAST
    const [showToast, setShowToast] = useState<boolean>(false)

    // SELECTED ITEM
    // A StopMarker used to represent the item, maintains information about the selected item.
    const [selectedItem, setSelectedItem] = useState<StopMarker | null>(null)

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    // -------------------------------------------------------------------------------------------------------------
    // CHECKS RUN EVERY RENDER
    // -------------------------------------------------------------------------------------------------------------

// If a new geolocation has been sent through, set that new geolocation to the center
    setSearchLocation()
    if (props.geoCoderResult === undefined) {
        searchLocation = undefined
    }

    if (props.routePaths && !routeLoaded && googleLoaded) {
        if (props.routePaths.length !== 0) {
            let route = props.routePaths[Math.round(props.routePaths.length / 2) - 1]
            let midLoc = route.path[Math.round(route.path.length / 2) - 1]
            selectedId = "Route"
            selectItem(new StopMarker(
                "Route",
                route.key,
                route.key,
                "",
                new Position(midLoc.latitude, midLoc.longitude)))
            routeLoaded = true
        }
    }


    if (props.stopMarkers?.length === 1 && googleLoaded && !stopOneLoaded){
        stopOneLoaded = true
        selectedId = "Stop"
        selectItem(props.stopMarkers[0])
    }


// If the device allows for geolocation, attempt to find the users location
    if (!userLocation && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successfulPosition);
    }

// Get all the stop data
    getStopData().then();


// -------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// -------------------------------------------------------------------------------------------------------------

    /**
     * Asynchronously get the stop data currently available.
     */
    async function getStopData() {
        if (!stopData) setStopData((await getSavedStops())!);
    }

    /**
     * Get the name of a marker on the map-tab. Used when a marker has been clicked on.
     * @param stop - A StopMarker
     */
    function getStopName(stop: StopMarker) {
        if (stop.name) return stop.name;
        else if (stopData[stop.code]) return stopData[stop.code];
        else return stop.code + " - unknown";
    }

    /**
     * Check that the parsed in search location is different to the currently stored location.
     * Returning TRUE means that the search location will be avoided. In this case, returning true is the fail safe
     * method.
     */
    function setSearchLocation() {
        if (props.geoCoderResult === undefined) return

        getLatLng(props.geoCoderResult)
            .then(latLng => {
                if (searchLocation === undefined
                    || searchLocation.location.latitude !== latLng.lat
                    || searchLocation.location.longitude !== latLng.lng) {
                    searchLocation = new StopMarker(
                        null,
                        "SearchLocation",
                        props.geoCoderResult?.formatted_address ? props.geoCoderResult.formatted_address : "",
                        "",
                        new Position(latLng.lat, latLng.lng))
                    selectedId = "Search"
                    selectItem(searchLocation)
                }
            })
    }

    /**
     * A function to create a user location if the geoLocation is successful in getting the current position.
     * @param position - The geoLocation of the user.
     */
    function successfulPosition(position: any) {
        userLocation = new StopMarker(
            "User Location",
            "USR_LOC",
            "USR_LOC",
            undefined,
            new Position(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude), undefined))
        setShowToast(true)
    }


    function selectItem(marker: StopMarker) {
        if (mapRef != null) {
            mapRef.panTo({lat: marker.location.latitude, lng: marker.location.longitude})
        }
        setSelectedItem(marker);
    }

    function deselectItem() {
        selectedId = "";
        setSelectedItem(null)
    }

    function onLoad(map: google.maps.Map<Element> | null) {
        if (map)
            mapRef = map

        googleLoaded = true
    }

// -------------------------------------------------------------------------------------------------------------
// RETURNING MAP
// -------------------------------------------------------------------------------------------------------------

    return (
        <>
            {(loadError || !isLoaded) ? <LoadingSpinner/> :
                <GoogleMap
                    mapContainerClassName={"map"}
                    zoom={16}
                    center={center}
                    options={options}
                    onDragStart={deselectItem}
                    onLoad={(map) => {
                        map && (onLoad(map))
                    }}
                >

                    {userLocation && (
                        <Marker
                            key={userLocation.name}
                            position={{
                                lat: userLocation.location.latitude,
                                lng: userLocation.location.longitude,
                            }}
                            onClick={() => {
                                if (userLocation) {
                                    selectedId = "User"
                                    selectItem(userLocation);
                                }
                            }}
                            icon={{
                                url: "assets/icon/current-location.png",
                                scaledSize: new google.maps.Size(30, 30),
                            }}
                        />
                    )}

                    {props.stopMarkers?.map((marker) => (
                        <Marker
                            key={marker.key}
                            position={{
                                lat: marker.location.latitude,
                                lng: marker.location.longitude,
                            }}
                            onClick={() => {
                                selectedId = "Stop"
                                selectItem(marker)
                            }}
                        />
                    ))}

                    {props.routePaths?.map((route) => (
                        <Polyline
                            key={route.key}
                            path={route.path.map(position => ({
                                lat: position.latitude,
                                lng: position.longitude,
                            }))}
                            options={{strokeColor: route.color}}
                        />
                    ))}

                    {(selectedId === "Stop" && selectedItem) && (
                        <InfoWindow
                            key={selectedItem.key + "-selected"}
                            position={{
                                lat: selectedItem.location.latitude,
                                lng: selectedItem.location.longitude,
                            }}
                            onCloseClick={() => {
                                deselectItem()
                            }}
                        >
                            <div id="selected-stop-popup">
                                <a href={'/stop/' + selectedItem.code}>
                                    <span><IonIcon icon={locationSharp}/></span>
                                    <strong>{getStopName(selectedItem)}</strong>
                                </a>
                            </div>
                        </InfoWindow>
                    )}

                    {(selectedId === "User" && userLocation) && (
                        <InfoWindow
                            key={userLocation.name}
                            position={{
                                lat: userLocation.location.latitude,
                                lng: userLocation.location.longitude,
                            }}
                            onCloseClick={() => {
                                deselectItem()
                            }}
                        >
                            <div id="selected-stop-popup">
                                <span><IonIcon icon={locationSharp}/></span>
                                <strong>{getStopName(userLocation)}</strong>
                            </div>
                        </InfoWindow>
                    )}

                    {(selectedId === "Search" && searchLocation) && (
                        <InfoWindow
                            key={searchLocation.key}
                            position={{
                                lat: searchLocation.location.latitude,
                                lng: searchLocation.location.longitude,
                            }}
                            onCloseClick={() => {
                                deselectItem()
                            }}
                        >
                            <div id="selected-stop-popup">
                                <span><IonIcon icon={locationSharp}/></span>
                                <strong>{searchLocation.key}</strong>
                            </div>
                        </InfoWindow>
                    )}

                </GoogleMap>}

            {(showToast && userLocation) && (
                <IonToast
                    isOpen={true}
                    message={"Your location was found"}
                    buttons={[{
                        text: "Go To",
                        handler: () => {
                            if (userLocation) {
                                selectedId = "User"
                                setShowToast(false)
                                selectItem(userLocation)
                            }
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
        </>
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
