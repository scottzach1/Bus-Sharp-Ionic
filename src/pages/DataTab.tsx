import React, {useState} from 'react';
import {IonContent, IonHeader, IonLabel, IonPage, IonSearchbar, IonSpinner, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './DataTab.css';
import { readString } from 'react-papaparse';
import LoadingSpinner from "../components/ui/LoadingSpinner";


const DataTab: React.FC = () => {
    const [versionData, setVersionData] = useState<string>()
    const [currentFeedInfo, setCurrentFeedInfo] = useState<Array<any>>()
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    async function getVersionData() {
        if (isLoaded) return

        const url = 'https://api.transitfeeds.com/v1/getFeedVersions?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b&feed=metlink%2F22&page=1&limit=10&err=1&warn=1';
        const json = await (await fetch(url)).json();

        setVersionData(json.results.versions[0].id);

        const feedInfo: string = await fetch('data/feed_info.txt')
            .then(r => r.text());

        const parsedFeedInfo: Array<any> = readString(feedInfo).data;
        setCurrentFeedInfo(parsedFeedInfo);
        setIsLoaded(true);
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
                {versionData && (
                    <IonLabel>
                        Latest Version Data: {versionData}
                    </IonLabel>
                )}
                {!versionData && (
                    <LoadingSpinner/>
                )
                }
                {currentFeedInfo && (
                    <IonLabel>
                        Current Version Data: <br/> {currentFeedInfo}
                    </IonLabel>
                )}
            </IonContent>
        </IonPage>
    );
};

export default DataTab;
