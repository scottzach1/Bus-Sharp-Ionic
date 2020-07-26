import React, {useState} from 'react';
import {IonContent, IonHeader, IonLabel, IonPage, IonSearchbar, IonSpinner, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './DataTab.css';
import { readString } from 'react-papaparse';
import LoadingSpinner from "../components/ui/LoadingSpinner";
import MetlinkDataFeed from "../components/metlink/MetlinkDataFeed";


const DataTab: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Data</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <MetlinkDataFeed/>
            </IonContent>
        </IonPage>
    );
};

export default DataTab;
