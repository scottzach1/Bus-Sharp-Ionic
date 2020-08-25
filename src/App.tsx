import 'fetch';
import React from 'react';
import {Plugins} from '@capacitor/core';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import UserProvider from "./providers/UserProvider";
import Application from "./Application";
import {readRemoteFile} from "react-papaparse";

const {Storage} = Plugins;

interface AppProps {
}

interface AppState {
    stops: any[];
    services: any[];
}

class App extends React.Component<AppProps, AppState> {

    constructor(props: Readonly<AppProps>) {
        super(props);
        this.state = {
            stops: [],
            services: [],
        };
    }

    async componentDidMount() {
        Storage.get({key: 'theme'}).then((res) => {
            if (!res.value) Storage.set({key: 'theme', value: JSON.stringify("auto")}).then()
        });

        Storage.get({key: 'savedStops'}).then((res) => {
            if (!res.value) Storage.set({key: 'savedStops', value: JSON.stringify([])}).then()
        }).catch(e => console.error(e));

        Storage.get({key: 'savedServices'}).then((res) => {
            if (!res.value) Storage.set({key: 'savedServices', value: JSON.stringify([])}).then()
        }).catch((e) => console.error(e));

        const proxy = "https://cors-anywhere.herokuapp.com/";

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

    render() {
        return (
            <UserProvider>
                <Application/>
            </UserProvider>
        );
    }
}

export default App;
