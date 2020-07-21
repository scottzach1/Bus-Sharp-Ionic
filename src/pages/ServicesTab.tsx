import React, {useState} from 'react';
import {IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './ServicesTab.css';

const ServicesTab: React.FC = () => {
    const [ versionData, setVersionData ] = useState<string>()

    async function getVersionData() {
        const url = 'https://api.transitfeeds.com/v1/getFeedVersions?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b&feed=metlink%2F22&page=1&limit=10&err=1&warn=1';
        const result = await fetch(url)

        const json = await result.json()

        setVersionData(json.results.versions[0].id)
    }

    getVersionData().then()

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

                {versionData && (
                    <IonLabel>
                        <p>Latest Version Data: {versionData}</p>
                    </IonLabel>
                )}
            </IonContent>
        </IonPage>
    );
};

export default ServicesTab;
