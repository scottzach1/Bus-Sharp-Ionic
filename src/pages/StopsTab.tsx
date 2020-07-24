import React from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
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
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Stops</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer name="Bus Stops"/>
                <MetlinkStopView stopCode="7910"/>
            </IonContent>
        </IonPage>
    );
};

export default StopsTab;
