import 'fetch';
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {
    saveOutline,
    searchCircleSharp,
    mapSharp, settingsSharp, saveSharp
} from 'ionicons/icons';

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

const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/search" component={SearchTab}/>
                        <Route path="/map" component={MapTab}/>
                        <Route path="/saved" component={SavedTab}/>
                        <Route path="/settings" component={SettingsTab}/>
                        <Route path="/" render={() => <Redirect to="/search"/>} exact={true}/>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="search" href="/services">
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
