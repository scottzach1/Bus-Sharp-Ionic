import React, {useState} from 'react';
import {IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './DataTab.css';
import { readString } from 'react-papaparse';


const DataTab: React.FC = () => {
    const [versionData, setVersionData] = useState<string>()
    const [currentFeedInfo, setCurrentFeedInfo] = useState<Array<any>>()

    async function getVersionData() {
        const url = 'https://api.transitfeeds.com/v1/getFeedVersions?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b&feed=metlink%2F22&page=1&limit=10&err=1&warn=1';
        const json = await (await fetch(url)).json();

        setVersionData(json.results.versions[0].id);

        const feedInfo: string = await fetch('data/feed_info.txt')
            .then(r => r.text());

        const parsedFeedInfo: Array<any> = readString(feedInfo).data;
        setCurrentFeedInfo(parsedFeedInfo);
    }

    getVersionData();

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
                {currentFeedInfo && (
                    <IonLabel>
                        <p>Current Version Data: <br/> {currentFeedInfo}</p>
                    </IonLabel>
                )

                }
            </IonContent>
        </IonPage>
    );
};

export default DataTab;
