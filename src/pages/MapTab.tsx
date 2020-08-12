import React from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './MapTab.css';
import MetlinkStopsMap from "../components/metlink/MetlinkStopsMap";

const MapTab: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Map</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MetlinkStopsMap/>
            </IonContent>
        </IonPage>
    );
};

export default MapTab;
