import React from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './StopsTab.css';

import MetlinkStopView from '../components/metlink/MetlinkStopView'

const StopsTab: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Stops</IonTitle>
                </IonToolbar>
            </IonHeader>
            <MetlinkStopView stopCode="7910"/>
        </IonPage>
    );
};

export default StopsTab;
