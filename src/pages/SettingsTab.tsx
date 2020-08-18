import React, {FC} from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {Plugins} from '@capacitor/core';
import ThemeSelector from "../components/ui/ThemeSelector";

const {Storage} = Plugins;


const SettingsTab: FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Settings</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonButton expand="block" onClick={() => Storage.clear()}><IonLabel>Clear</IonLabel></IonButton>
                <ThemeSelector/>
            </IonContent>
        </IonPage>
    );
}

export default SettingsTab;