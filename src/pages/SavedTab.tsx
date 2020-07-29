import React, {FC} from "react";
import {IonBackButton, IonButtons, IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar} from "@ionic/react";

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
                <IonLabel>TO IMPLEMENT</IonLabel>
            </IonContent>
        </IonPage>
    )
}

export default SavedTab;