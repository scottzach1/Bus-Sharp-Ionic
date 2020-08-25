import {Plugins} from "@capacitor/core";
import {readRemoteFile} from "react-papaparse";
import firebase from "firebase";

const {Storage} = Plugins;

/* Initialization Methods */

export const initSavedStops = async () => {
    Storage.get({key: 'savedStops'}).then((res) => {
        if (!res.value) Storage.set({key: 'savedStops', value: JSON.stringify([])})
    }).catch(e => console.error(e));
}

export const initSavedServices = async () => {
    Storage.get({key: 'savedServices'}).then((res) => {
        if (!res.value) Storage.set({key: 'savedServices', value: JSON.stringify([])}).then()
    }).catch((e) => console.error(e));
}

const proxy = "https://cors-anywhere.herokuapp.com/";

export const initStops = async () => {
    Storage.get({key: 'stops'}).then((res) => {
        const url = "http://transitfeeds.com/p/metlink/22/latest/download/stops.txt";
        if (!res.value) readRemoteFile(proxy + url, {
            download: true, header: true,
            complete: async (results: any) => {
                let stopData: any = {};

                for (const stopEntry of results.data)
                    stopData[stopEntry.stop_id] = stopEntry;

                Storage.set({key: 'stops', value: JSON.stringify(stopData)})
                    .catch((e) => console.error(e));
            }
        })
    }).catch(e => console.error(e));
}

export const initServices = async () => {
    Storage.get({key: 'services'}).then((res) => {
        const url = "http://transitfeeds.com/p/metlink/22/latest/download/routes.txt";
        if (!res.value) readRemoteFile(proxy + url, {
            download: true, header: true,
            complete: async (results: any) => {
                let serviceData: any = {};

                for (const serviceEntry of results.data)
                    serviceData[serviceEntry.route_short_name] = serviceEntry;

                Storage.set({key: 'services', value: JSON.stringify(serviceData)})
                    .catch((e) => console.error(e));
            }
        })
    }).catch(e => console.error(e));
}

export const initTheme = async () => {
    Storage.get({key: 'theme'}).then((res) => {
        if (!res.value) Storage.set({key: 'theme', value: JSON.stringify("auto")}).then()
    });
}

/* Getter Methods */

export const getSavedStops = async () => {
    return Storage.get({key: 'savedStops'})
        .then((stopData) => JSON.parse(stopData.value!))
        .catch((e) => {
            console.error('Failed to get stop data', e);
            return null;
        });
}

export const getSavedServices = async () => {
    return Storage.get({key: 'savedServices'})
        .then((serviceData) => JSON.parse(serviceData.value!))
        .catch((e) => {
            console.error('Failed to get service data', e);
            return null;
        });
}

export const getStops = async () => {
    return Storage.get({key: 'stops'})
        .then((stopData) => JSON.parse(stopData.value!))
        .catch((e) => {
            console.error('Failed to get stop data', e);
            return null;
        });
}

export const getServices = async () => {
    return Storage.get({key: 'services'})
        .then((serviceData) => JSON.parse(serviceData.value!))
        .catch((e) => {
            console.error('Failed to get service data', e);
            return null;
        });
}

/* Setter Methods */

export const setSavedStops = async (stopData: any, user?: firebase.User) => {
    Storage.set({
        key: 'savedStops',
        value: JSON.stringify(stopData)
    }).catch((e) => console.error('Failed to save stop data', e))
}

export const setSavedServices = async (serviceData: any, user?: firebase.User) => {
    Storage.set({
        key: 'savedServices',
        value: JSON.stringify(serviceData)
    }).catch((e) => console.error('Failed to save service data', e))
}

export const clearSavedData = async () => {
    setSavedStops([]).then(() => setSavedServices([]))
}