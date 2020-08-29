import 'fetch';
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {mapSharp, saveSharp, searchCircleSharp, settingsSharp} from 'ionicons/icons';
import SearchTab from './search-tab/SearchTab';
import MapTab from './map-tab/MapTab';
import SavedTab from './saved-tab/SavedTab';
import SettingsTab from './settings-tab/SettingsTab';
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
import StopTimetablePerspective from "./shared/dynamic/stop-timetable-perspective/StopTimetablePerspective";
import ServicePerspective from "./shared/dynamic/service-perspective/ServicePerspective";
import {IonReactRouter} from "@ionic/react-router";
import {UserContext} from "./providers/UserProvider";
import AccountInfoPerspective from "./settings-tab/account/AccountInfoPerspective";
import AccountLoginPerspective from "./settings-tab/account/AccountLoginPerspective";
import AccountSignupPerspective from "./settings-tab/account/AccountSignupPerspective";
import TwitterFeedPerspective from "./settings-tab/twitter/TwitterFeedPerspective";
import AccountPasswordResetPerspective from "./settings-tab/account/AccountPasswordResetPerspective";
import AccountWaitingPerspective from "./settings-tab/account/AccountWaitingPerspective";
import StopMapPerspective from "./shared/dynamic/stop-timetable-perspective/stop-map-perspective/StopMapPerspective";

class Application extends React.Component<{}, {}> {
    static contextType = UserContext;

    componentDidMount() {
        this.render();
    }

    getUserContextRoutes() {
        if (typeof this.context === 'undefined')
            // Context has not mounted, defer to loading screen.
            return [
                <Route path={"/account"} component={AccountWaitingPerspective}/>,
                <Route path={"/reset"} component={AccountWaitingPerspective}/>,
                <Route path={"/login"} component={AccountWaitingPerspective}/>,
                <Route path={"/signup"} component={AccountWaitingPerspective}/>,
            ]
        else if (this.context && this.context.uid)
            // Context has mounted, user account detected.
            return [
                <Route path={"/account"} component={AccountInfoPerspective}/>,
                <Redirect from={"/reset"} to={"account"}/>,
                <Redirect from={"/login"} to={"account"}/>,
                <Redirect from={"/signup"} to={"account"}/>,
            ]
        else
            // Context has mounted, no user account detected.
            return [
                <Redirect from={"/account"} to={"/login"}/>,
                <Route path={"/reset"} component={AccountPasswordResetPerspective}/>,
                <Route path={"/login"} component={AccountLoginPerspective}/>,
                <Route path={"/signup"} component={AccountSignupPerspective}/>
            ]
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
                            <Route path="/stop/:stopCode" component={StopTimetablePerspective}/>
                            <Route path="/map/:stopCode" component={StopMapPerspective}/>
                            <Route path="/twitter" component={TwitterFeedPerspective}/>

                            {/* Account Perspectives */}
                            {this.getUserContextRoutes()}
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
        );
    }
}

export default Application;
