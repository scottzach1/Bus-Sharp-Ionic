import 'fetch';
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {mapSharp, saveSharp, searchCircleSharp, settingsSharp} from 'ionicons/icons';
import {Plugins} from '@capacitor/core';
import SearchTab from './pages/SearchTab';
import MapTab from './pages/MapTab';
import SavedTab from './pages/SavedTab';
import SettingsTab from './pages/SettingsTab';
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
import StopPerspective from "./pages/StopPerspective";
import ServicePerspective from "./pages/ServicePerspective";
import {readRemoteFile} from "react-papaparse";
import {IonReactRouter} from "@ionic/react-router";

const {Storage} = Plugins;

interface AppState {
    stops: any[];
    services: any[];
}

class App extends React.Component<{}, AppState> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            stops: [],
            services: [],
        };
        document.body.setAttribute('color-scheme', 'light');
    }

    async componentDidMount() {
        Storage.get({key: 'theme'}).then((res) => {
            if (!res.value) Storage.set({key: 'theme', value: JSON.stringify("auto")}).then()
            else if (res.value !== 'auto') {
                // document.body.classList.toggle('dark', (res.value === 'dark'));
                // document.body.classList.replace('prefers-color-scheme', res.value);
                // document.body.setAttribute('data-theme', 'light')
                document.body.setAttribute('prefers-color-scheme', res.value);
                document.body.setAttribute('color-scheme', 'light');
            }
            // window.matchMedia('(prefers-color-scheme: dark)')
        })

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
            <IonApp>
                <IonReactRouter>
                    <IonTabs>
                        <IonRouterOutlet>
                            {/* Home */}
                            <Route path="/" render={() => <Redirect to="/search"/>} exact={true}/>

                            {/* Tabs */}
                            <Route path="/search" component={SearchTab}/>
                            <Route path="/map" component={MapTab}/>
                            <Route path="/saved" component={SavedTab}/>
                            <Route path="/settings" component={SettingsTab}/>

                            {/* Hidden Perspectives*/}
                            <Route path="/service/:serviceCode" component={ServicePerspective}/>
                            <Route path="/stop/:stopCode" component={StopPerspective}/>
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="search" href="/search">
                                <IonIcon icon={searchCircleSharp}/>
                                <IonLabel>Search</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="map" href="/map">
                                <IonIcon icon={mapSharp}/>
                                <IonLabel>Map</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="saved" href="/saved">
                                <IonIcon icon={saveSharp}/>
                                <IonLabel>Saved</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="settings" href="/settings">
                                <IonIcon icon={settingsSharp}/>
                                <IonLabel>Settings</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonReactRouter>
            </IonApp>
        )
    }
}

export default App;
