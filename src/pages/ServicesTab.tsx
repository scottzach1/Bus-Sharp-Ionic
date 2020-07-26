import React from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './ServicesTab.css';
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ServicesTab: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Services</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <LoadingSpinner/>
            </IonContent>
        </IonPage>
    );
};

export default ServicesTab;
