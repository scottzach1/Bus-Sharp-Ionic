import React, {useState} from 'react';
import {IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './DataTab.css';

const DataTab: React.FC = () => {
    const [ versionData, setVersionData ] = useState<string>()

    async function getVersionData() {
        const url = 'https://api.transitfeeds.com/v1/getFeedVersions?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b&feed=metlink%2F22&page=1&limit=10&err=1&warn=1';
        const json = await (await fetch(url)).json()

        setVersionData(json.results.versions[0].id)
    }

    getVersionData().then()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Data</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Data</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <ExploreContainer name="Data Handler"/>

                {versionData && (
                    <IonLabel>
                        <p>Latest Version Data: {versionData}</p>
                    </IonLabel>
                )}
            </IonContent>
        </IonPage>
    );
};

export default DataTab;
