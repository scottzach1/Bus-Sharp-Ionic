import React, {FC} from "react";
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import MetlinkFavouritesList from "../components/metlink/MetlinkFavouritesList";

const SavedTab: FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>Saved</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Saved</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MetlinkFavouritesList/>
            </IonContent>
        </IonPage>
    )
}

export default SavedTab;