import 'fetch';
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {mapSharp, saveSharp, searchCircleSharp, settingsSharp} from 'ionicons/icons';
import AsyncStorage from '@react-native-community/async-storage';

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

const App: React.FC = () => {

    // Initialise Saved if not present.
    AsyncStorage.getAllKeys().then(keys => {
        if ('saved' in keys) return;

        AsyncStorage.setItem('saved', JSON.stringify({
            stops: [],
            services: [],
        })).catch(e => console.error(e));
    });

    // Download Stop Data
    AsyncStorage.getAllKeys().then(keys => {
        if ('stops' in keys) return;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "http://transitfeeds.com/p/metlink/22/latest/download/stops.txt";

        // Read Remote CSV.
        readRemoteFile(proxy + url, {
            download: true,
            header: true,
            complete: async (results: any) => {
                let stopData: any = {};

                for (const stopEntry of results.data) {
                    stopData[stopEntry.stop_id] = stopEntry;
                }

                AsyncStorage.setItem('stops', JSON.stringify(stopData))
                    .catch(e => console.error(e))
            }
        });
    });

    // Download Service Data
    AsyncStorage.getAllKeys().then(keys => {
        if ('services' in keys) return;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "http://transitfeeds.com/p/metlink/22/latest/download/routes.txt";

        // Read Remote CSV.
        readRemoteFile(proxy + url, {
            download: true,
            header: true,
            complete: async (results: any) => {
                let serviceData: any = {};

                for (const serviceEntry of results.data) {
                    serviceData[serviceEntry.route_short_name] = serviceEntry;
                }

                AsyncStorage.setItem('services', JSON.stringify(serviceData))
                    .catch(e => console.error(e));
            }
        });
    });

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
};

export default App;
