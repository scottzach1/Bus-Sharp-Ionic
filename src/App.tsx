import 'fetch';
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {baseball, bus, ellipse, map, settings, square, stopCircleOutline, triangle} from 'ionicons/icons';
import StopsTab from './pages/StopsTab';
import ServicesTab from './pages/ServicesTab';
import MapTab from './pages/MapTab';
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
import DataTab from "./pages/DataTab";

const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/services" component={ServicesTab} exact={true}/>
                        <Route path="/stops" component={StopsTab} exact={true}/>
                        <Route path="/map" component={MapTab}/>
                        <Route path="/data" component={DataTab}/>
                        <Route path="/" render={() => <Redirect to="/services"/>} exact={true}/>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="services" href="/services">
                            <IonIcon icon={bus}/>
                            <IonLabel>Services</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="stops" href="/stops">
                            <IonIcon icon={stopCircleOutline}/>
                            <IonLabel>Stops</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="map" href="/map">
                            <IonIcon icon={map}/>
                            <IonLabel>Map</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="data" href="/data">
                            <IonIcon icon={settings}/>
                            <IonLabel>Settings</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    )
};

export default App;
