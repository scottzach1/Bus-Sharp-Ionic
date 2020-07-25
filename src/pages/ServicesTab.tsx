import React from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './ServicesTab.css';
import MetlinkServiceView from "../components/metlink/MetlinkServiceView";

const ServicesTab: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Services</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Services</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer name="Bus Services"/>
                <MetlinkServiceView serviceCode="14" />
            </IonContent>
        </IonPage>
    );
};

export default ServicesTab;
