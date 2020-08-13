import React, {FC, useState} from 'react';
import {
    IonBadge, IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList
} from "@ionic/react";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
}

const MetlinkSavedList: FC<Props> = () => {
    // Can be true or false, flipping it causes the component to refresh.
    const[triggerReload, setTriggerReload] = useState<boolean>(false);

    function clearSavedStops() {
        AsyncStorage.getItem('saved').then(res => {
            if (!res) return;

            let saved: any = JSON.parse(res);
            saved.stops = [];

            AsyncStorage.setItem('saved', JSON.stringify(saved))
                .then(() => setTriggerReload(!triggerReload));
        })
    }

    function clearSavedServices() {
        AsyncStorage.getItem('saved').then(res => {
            if (!res) return;

            let saved: any = JSON.parse(res);
            saved.services = [];

            AsyncStorage.setItem('saved', JSON.stringify(saved))
                .then(() => setTriggerReload(!triggerReload));
        })
    }

    function generateSavedCards() {
        let saved: any = JSON.parse(localStorage.saved);

        let stopCards: any[] = [];
        for (const stopCode of saved.stops) {
            stopCards.push(
                <IonItem key={stopCode} href={"/stop/" + stopCode}>
                    <IonBadge slot="start">{"stop"}</IonBadge>
                    <IonLabel>{stopCode}</IonLabel>
                </IonItem>
            )
        }

        let serviceCards: any[] = [];
        for (const serviceCode of saved.services) {
            serviceCards.push(
                <IonItem key={serviceCode} href={"/service/" + serviceCode}>
                    <IonBadge slot="start" color="warning">{"service"}</IonBadge>
                    <IonLabel>{serviceCode}</IonLabel>
                </IonItem>
            )
        }

        return (
            <div>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Stops</IonCardTitle>
                        <IonCardSubtitle>
                            <IonButton onClick={() => clearSavedStops()}>Clear</IonButton>
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines="full">
                            {stopCards}
                        </IonList>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Services</IonCardTitle>
                        <IonCardSubtitle>
                            <IonButton onClick={() => clearSavedServices()}>Clear</IonButton>
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines="full">
                            {serviceCards}
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </div>
        )
    }

    return (
        <div>
            {generateSavedCards()}
        </div>
    )
}

export default MetlinkSavedList;