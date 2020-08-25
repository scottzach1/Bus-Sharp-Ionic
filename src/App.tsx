import 'fetch';
import React from 'react';
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
import {initSavedServices, initSavedStops, initServices, initStops, initTheme} from "./services/StorageManager";

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
        // Initialise user saved data.
        initTheme().catch((e) => console.log('Failed to init theme', e));
        initSavedStops().catch((e) => console.log('Failed to init saved stops', e));
        initSavedServices().catch((e) => console.log('Failed to init saved services', e));

        // Initialise cached data.
        initStops().catch((e) => console.log('Failed to init stops', e));
        initServices().catch((e) => console.log('Failed to init services', e));
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
