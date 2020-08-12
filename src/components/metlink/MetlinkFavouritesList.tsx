import React, {FC} from 'react';
import "./MetlinkStopInfo.css";
import {IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList} from "@ionic/react";

interface Props {
}

const MetlinkFavouritesList: FC<Props> = () => {

    function generateFavouritesCards() {
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

        if (!stopCards && !serviceCards) return (<p>No favourites have been saved yet!</p>)

        return (
            <div>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Stops</IonCardTitle>
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
            {generateFavouritesCards()}
        </div>
    )
}

export default MetlinkFavouritesList;